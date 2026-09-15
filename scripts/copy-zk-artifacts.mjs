import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const managed = resolve(root, 'contract/src/managed/zkescrow');
const targets = [
  ['keys', resolve(root, 'ui/public/keys')],
  ['zkir', resolve(root, 'ui/public/zkir')],
];

for (const [name, target] of targets) {
  const source = resolve(managed, name);
  if (!existsSync(source)) {
    throw new Error(`Missing ${source}. Run npm run compact first.`);
  }
  rmSync(target, { recursive: true, force: true });
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
}

console.log('Copied Compact proving artifacts into ui/public.');

