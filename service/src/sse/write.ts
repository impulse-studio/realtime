import { ServerResponse } from 'node:http';

export function writeSSEMessage(res: ServerResponse, data: string): void {
  res.write(`data: ${data}\n\n`);
}

export function writeSSEComment(res: ServerResponse, comment: string): void {
  res.write(`: ${comment}\n\n`);
}