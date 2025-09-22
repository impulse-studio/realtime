export interface RealtimeClientOptions {
  serviceUrl: string;
  retryMs?: {
    min: number;
    max: number;
  };
}

export interface EventHandler<RT, K extends keyof RT> {
  (evt: { channel: K; payload: RT[K] }): void;
}

export interface RealtimeClient<RT> {
  subscribe<K extends keyof RT>(
    channel: K,
    handler: EventHandler<RT, K>,
    options?: { token?: string; topic?: string }
  ): () => void;
  unsubscribe(channel: keyof RT): void;
  unsubscribeAll(channel: keyof RT): void;
  unsubscribeAllChannels(): void;
  close(): void;
}