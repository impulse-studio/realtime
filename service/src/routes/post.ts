import { IncomingMessage, ServerResponse } from 'node:http';
import { PushSchema } from '../schemas/push.js';
import { getChannelConnections } from '../broker/connections.js';
import { writeSSEMessage } from '../sse/write.js';
import { ClientConnection } from '../broker/types.js';

export async function handleBroadcast(req: IncomingMessage, res: ServerResponse, secret?: string): Promise<void> {
  if (secret) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Authorization header required' }));
      return;
    }
    
    const token = authHeader.slice('Bearer '.length);
    if (token !== secret) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid token' }));
      return;
    }
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const rawData = JSON.parse(body);
      const data = PushSchema.parse(rawData);

      const channelConnections = getChannelConnections(data.channel);
      if (!channelConnections || channelConnections.size === 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ sent: 0 }));
        return;
      }

      const message = JSON.stringify({
        channel: data.channel,
        payload: data.payload
      });

      let sent = 0;
      const deadConnections: Set<ClientConnection> = new Set();

      for (const connection of channelConnections) {
        if (data.audience?.topic && connection.topic !== data.audience.topic) {
          continue;
        }

        try {
          writeSSEMessage(connection.res, message);
          sent++;
        } catch (error) {
          deadConnections.add(connection);
        }
      }

      deadConnections.forEach(conn => channelConnections.delete(conn));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ sent }));
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body', details: error.message }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    }
  });
}