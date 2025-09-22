'use client'

import { useState, useEffect } from 'react'
import { getClientRealtime } from '../lib/realtime/client'

interface LikeButtonProps {
  initialCount: number
  onLike: (formData: FormData) => Promise<void>
}

export default function LikeButton({ initialCount, onLike }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const client = getClientRealtime()
    
    const unsubscribe = client.subscribe('demo:likes:updated', (event) => {
      try {
        setCount(event.payload.count)
      } catch (error) {
        console.error('Error handling likes update:', error)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <form action={onLike}>
      <button type="submit">
        Like ({count})
      </button>
    </form>
  )
}