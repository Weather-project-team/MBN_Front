import { Link } from 'react-router-dom';
import ContentsList from './ContentsList';

export default function Contents({ platform }) {
  return (
    <div className="lg:col-span-3">
      {/* 제목 */}
      <div className="flex border-b border-gray-300 justify-between">
        <h2 className="text-2xl font-bold mb-4">
          {platform.charAt(0).toUpperCase() + platform.slice(1)} Community
        </h2>

        {/* 탭 */}
        <div className="flex items-center gap-6  text-sm text-gray-700">
          <button className="text-red-500 font-semibold border-b-2 border-red-500 pb-1">
            Daily
          </button>
          <button className="hover:text-red-400">Weekly</button>
          <button className="hover:text-red-400">Monthly</button>
          <button className="hover:text-red-400">Yearly</button>
        </div>
        {/* 필터 탭 (정렬용) */}
        <div className="flex gap-4 text-sm">
          <button className="text-blue-600 font-medium underline underline-offset-4">
            Likes
          </button>
          <button className="hover:underline hover:text-blue-500">Views</button>
        </div>
      </div>

      {/* 콘텐츠 리스트 자리 */}
      <ContentsList />
      <div className="relative">
        <ul className="flex justify-center items-center gap-2 mt-4">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
        <Link
          to={'/community/write'}
          className="absolute top-0 right-0 bg-amber-500 p-2 rounded-lg"
        >
          create
        </Link>
      </div>
    </div>
  );
}
