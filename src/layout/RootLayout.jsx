import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userAtom';
import { useEffect } from 'react';
import { getUser } from '../api/user/user';

export default function RootLayout() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUser = async () => {
      try {
        const user = await getUser(token);
        setUser(user); // ✅ 여기서 user는 실제 유저 객체
      } catch (err) {
        console.error('유저 정보 가져오기 실패:', err);
      }
    };

    fetchUser(); // 🔥 호출
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Header />

      <main>
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-300 mt-12 py-4 text-center text-sm text-gray-500">
        ⓒ 2025 YourSite All rights reserved.
      </footer>
    </div>
  );
}
