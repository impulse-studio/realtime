import { NextResponse } from 'next/server'

import { getRedis } from '@/lib/redis'
import { getServerRealtime } from '@/lib/realtime/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const redis = getRedis()
    const count = await redis.get('demo:likes')
    return NextResponse.json({ count: count ? Number(count) : 0 })
  } catch (error) {
    console.error('Failed to get likes:', error)
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const redis = getRedis()

    const newCount = await redis.incr('demo:likes')

    const realtime = getServerRealtime()
    await realtime.push('demo:likes:updated', { count: newCount })

    return NextResponse.json({ count: newCount })
  } catch (error) {
    console.error('Failed to increment likes:', error)
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}