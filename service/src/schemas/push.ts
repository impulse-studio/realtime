import { z } from 'zod';

export const PushSchema = z.object({
  channel: z.string().min(1),
  payload: z.unknown(),
  audience: z.object({
    tokens: z.union([z.string(), z.array(z.string())]).optional(),
    topic: z.string().min(1).optional()
  }).optional()
});

export type PushData = z.infer<typeof PushSchema>;