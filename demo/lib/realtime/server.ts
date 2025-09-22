import { createServerClient } from '@impulselab/realtime'
import type { RealtimeTypes } from './types.js'

declare global {
  var __realtimeServerClient: ReturnType<typeof createServerClient<RealtimeTypes>> | undefined
}

export function getServerRealtime() {
  if (!process.env.NEXT_PUBLIC_REALTIME_URL) {
    throw new Error('NEXT_PUBLIC_REALTIME_URL environment variable is required')
  }

  if (!process.env.REALTIME_SECRET) {
    throw new Error('REALTIME_SECRET environment variable is required')
  }

  if (!globalThis.__realtimeServerClient) {
    globalThis.__realtimeServerClient = createServerClient<RealtimeTypes>({
      serviceUrl: process.env.NEXT_PUBLIC_REALTIME_URL,
      token: process.env.REALTIME_SECRET
    })
  }

  return globalThis.__realtimeServerClient
}