import type { EventHandler } from '../client/types.js';

export interface ChannelConnection<RT, K extends keyof RT> {
  es: EventSource;
  handlers: Set<EventHandler<RT, K>>;
}