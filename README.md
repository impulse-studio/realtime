## Impulse Realtime

Super simple, type‑safe realtime via Server‑Sent Events (SSE).

---

## 1) Installation (CLI or Docker)

CLI (Node):
```bash
npx @impulselab/realtime-service --port 8080 --secret "$REALTIME_SECRET"
```

Docker:
```bash
docker run \
  -p 8080:8080 \
  -e REALTIME_SECRET="your-server-secret" \
  impulse/realtime
```

Endpoints: `GET /` (SSE stream), `POST /` (push).

---

## 2) Types creation

Define your channel → payload map once, share it on client and server:
```ts
interface RealtimeTypes {
  'this:is:a:channel': { key: string }
}
```

---

## 3) Client config

```ts
import { createRealtimeClient } from '@impulselab/realtime'

const rc = createRealtimeClient<RealtimeTypes>({
  serviceUrl: process.env.SERVICE_URL!
})

// Public subscribe
rc.subscribe('this:is:a:channel', (event) => {
  console.log(event.payload.key)
})

// Private subscribe (token) or group (topic)
rc.subscribe('this:is:a:channel', (event) => {
  console.log(event.payload.key)
}, { token: 'secret', topic: 'room-42' })

// Unsubscribe helpers
const off = rc.subscribe('this:is:a:channel', () => {})
off()
rc.unsubscribeAll('this:is:a:channel')
rc.unsubscribeAllChannels()
```

---

## 4) Server config

```ts
import { createServerClient } from '@impulselab/realtime'

const sc = createServerClient<RealtimeTypes>({
  serviceUrl: process.env.SERVICE_URL!,
  token: process.env.TOKEN!
})

// Public push
await sc.push('this:is:a:channel', { key: 'value' })

// Authenticated push (token)
await sc.push('this:is:a:channel', { key: 'value' }, { tokens: 'secret' })

// Target a topic (room/group)
await sc.push('this:is:a:channel', { key: 'value' }, { topic: 'room-42' })

// Auth + topic together
await sc.push('this:is:a:channel', { key: 'value' }, { tokens: ['secret','other'], topic: 'room-42' })
```


