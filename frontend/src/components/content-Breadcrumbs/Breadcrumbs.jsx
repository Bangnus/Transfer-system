import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

// links: [{ label, to? }] — the last item (no `to`) is the current page
const BreadcrumbsCustom = ({ links }) => (
    <nav aria-label="breadcrumb" className="mb-4 overflow-x-auto">
        <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm text-slate-500">
            {links.map((link, index) => (
                <li key={index} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRightIcon className="h-4 w-4 text-slate-300" aria-hidden="true" />}
                    {link.to ? (
                        <Link to={link.to} className="rounded underline-offset-4 hover:text-navy-700 hover:underline">{link.label}</Link>
                    ) : (
                        <span aria-current="page" className="font-medium text-slate-700">{link.label}</span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);

export default BreadcrumbsCustom;
