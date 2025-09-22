'use client'

import { createRealtimeClient } from '@impulselab/realtime'
import type { RealtimeTypes } from './types.js'

let clientInstance: ReturnType<typeof createRealtimeClient<RealtimeTypes>> | null = null

export function getClientRealtime() {
  if (typeof window === 'undefined') {
    throw new Error('getClientRealtime can only be used in the browser')
  }

  if (!process.env.NEXT_PUBLIC_REALTIME_URL) {
    throw new Error('NEXT_PUBLIC_REALTIME_URL environment variable is required')
  }

  if (!clientInstance) {
    clientInstance = createRealtimeClient<RealtimeTypes>({
      serviceUrl: process.env.NEXT_PUBLIC_REALTIME_URL
    })
  }

  return clientInstance
}