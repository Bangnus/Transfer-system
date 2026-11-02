import Navbar from '../connent-navbar/navbar';
import BreadcrumbsCustom from '../content-Breadcrumbs/Breadcrumbs';

// Signed-in page frame: top bar, optional breadcrumbs, centred content column
const AppLayout = ({ breadcrumbs, children, className = '' }) => (
  <div className="min-h-screen">
    <Navbar />
    <main className={`page animate-fade animate-duration-300 ${className}`}>
      {breadcrumbs && <BreadcrumbsCustom links={breadcrumbs} />}
      {children}
    </main>
  </div>
);

export default AppLayout;
