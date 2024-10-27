interface WebSocketCallback {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any, event: MessageEvent): void
}

interface WebSocketConfig {
  url: string
  reconnectInterval: number
}

export function socket(
  eventName: string,
  callback: WebSocketCallback
): WebSocket {
  const config: WebSocketConfig = {
    url: 'ws://localhost:8084/ws/events',
    reconnectInterval: 5000,
  }
  const ws = new WebSocket(
    `${config.url}?event=${encodeURIComponent(eventName)}&token=${localStorage.getItem('_auth')}`
  )

  ws.onopen = (): void => {
    console.log('Connected to the server')
  }

  ws.onmessage = (event: MessageEvent): void => {
    if (callback) {
      const data = JSON.parse(event.data as string)
      callback(data, event)
    }
  }

  ws.onerror = (error: Event): void => {
    console.log('Error:', error)
  }

  ws.onclose = (event: CloseEvent): void => {
    console.log(
      `Connection closed with code ${event.code} and reason ${event.reason}, attempting to reconnect...`
    )
    setTimeout(() => socket(eventName, callback), config.reconnectInterval)
  }

  return ws
}
