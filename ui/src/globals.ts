import { Buffer } from 'buffer';

globalThis.Buffer = Buffer;
// @ts-expect-error Midnight dependencies read NODE_ENV in the browser.
globalThis.process = { env: { NODE_ENV: import.meta.env.MODE } };

