import { createServer } from 'node:http';
import { ServerOptions } from './config/types.js';
import { handleSSEConnection } from './routes/get.js';
import { handleBroadcast } from './routes/post.js';
import { clearAllConnections } from './broker/connections.js';

export function startServer(options: ServerOptions = {}): Promise<{ port: number; close: () => Promise<void> }> {
  const { port = 3000, secret } = options;

  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        });
        res.end();
        return;
      }

      if (req.url === '/' || req.url?.startsWith('/?')) {
        if (req.method === 'GET') {
          handleSSEConnection(req, res);
        } else if (req.method === 'POST') {
          handleBroadcast(req, res, secret);
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
      }
    });

    server.on('error', reject);

    server.listen(port, () => {
      resolve({
        port,
        close: () => new Promise((closeResolve) => {
          clearAllConnections();
          server.close(() => closeResolve());
        })
      });
    });
  });
}