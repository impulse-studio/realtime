import type { RealtimeClient, RealtimeClientOptions, EventHandler } from './types.js';
import type { ChannelConnection } from '../internal/connections.js';

export function createRealtimeClient<RT>(options: RealtimeClientOptions): RealtimeClient<RT> {
  const { serviceUrl, retryMs = { min: 1000, max: 30000 } } = options;
  const connections = new Map<keyof RT, ChannelConnection<RT, any>>();

  function subscribe<K extends keyof RT>(
    channel: K,
    handler: EventHandler<RT, K>,
    subscribeOptions?: { token?: string; topic?: string }
  ): () => void {
    if (!channel || typeof channel !== 'string') {
      throw new Error('channel is required and must be a string');
    }

    if (typeof handler !== 'function') {
      throw new Error('handler must be a function');
    }

    let connection = connections.get(channel);

    if (!connection) {
      const url = new URL(serviceUrl);
      url.searchParams.set('channel', channel as string);
      
      if (subscribeOptions?.token) {
        url.searchParams.set('token', subscribeOptions.token);
      }

      if (subscribeOptions?.topic) {
        url.searchParams.set('topic', subscribeOptions.topic);
      }

      const es = new EventSource(url.toString());
      const handlers = new Set<EventHandler<RT, K>>();

      connection = { es, handlers };
      connections.set(channel, connection);

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.channel === channel) {
            for (const h of handlers) {
              try {
                h({ channel, payload: data.payload });
              } catch (error) {
                console.error('Error in realtime handler:', error);
              }
            }
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      es.onerror = (error) => {
        console.error(`EventSource error for channel ${String(channel)}:`, error);
      };
    }

    connection.handlers.add(handler);

    return () => {
      const conn = connections.get(channel);
      if (conn) {
        conn.handlers.delete(handler);
        if (conn.handlers.size === 0) {
          conn.es.close();
          connections.delete(channel);
        }
      }
    };
  }

  function unsubscribe(channel: keyof RT): void {
    const connection = connections.get(channel);
    if (connection) {
      connection.es.close();
      connections.delete(channel);
    }
  }

  function unsubscribeAll(channel: keyof RT): void {
    unsubscribe(channel);
  }

  function unsubscribeAllChannels(): void {
    for (const connection of connections.values()) {
      connection.es.close();
    }
    connections.clear();
  }

  function close(): void {
    unsubscribeAllChannels();
  }

  return {
    subscribe,
    unsubscribe,
    unsubscribeAll,
    unsubscribeAllChannels,
    close
  };
}