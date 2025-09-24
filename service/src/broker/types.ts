import { ServerResponse } from 'node:http';

export interface ClientConnection {
  res: ServerResponse;
  topic?: string;
  token?: string;
}

export type ConnectionsMap = Map<string, Set<ClientConnection>>;