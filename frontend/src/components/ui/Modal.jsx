import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Accessible dialog: closes on Escape and on a backdrop click, moves focus into the panel.
// Bottom sheet on phones, centred card from sm up. `footer` renders in .modal-foot.
const Modal = ({ open, onClose, title, children, footer, size = 'sm:max-w-lg' }) => {
    const titleId = useId();
    const panelRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        panelRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    // Portal to <body> so the backdrop sits above the sticky navbar (the page's fade animation makes its own stacking context)
    return createPortal(
        <div className="modal-backdrop animate-fade animate-duration-150" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
            <div
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={`modal-panel ${size} outline-none animate-fade-up animate-duration-200`}
            >
                <div className="modal-head">
                    <h2 id={titleId} className="modal-title">{title}</h2>
                    <button type="button" onClick={onClose} className="icon-btn -mr-2 -mt-1" aria-label="ปิด" title="ปิด">
                        <XMarkIcon />
                    </button>
                </div>
                <div className="modal-body">{children}</div>
                {footer && <div className="modal-foot">{footer}</div>}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
