import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';
export default function Header() {
  const [communityOpen, setCommunityOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
        {/* 왼쪽: 로고 + 검색 */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-blue-500 font-bold text-xl">
            M
          </Link>

          <div className="relative">
            <input
              type="text"
              placeholder="Search (ctrl + k)"
              className="pl-8 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* 가운데: 메뉴 */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <div
            onMouseEnter={() => setCommunityOpen(true)}
            onMouseLeave={() => setCommunityOpen(false)}
            className="relative"
          >
            <button className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex justify-center items-center gap-1">
              Community <MdOutlineKeyboardArrowDown />
            </button>

            {communityOpen && (
              <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md p-4 min-w-[150px] z-50">
                <li className="hover:text-blue-400 p-2 transition-colors cursor-pointer duration-300">
                  <Link to={'/community/pc'}>Pc Game</Link>
                </li>
                <li className="hover:text-blue-400 p-2 transition-colors cursor-pointer duration-300">
                  <Link to={'/community/mobile'}>Mobile Game</Link>
                </li>
              </ul>
            )}
          </div>

          <li className="hover:text-blue-400 transition-colors cursor-pointer duration-300">
            Event
          </li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer duration-300">
            Notice
          </li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer duration-300">
            Timer
          </li>
        </ul>

        {/* 오른쪽: 버튼 + 알림 + 유저 */}
        <div className="flex items-center gap-3">
          <button className="text-xl">🔔</button>
          <img
            src="https://i.pravatar.cc/30?img=3"
            alt="user"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
