import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Success toast pinned to the top right (full width on phones)
const Alert = ({ message, onClose }) => (
    <div role="status" aria-live="polite" className="fixed inset-x-4 top-4 z-[60] flex items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-pop animate-fade-down animate-duration-200 sm:inset-x-auto sm:right-4 sm:w-96">
        <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        <span className="flex-1 pt-px">{message}</span>
        <button type="button" onClick={onClose} className="-mr-1 -mt-0.5 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="ปิด" title="ปิด">
            <XMarkIcon className="h-4 w-4" />
        </button>
    </div>
);

export default Alert;
