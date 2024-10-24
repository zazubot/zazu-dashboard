import React, { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Upload } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { Progress } from '@radix-ui/react-progress'
import { IInstance } from '@/types/IInstance'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import axiosApiInstance from '@/services/api.services'

interface CampaignData {
  name: string
  phone: string
  message: string
}

interface CampaignResult {
  name: string
  phone: string
  message?: string
  status: 'pending' | 'success' | 'error'
  response?: string
}

const CampaignPage = () => {
  const [campaignData, setCampaignData] = useState<CampaignData[]>([])
  const [results, setResults] = useState<CampaignResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const auth = useAuthUser<IInstance>()

  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if it's a CSV file
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split('\n')
        const headers = lines[0].split(',').map((header) => header.trim())

        // Validate headers
        if (
          !headers.includes('name') ||
          !headers.includes('phone') ||
          !headers.includes('message')
        ) {
          setError('CSV must include name, phone, and message columns')
          return
        }

        const jsonData: CampaignData[] = lines
          .slice(1)
          .filter((line) => line.trim())
          .map((line) => {
            const values = line.split(',').map((value) => value.trim())
            const record: any = {}
            headers.forEach((header, index) => {
              record[header] = values[index]
            })
            return record
          })

        setCampaignData(jsonData)
        setResults(
          jsonData.map((item) => ({
            name: item.name,
            phone: item.phone,
            message: item.message,
            status: 'pending',
          }))
        )
        setError(null)
      } catch (err) {
        setError('Error parsing CSV file')
      }
    }
    reader.readAsText(file)
  }

  const startCampaign = async () => {
    setIsRunning(true)
    setProgress(0)

    for (let i = 0; i < campaignData.length; i++) {
      const item = campaignData[i]

      try {
        // Simulate API call - replace with your actual API endpoint
        const { status } = await axiosApiInstance.post(
          '/message/sendText/' + auth?.name,
          {
            number: item.phone,
            options: {
              delay: 1200,
              presence: 'composing',
            },
            textMessage: {
              text: item.message,
            },
          }
        )

        setResults((prev) => {
          const newResults = [...prev]
          newResults[i] = {
            name: item.name,
            phone: item.phone,
            message: item.message,
            status: status == 201 ? 'success' : 'error',
          }
          return newResults
        })
      } catch (error) {
        setResults((prev) => {
          const newResults = [...prev]
          newResults[i] = {
            name: item.name,
            phone: item.phone,
            status: 'error',
          }
          return newResults
        })
      }

      setProgress(((i + 1) / campaignData.length) * 100)
    }

    setIsRunning(false)
  }

  return (
    <div className='space-y-6 p-6'>
      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Campaign Data</CardTitle>
          <CardDescription>
            Upload a CSV file containing names, phone numbers, and messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <input
                type='file'
                accept='.csv'
                onChange={handleFileUpload}
                className='hidden'
                id='file-upload'
              />
              <label htmlFor='file-upload'>
                <Button asChild>
                  <span>
                    <Upload className='mr-2 h-4 w-4' />
                    Upload CSV
                  </span>
                </Button>
              </label>
              <span className='text-sm text-gray-500'>
                {campaignData.length > 0
                  ? `${campaignData.length} records loaded`
                  : 'No file uploaded'}
              </span>
            </div>
            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Control Section */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Control</CardTitle>
          <CardDescription>
            Start the campaign and monitor progress
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button
            onClick={startCampaign}
            disabled={isRunning || campaignData.length === 0}
          >
            {isRunning ? 'Campaign Running...' : 'Start Campaign'}
          </Button>
          {isRunning && <Progress value={progress} className='w-full' />}
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Results</CardTitle>
          <CardDescription>
            Real-time campaign execution results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='rounded-lg border'>
            <div className='grid grid-cols-4 gap-4 border-b bg-gray-50 p-4'>
              <div className='font-medium'>Name</div>
              <div className='font-medium'>Phone</div>
              <div className='font-medium'>Message</div>
              <div className='font-medium'>Status</div>
            </div>
            <div className='divide-y'>
              {results.map((result, index) => (
                <div key={index} className='grid grid-cols-4 gap-4 p-4'>
                  <div>{result.name}</div>
                  <div>{result.phone}</div>
                  <div>{result.message}</div>
                  <div>
                    <span
                      className={
                        result.status === 'success'
                          ? 'text-green-600'
                          : result.status === 'error'
                            ? 'text-red-600'
                            : 'text-gray-400'
                      }
                    >
                      {result.status}
                    </span>{' '}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignPage
