import { useEffect, useState } from 'react';
import LoginPopup from '../Login/LoginPopup';

export default function HeaderRight() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const handleLoginPopupClose = () => {
    setShowLoginPopup(false);
  };
  const handleLoginPopupOpen = () => {
    setShowLoginPopup(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // 토큰 있으면 true
  }, []);

  return (
    <>
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <button className="text-xl">🔔</button>
            <img
              src="https://i.pravatar.cc/30?img=3"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
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
      {/* 로그인 팝업 */}
    </>
  );
}
