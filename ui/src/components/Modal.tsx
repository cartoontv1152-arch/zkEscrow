import { X } from '@phosphor-icons/react';
import { useEffect, useRef, type PropsWithChildren, type ReactNode } from 'react';

export function Modal({ title, description, onClose, children, footer }: PropsWithChildren<{
  title: string;
  description?: string;
  onClose: () => void;
  footer?: ReactNode;
}>) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = () => dialog ? Array.from(dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('disabled')) : [];
    const first = focusable()[0];
    (first ?? dialog)?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const current = document.activeElement;
      const index = items.indexOf(current as HTMLElement);
      const next = event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : (index === items.length - 1 ? 0 : index + 1);
      if (index < 0 || next !== index) {
        event.preventDefault();
        items[next].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, []);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1}>
        <header className="modal-header">
          <div>
            <h2 id="modal-title">{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-footer">{footer}</footer>}
      </section>
    </div>
  );
}
