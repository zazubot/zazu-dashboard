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
