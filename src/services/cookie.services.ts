// Function to get all cookie names
const getAllCookieNames = (): string[] => {
  return document.cookie.split(';').map((cookie) => cookie.split('=')[0].trim())
}
export const getCookie = (key: string): string | undefined => {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
  return b ? b.pop() : ''
}

// Function to clear a specific cookie with all possible paths and domains
export const clearCookie = (name: string): void => {
  // List of possible paths
  const paths = ['/', '/api', '/auth', '/app']

  // List of possible domains (replace with your domains)
  const domains = [
    '', // current domain
    window.location.hostname,
    `.${window.location.hostname}`, // include subdomains
    window.location.hostname.split('.').slice(1).join('.'), // parent domain
  ]

  // Create date in the past
  const expires = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'

  // Try all combinations of paths and domains
  paths.forEach((path) => {
    domains.forEach((domain) => {
      // Without domain
      document.cookie = `${name}=; ${expires}; path=${path}`

      // With domain
      if (domain) {
        document.cookie = `${name}=; ${expires}; path=${path}; domain=${domain}`
      }

      // Also try with Secure and SameSite attributes
      if (domain) {
        document.cookie = `${name}=; ${expires}; path=${path}; domain=${domain}; secure; samesite=strict`
        document.cookie = `${name}=; ${expires}; path=${path}; domain=${domain}; secure; samesite=lax`
      }
    })
  })
}

// Main function to clear all cookies
export const clearAllCookies = (): void => {
  const cookieNames = getAllCookieNames()
  cookieNames.forEach((name) => clearCookie(name))
}
