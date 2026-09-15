import { describe, expect, it } from 'vitest';
import { bytesToHex, commitText, decryptPrivatePayload, encryptPrivatePayload, formatTnight, hexToBytes, parseTnight } from './index.js';

describe('amount conversion', () => {
  it('round-trips fractional tNIGHT values', () => {
    expect(parseTnight('12.345678')).toBe(12_345_678n);
    expect(formatTnight(12_345_678n)).toBe('12.345678 tNIGHT');
  });

  it('rejects unsupported precision', () => {
    expect(() => parseTnight('1.0000001')).toThrow('up to 6 decimal places');
  });
});

describe('private inputs', () => {
  it('round-trips 32-byte secrets', () => {
    const value = new Uint8Array(32).fill(17);
    expect(hexToBytes(bytesToHex(value))).toEqual(value);
  });

  it('creates stable commitments without exposing plaintext', async () => {
    const first = await commitText('private agreement');
    const second = await commitText('private agreement');
    expect(first).toEqual(second);
    expect(new TextDecoder().decode(first)).not.toContain('private agreement');
  });

  it('encrypts invite metadata and rejects the wrong invite secret', async () => {
    const key = new Uint8Array(32).fill(7);
    const value = { title: 'Confidential build', milestones: ['Prototype'] };
    const payload = await encryptPrivatePayload(value, key);

    expect(payload).not.toContain(value.title);
    await expect(decryptPrivatePayload(payload, key)).resolves.toEqual(value);
    await expect(decryptPrivatePayload(payload, new Uint8Array(32).fill(8))).rejects.toThrow(/authenticated/);
  });
});
