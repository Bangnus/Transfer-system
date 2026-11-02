import { InboxIcon } from '@heroicons/react/24/outline';

// Empty list placeholder: icon, one short line, optional action
const EmptyState = ({ icon: Icon = InboxIcon, title, children }) => (
    <div className="empty-state">
        <Icon aria-hidden="true" />
        <p className="font-medium text-slate-700">{title}</p>
        {children}
    </div>
);

export default EmptyState;
