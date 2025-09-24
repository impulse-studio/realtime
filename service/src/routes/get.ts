import { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';
import { setupSSEHeaders } from '../sse/headers.js';
import { writeSSEComment } from '../sse/write.js';
import { addConnection, removeConnection } from '../broker/connections.js';

export function handleSSEConnection(req: IncomingMessage, res: ServerResponse): void {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const channel = url.searchParams.get('channel');
  const token = url.searchParams.get('token');
  const topic = url.searchParams.get('topic');

  if (!channel) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'channel query parameter is required' }));
    return;
  }

  setupSSEHeaders(res);
  
  writeSSEComment(res, `Connected to channel: ${channel}`);

  addConnection(channel, res, topic || undefined, token || undefined);

  let heartbeatInterval: NodeJS.Timeout;
  
  const cleanup = () => {
    removeConnection(channel, res);
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }
  };

  heartbeatInterval = setInterval(() => {
    writeSSEComment(res, 'heartbeat');
  }, 30000);

  req.on('close', cleanup);
  req.on('aborted', cleanup);
  res.on('close', cleanup);
}