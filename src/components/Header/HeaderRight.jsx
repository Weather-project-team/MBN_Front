import { useEffect, useState, useRef } from 'react';
import LoginPopup from '../Login/LoginPopup';
import { userState } from '../../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function HeaderRight() {
  const user = useRecoilValue(userState);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const handleLoginPopupClose = () => setShowLoginPopup(false);
  const handleLoginPopupOpen = () => setShowLoginPopup(true);
  const handleToggleMenu = () => setShowMenu((prev) => !prev);

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // 새로고침으로 상태 초기화
  };

  const handleMyPage = () => {
    navigate('/mypage'); // 마이페이지 라우트 경로로 이동
  };

  return (
    <>
      <div className="flex items-center gap-3 relative" ref={menuRef}>
        {user ? (
          <>
            <button className="text-xl">🔔</button>
            {console.log(
              '👀 이미지 경로:',
              `${import.meta.env.VITE_API_BASE_URL}${user.profileImageUrl}`
            )}
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${user.profileImageUrl}`}
              alt="user"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleToggleMenu}
            />
            {showMenu && (
              <div className="absolute w-25 top-10 right-0 bg-white border rounded shadow-md text-sm z-50">
                <button
                  onClick={handleMyPage}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                >
                  My Page
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            onClick={handleLoginPopupOpen}
          >
            Login
          </button>
        )}
      </div>

      {showLoginPopup && (
        <div className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center">
          <LoginPopup onClose={handleLoginPopupClose} />
        </div>
      )}
    </>
  );
}
