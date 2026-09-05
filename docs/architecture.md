# Product architecture notes

The public showcase exposes the user-facing concept, not the production implementation.

## Public surface

- React interaction design and responsive presentation.
- Mock contracts that show the expected input and feedback shapes.
- Product decisions around interview progression and IELTS Part 1/2/3 flow.

## Private production surface

- Voice session state machine, audio streaming, and provider authentication.
- LLM prompts, model fallbacks, retries, and evaluation safeguards.
- User data, uploads, exercise history, deployment configuration, and all secrets.

## Deployment boundary

The production backend should be hosted behind HTTPS and a WebSocket-capable reverse proxy. Browser microphone access requires a secure context, and API credentials must remain server-side.
