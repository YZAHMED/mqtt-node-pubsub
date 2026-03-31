# mqtt-node-pubsub

A minimal, well-documented Node.js project demonstrating MQTT publish/subscribe patterns using public brokers. It showcases a clean, pragmatic implementation for sending and receiving lightweight JSON messages in real time.

- Minimal dependencies: built with `mqtt` and Node.js ESM-style imports.
- Focused examples: `sender.js` and `receiver.js` show clear publisher/subscriber patterns.
- Ready-to-run: copy, install, and execute locally or connect to any MQTT broker.

## Project Highlights

- Real-time message exchange using MQTT (publish/subscribe).
- Clean payload structure (timestamp, status, message) to demonstrate telemetry or heartbeat messages.
- Easy to extend for IoT prototypes, dashboards, or integration tests.

## Files

- `sender.js` — publishes a JSON payload with a timestamp and status.
- `receiver.js` — subscribes to the same topic and logs received messages.
- `.gitignore` — ignores `node_modules`, macOS files, and common editor folders.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run the sender (publishes one message then exits):

```bash
node sender.js
```

3. Run the receiver (keeps running to display incoming messages):

```bash
node receiver.js
```

## Example payload

```json
{
  "timestamp": "2026-03-31T00:00:00.000Z",
  "status": "active",
  "message": "Hello from the Node.js Sender!"
}
```

## Tips

- Swap `broker.hivemq.com` for a private broker URL to use this in production or secure testbeds.
- Extend payloads for sensor readings, device status, or command/control messages.
- Add TLS and authentication for secure deployments.

## Contributing

Small, focused PRs are welcome — add features, examples, or improve documentation.

---

Built with clarity and practical examples for quick evaluation and extension.
