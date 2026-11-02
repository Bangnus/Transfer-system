import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { ArrowRightOnRectangleIcon, HomeIcon, ArrowsRightLeftIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { clearUser } from '../../store/actions/userActions';
import logonav from '../../assets/sisruts_logonav.png';

const LINKS = {
  student: [
    { to: '/home', label: 'หน้าหลัก', icon: HomeIcon },
    { to: '/tranfer', label: 'เทียบโอนรายวิชา', icon: ArrowsRightLeftIcon },
  ],
  staff: [
    { to: '/personnel', label: 'งานเทียบโอน', icon: Squares2X2Icon },
  ],
};

// First letter of the first name, without the Thai title
const initials = (user) => (user?.firstname || user?.name || user?.username || '?')
  .replace(/^(นางสาว|นาย|นาง|อาจารย์|ดร\.)/, '').trim().charAt(0);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const links = LINKS[user?.type] || [];

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    navigate('/'); // back to the login page
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to={user?.type === 'staff' ? '/personnel' : '/home'} className="flex shrink-0 items-center gap-3 rounded-md">
          <img className="h-5 w-auto" src={logonav} alt="SIS-RUTS" />
          <span className="hidden border-l border-white/20 pl-3 text-sm font-medium text-navy-100 sm:inline">ระบบเทียบโอนรายวิชา</span>
        </Link>

        <nav aria-label="เมนูหลัก" className="ml-4 hidden items-center gap-1 md:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
              <Icon aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden whitespace-nowrap text-right leading-tight lg:block">
            <div className="text-sm font-medium text-white">{user?.name || user?.username}</div>
            <div className="text-xs text-navy-200">{user?.type === 'staff' ? 'เจ้าหน้าที่' : `รหัสนักศึกษา ${user?.username ?? ''}`}</div>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-sm font-semibold text-navy-950" aria-hidden="true">{initials(user)}</span>
          <button type="button" onClick={handleLogout} className="inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-navy-100 transition-colors hover:bg-white/10 hover:text-white" title="ออกจากระบบ" aria-label="ออกจากระบบ">
            <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
            <span className="hidden lg:inline">ออกจากระบบ</span>
          </button>
        </div>
      </div>

      {links.length > 1 && (
        <nav aria-label="เมนูหลัก (มือถือ)" className="flex gap-1 overflow-x-auto border-t border-white/10 px-3 py-2 md:hidden">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link shrink-0${isActive ? ' is-active' : ''}`}>
              <Icon aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
