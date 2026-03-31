## Real-Time Messaging System (MQTT + Node.js)

A minimal, production-oriented implementation of a secure publish/subscribe pattern using MQTT and end-to-end symmetric encryption.

---

## Table of Contents

- [Overview](#overview)
- [Problem](#the-problem)
- [Approach](#the-approach)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Message Format](#message-format)
- [Quick Start](#quick-start)
- [Current Status](#current-status-2026-03-31)
- [Extending the System](#extending-the-system)
- [When This Pattern Fits](#when-this-pattern-fits)
- [Closing Thought](#closing-thought)

---

## Overview

Independent services communicate by exchanging events through an MQTT broker. To protect payloads when using public or untrusted brokers, this project implements end-to-end symmetric encryption (AES-256-CBC). The broker distributes ciphertext only and never sees plaintext.

## The Problem

- Wasteful polling and tight coupling
- Difficulty maintaining real-time responsiveness
- Sensitive data exposed when using public brokers

## The Approach

- Publisher encrypts messages (AES-256-CBC) and publishes ciphertext
- Broker distributes encrypted payloads without access to plaintext
- Subscribers decrypt received payloads using the shared secret

## Architecture

```text
        ┌───────────────┐
        │   Publisher   │
        │  (sender.js)  │
        │  Encrypts 🛡️  │
        └──────┬────────┘
               │
               │  IV : Ciphertext
               ▼
        ┌───────────────┐
        │  MQTT Broker  │
        │ (blind to data)│
        └──────┬────────┘
               │
               │  IV : Ciphertext
        ┌──────┴────────┐
        ▼               ▼
┌───────────────┐ ┌───────────────┐
│  Subscriber   │ │  Subscriber   │
│ (receiver.js) │ │   (future)    │
└───────────────┘ └───────────────┘
```

## Project Structure

```
.
├── sender.js            # Encrypts and publishes messages
├── receiver.js          # Subscribes, receives, and decrypts messages
├── cipher-decipher.js   # AES-256-CBC encryption utility
├── .env.example         # Template for the 32-byte shared secret
├── package.json
└── README.md
```

## Message Format

1) Over the wire (what the broker sees):

```text
<IV_hex>:<Ciphertext_hex>
```

2) Application level (plaintext seen by sender/receiver after decrypt):

```json
{
  "timestamp": "2026-03-31T00:00:00.000Z",
  "status": "active",
  "message": "Hello from the Node.js Sender!"
}
```

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

Copy `.env.example` to `.env` and set the shared secret (32 bytes / 64 hex chars):

```bash
cp .env.example .env
# edit .env and set SHARED_SECRET to a 64-character hex string
```

3. Start the subscriber in one terminal:

```bash
node receiver.js
```

4. Send a message from another terminal:

```bash
node sender.js
```

## Current Status (2026-03-31)

- **Repo contents:** sender.js, receiver.js, cipher-decipher.js, package.json, README.md, .env.example
- **Local functionality:** Publisher and subscriber run locally against an MQTT broker; end-to-end AES-256-CBC encryption is implemented and working.
- **Known gaps / next steps:** configure broker URL/credentials, add TLS for network-layer security, add automated tests and CI, and add message persistence/analytics.

## Extending the System

- Add network-layer TLS (mTLS) to protect metadata and topics
- Implement MQTT QoS levels for delivery guarantees
- Persist encrypted messages for analytics or replay
- Integrate with databases or event pipelines
- Add monitoring and alerting for broker/consumer health

## When This Pattern Fits

- Real-time updates with many consumers
- Data privacy is required across untrusted networks
- Systems must remain loosely coupled and scalable

## Closing Thought

This project focuses on moving data securely and efficiently between independent systems. The implementation is intentionally small so the pattern remains clear and extensible.