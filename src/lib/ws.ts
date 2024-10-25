import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractBearerToken(text: string): string | null {
  const match = text.match(/Bearer\s+([a-zA-Z0-9.\-_]+)/)
  return match ? match[1] : null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function printMessage(content: any): string {
  if (typeof content === 'string') {
    return content
  } else if (typeof content === 'object' && content !== null) {
    return content.text
  } else {
    return 'unknown message data type'
  }
}

function formatPhoneNumber(number: string): string {
  // Example formatting: (country code) XXX-XXXX-XXXX
  const countryCode = number.slice(0, 3)
  const areaCode = number.slice(3, 6)
  const localNumber = number.slice(6)

  return `+${countryCode} (${areaCode}) ${localNumber.slice(0, 3)}-${localNumber.slice(3)}`
}

export function extractWANumber(input: string | undefined): string | null {
  if (input) {
    const match = input.match(/\d+/) // Matches one or more digits
    if (!match) return null // Return null if no match found

    const number = match[0] // Get the matched number
    return formatPhoneNumber(number)
  }
  return ''
}
