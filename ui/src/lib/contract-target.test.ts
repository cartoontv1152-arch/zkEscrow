import { describe, expect, it } from 'vitest';
import { resolveContractTarget } from './contract-target.js';

const configured = 'a'.repeat(64);
const invited = 'b'.repeat(64);
const stored = 'c'.repeat(64);

describe('resolveContractTarget', () => {
  it('always prefers the app-configured shared registry', () => {
    expect(resolveContractTarget(configured, invited, stored).address).toBe(configured);
  });

  it('supports invitation and previous-session fallbacks', () => {
    expect(resolveContractTarget(undefined, invited, stored).address).toBe(invited);
    expect(resolveContractTarget(undefined, null, stored).address).toBe(stored);
  });

  it('rejects invalid production configuration', () => {
    expect(resolveContractTarget('not-an-address', null, null).configurationError).toMatch(/VITE_ZKESCROW/);
  });
});
