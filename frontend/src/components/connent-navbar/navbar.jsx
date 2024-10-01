import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { clearUser } from '../../store/actions/userActions';
// image
import logonav from '../../assets/sisruts_logonav.png'
import iconuser from '../../assets/icon_user.png'
import iconslogout from '../../assets/icon_logout.png'

const navbar = ( ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    navigate('/'); // เปลี่ยนเส้นทางไปที่หน้า login หรือหน้าแรกหลังจาก logout
  };
  return (
    <>
      <div className='py-[12px] bg-customBlue text-white'>
        <div className="flex justify-between mx-5">
          <div className="">
            <Link to="/home">
              <img className='w-[100px] ' src={logonav} alt="" />
            </Link>
          </div>
          <button onClick={handleLogout} className="text-white uppercase text-[14px] flex gap-1 items-center hover:opacity-50">
            <img className='w-[20px]' src={iconuser} alt="" />
            {user?.username}
            <img className='w-[20px]' src={iconslogout} alt="" />
          </button>
        </div>
      </div >
    </>
  )
}

export default navbar;