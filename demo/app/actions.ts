'use server'

import { getRedis } from '../lib/redis'
import { getServerRealtime } from '../lib/realtime/server'

export async function incrementLikesAction(): Promise<void> {
  try {
    const redis = getRedis()

    const newCount = await redis.incr('demo:likes')

    const realtime = getServerRealtime()
    await realtime.push('demo:likes:updated', { count: newCount })
  } catch (error) {
    console.error('Failed to increment likes:', error)
    throw error
  }
}