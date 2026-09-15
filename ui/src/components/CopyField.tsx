import { Check, Copy } from '@phosphor-icons/react';
import { useState } from 'react';

export function CopyField({ label, value, secret = false }: { label: string; value: string; secret?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="copy-field">
      <div>
        <span className="field-label">{label}</span>
        <code>{secret ? `${value.slice(0, 8)}${'•'.repeat(20)}${value.slice(-6)}` : value}</code>
      </div>
      <button className="icon-button" type="button" onClick={copy} aria-label={`Copy ${label}`}>
        {copied ? <Check size={18} weight="bold" /> : <Copy size={18} />}
      </button>
    </div>
  );
}

