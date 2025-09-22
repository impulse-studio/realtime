import type { ServerClient, ServerClientOptions } from './types.js';

export function createServerClient<RT>(options: ServerClientOptions): ServerClient<RT> {
  const { serviceUrl, token } = options;

  if (!serviceUrl || typeof serviceUrl !== 'string') {
    throw new Error('serviceUrl is required and must be a string');
  }

  if (!token || typeof token !== 'string') {
    throw new Error('token is required and must be a string');
  }

  async function push<K extends keyof RT>(
    channel: K,
    payload: RT[K],
    audience?: { tokens?: string | string[]; topic?: string }
  ): Promise<void> {
    if (!channel || typeof channel !== 'string') {
      throw new Error('channel is required and must be a string');
    }

    const body = JSON.stringify({
      channel,
      payload,
      audience
    });

    const response = await fetch(serviceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error || response.statusText}`);
    }
  }

  async function pushMany(
    events: Array<{
      channel: keyof RT;
      payload: RT[keyof RT];
      audience?: { tokens?: string | string[]; topic?: string };
    }>
  ): Promise<void> {
    if (!Array.isArray(events)) {
      throw new Error('events must be an array');
    }

    const promises = events.map(event => 
      push(event.channel, event.payload, event.audience)
    );

    await Promise.all(promises);
  }

  return {
    push,
    pushMany
  };
}