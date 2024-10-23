import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the shape of your context state
interface StatusContextType {
  status: string
  setStatus: (status: string) => void
}

// Create the context with a default value
const StatusContext = createContext<StatusContextType | undefined>(undefined)

// Create a provider component
export const StatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<string>('init')

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  )
}

// Custom hook to use the StatusContext
export const useStatus = (): StatusContextType => {
  const context = useContext(StatusContext)
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider')
  }
  return context
}
