import { pureCircuits, type Ledger, type Milestone, DealStatus, MilestoneStatus } from '@zkescrow/contract';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';

export const NETWORK_ID = 'preprod' as const;
export const PRIVATE_STATE_ID = 'zkEscrowPrivateState' as const;
export const TNIGHT_SCALE = 1_000_000n;

export type UserRole = 'buyer' | 'seller' | 'arbitrator' | 'observer';

export type MilestoneView = {
  readonly id: bigint;
  readonly amount: bigint;
  readonly deliveryDeadline: bigint;
  readonly reviewDeadline: bigint;
  readonly labelCommitment: string;
  readonly deliveryCommitment: string;
  readonly status: number;
};

export type DealRecord = {
  readonly buyerKey: Uint8Array;
  readonly sellerKey: Uint8Array;
  readonly arbitratorKey: Uint8Array;
  readonly sellerInviteCommitment: Uint8Array;
  readonly arbitratorInviteCommitment: Uint8Array;
  readonly buyerPayout: { readonly bytes: Uint8Array };
  readonly sellerPayout: { readonly bytes: Uint8Array };
  readonly amount: bigint;
  readonly plannedAmount: bigint;
  readonly fundedAmount: bigint;
  readonly releasedAmount: bigint;
  readonly refundedAmount: bigint;
  readonly milestoneCount: bigint;
  readonly paidMilestoneCount: bigint;
  readonly settledMilestoneCount: bigint;
  readonly deadline: bigint;
  readonly metadataCommitment: Uint8Array;
  readonly status: number;
  readonly refundRequested: boolean;
};

export type DealView = {
  readonly id: bigint;
  readonly deal: DealRecord;
  readonly milestones: readonly MilestoneView[];
  readonly role: UserRole;
};

const sameBytes = (left: Uint8Array, right: Uint8Array): boolean => toHex(left) === toHex(right);

export const deriveRole = (deal: DealRecord, userSecret: Uint8Array): UserRole => {
  const userKey = pureCircuits.deriveUserPublicKey(userSecret);
  if (sameBytes(deal.buyerKey, userKey)) return 'buyer';
  if (sameBytes(deal.sellerKey, userKey)) return 'seller';
  if (sameBytes(deal.arbitratorKey, userKey)) return 'arbitrator';
  return 'observer';
};

export const readDeals = (state: Ledger, userSecret: Uint8Array): readonly DealView[] => {
  const result: DealView[] = [];
  for (const [id, deal] of state.deals) {
    const dealMilestones: MilestoneView[] = [];
    if (state.milestones.member(id)) {
      for (const [milestoneId, milestone] of state.milestones.lookup(id)) {
        dealMilestones.push(toMilestoneView(milestoneId, milestone));
      }
    }
    dealMilestones.sort((a, b) => Number(a.id - b.id));
    result.push({ id, deal: deal as DealRecord, milestones: dealMilestones, role: deriveRole(deal, userSecret) });
  }
  return result.sort((a, b) => Number(b.id - a.id));
};

const toMilestoneView = (id: bigint, milestone: Milestone): MilestoneView => ({
  id,
  amount: milestone.amount,
  deliveryDeadline: milestone.deliveryDeadline,
  reviewDeadline: milestone.reviewDeadline,
  labelCommitment: toHex(milestone.labelCommitment),
  deliveryCommitment: toHex(milestone.deliveryCommitment),
  status: milestone.status,
});

export const dealStatusLabel = (status: number): string => {
  const labels: Record<number, string> = {
    [DealStatus.DRAFT]: 'Awaiting seller',
    [DealStatus.ACCEPTED]: 'Ready to fund',
    [DealStatus.FUNDED]: 'Funded',
    [DealStatus.IN_PROGRESS]: 'In progress',
    [DealStatus.DISPUTED]: 'Disputed',
    [DealStatus.COMPLETED]: 'Completed',
    [DealStatus.CANCELLED]: 'Cancelled',
    [DealStatus.REFUNDED]: 'Refunded',
    [DealStatus.SETTLED]: 'Settled',
  };
  return labels[status] ?? 'Unknown';
};

