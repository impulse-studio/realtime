export interface ServerClientOptions {
  serviceUrl: string;
  token: string;
}

export interface ServerClient<RT> {
  push<K extends keyof RT>(
    channel: K,
    payload: RT[K],
    audience?: { tokens?: string | string[]; topic?: string }
  ): Promise<void>;
  pushMany(
    events: Array<{
      channel: keyof RT;
      payload: RT[keyof RT];
      audience?: { tokens?: string | string[]; topic?: string };
    }>
  ): Promise<void>;
}