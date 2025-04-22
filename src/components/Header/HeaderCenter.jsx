import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function HeaderCenter() {
  const [communityOpen, setCommunityOpen] = useState(false);
  return (
    <ul className="flex items-center gap-6 text-sm text-gray-700">
      <div
        onMouseEnter={() => {
          if (window.innerWidth >= 768) setCommunityOpen(true); // PC에서만 hover
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) setCommunityOpen(false); // PC에서만 hover 해제
        }}
        className="relative"
      >
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              setCommunityOpen((prev) => !prev); // 모바일에선 toggle
            }
          }}
          className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex justify-center items-center gap-1"
        >
          Talk <MdOutlineKeyboardArrowDown />
        </button>

        {communityOpen && (
          <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md p-4 min-w-[150px] z-50">
            <li className="hover:text-blue-400 p-2 transition-colors cursor-pointer duration-300">
              <Link
                to="/community/pc"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setCommunityOpen(false); // 모바일에서 닫기
                  }
                }}
              >
                Pc Game
              </Link>
            </li>
            <li className="hover:text-blue-400 p-2 transition-colors cursor-pointer duration-300">
              <Link
                to="/community/mobile"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setCommunityOpen(false); // 모바일에서 닫기
                  }
                }}
              >
                Mobile Game
              </Link>
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
        <Link to="/timer">Timer</Link>
      </li>
    </ul>
  );
}
