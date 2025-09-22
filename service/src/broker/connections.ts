import { ServerResponse } from 'node:http';
import { ConnectionsMap, ClientConnection } from './types.js';

export const connections: ConnectionsMap = new Map();

export function addConnection(channel: string, res: ServerResponse, topic?: string): void {
  if (!connections.has(channel)) {
    connections.set(channel, new Set());
  }
  connections.get(channel)!.add({ res, topic });
}

export function removeConnection(channel: string, res: ServerResponse): void {
  const channelConnections = connections.get(channel);
  if (channelConnections) {
    for (const connection of channelConnections) {
      if (connection.res === res) {
        channelConnections.delete(connection);
        break;
      }
    }
    if (channelConnections.size === 0) {
      connections.delete(channel);
    }
  }
}

export function getChannelConnections(channel: string): Set<ClientConnection> | undefined {
  return connections.get(channel);
}

export function clearAllConnections(): void {
  for (const channelConnections of connections.values()) {
    for (const connection of channelConnections) {
      connection.res.end();
    }
  }
  connections.clear();
}