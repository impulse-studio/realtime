import Redis from 'ioredis';

declare global {
  var __redis: Redis | undefined;
}

export function getRedis(): Redis {
  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL environment variable is required');
  }

  if (globalThis.__redis) {
    return globalThis.__redis;
  }

  const redis = new Redis(process.env.REDIS_URL);
  
  if (process.env.NODE_ENV === 'development') {
    globalThis.__redis = redis;
  }

  return redis;
}