export const milestoneStatusLabel = (status: number): string => {
  const labels: Record<number, string> = {
    [MilestoneStatus.PENDING]: 'Pending delivery',
    [MilestoneStatus.SUBMITTED]: 'Awaiting approval',
    [MilestoneStatus.PAID]: 'Paid',
    [MilestoneStatus.REFUNDED]: 'Refunded',
  };
  return labels[status] ?? 'Unknown';
};

export const formatTnight = (value: bigint): string => {
  const whole = value / TNIGHT_SCALE;
  const fraction = (value % TNIGHT_SCALE).toString().padStart(6, '0').replace(/0+$/, '');
  return `${whole.toLocaleString('en-US')}${fraction ? `.${fraction}` : ''} tNIGHT`;
};

export const parseTnight = (value: string): bigint => {
  const normalized = value.trim();
  if (!/^\d+(\.\d{1,6})?$/.test(normalized)) {
    throw new Error('Enter a positive tNIGHT amount with up to 6 decimal places.');
  }
  const [whole, fraction = ''] = normalized.split('.');
  const result = BigInt(whole) * TNIGHT_SCALE + BigInt(fraction.padEnd(6, '0'));
  if (result <= 0n) throw new Error('Amount must be greater than zero.');
  return result;
};

export const randomSecret = (): Uint8Array => crypto.getRandomValues(new Uint8Array(32));

export const bytesToHex = (bytes: Uint8Array): string => toHex(bytes);

export const hexToBytes = (value: string): Uint8Array => {
  const hex = value.trim().replace(/^0x/, '').toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(hex)) throw new Error('Identity and invite secrets must be 64 hexadecimal characters.');
  return Uint8Array.from(hex.match(/.{2}/g)!.map((byte) => Number.parseInt(byte, 16)));
};

export const commitText = async (value: string): Promise<Uint8Array> => {
  const normalized = value.trim();
  if (!normalized) throw new Error('Private text cannot be empty.');
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalized)));
};

const toBase64Url = (bytes: Uint8Array): string => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (value: string): Uint8Array => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const toArrayBuffer = (bytes: Uint8Array): ArrayBuffer => Uint8Array.from(bytes).buffer;

export const encryptPrivatePayload = async (value: unknown, secret: Uint8Array): Promise<string> => {
  if (secret.length !== 32) throw new Error('Private payload keys must contain 32 bytes.');
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey('raw', toArrayBuffer(secret), 'AES-GCM', false, ['encrypt']);
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: toArrayBuffer(iv) }, key, toArrayBuffer(plaintext)));
  return `${toBase64Url(iv)}.${toBase64Url(ciphertext)}`;
};

export const decryptPrivatePayload = async <T>(payload: string, secret: Uint8Array): Promise<T> => {
  if (secret.length !== 32) throw new Error('Private payload keys must contain 32 bytes.');
  const [ivPart, ciphertextPart, extra] = payload.split('.');
  if (!ivPart || !ciphertextPart || extra) throw new Error('The private invite payload is malformed.');
  const key = await crypto.subtle.importKey('raw', toArrayBuffer(secret), 'AES-GCM', false, ['decrypt']);
  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: toArrayBuffer(fromBase64Url(ivPart)) },
      key,
      toArrayBuffer(fromBase64Url(ciphertextPart)),
    );
    return JSON.parse(new TextDecoder().decode(plaintext)) as T;
  } catch {
    throw new Error('The private invite payload could not be authenticated.');
  }
};

export const unixSeconds = (date: string): bigint => {
  const timestamp = Date.parse(date);
  if (!Number.isFinite(timestamp)) throw new Error('Enter a valid date and time.');
  return BigInt(Math.floor(timestamp / 1000));
};
