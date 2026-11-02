// Transfer status pill: PENDING (gold), APPROVED (emerald), REJECTED (red)
export const STATUS = {
    PENDING: { label: 'รอดำเนินการ', className: 'badge-pending' },
    APPROVED: { label: 'ได้รับการอนุมัติ', className: 'badge-approved' },
    REJECTED: { label: 'ถูกปฏิเสธ', className: 'badge-rejected' },
};

export const statusLabel = (status) => STATUS[status]?.label ?? status ?? '-';

const StatusBadge = ({ status }) => {
    const s = STATUS[status];
    return (
        <span className={s ? s.className : 'badge-neutral'}>
            <span className="badge-dot" aria-hidden="true" />
            {s ? s.label : status || '-'}
        </span>
    );
};

export default StatusBadge;
