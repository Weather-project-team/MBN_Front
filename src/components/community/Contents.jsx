import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userAtom';
import ContentsList from './ContentsList';
import ContentsTab from './ContentsTab';

export default function Contents({
  category,
  posts,
  page,
  setPage,
  totalPages,
  period,
  setPeriod,
  sort,
  setSort,
}) {
  const user = useRecoilValue(userState);
  const isGameCategory =
    category !== 'notice' && category !== 'event' && category !== 'search';

  return (
    <div className="lg:col-span-3">
      {/* 제목 */}
      <ContentsTab
        category={category}
        period={period}
        setPeriod={setPeriod}
        sort={sort}
        setSort={setSort}
      />

      {/* 콘텐츠 리스트 */}
      <ContentsList category={category} posts={posts} />

      {/* 페이지네이션 */}
      <div className="relative">
        <ul className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              onClick={() => setPage(i)}
              className={`cursor-pointer px-3 py-1 rounded ${
                page === i
                  ? 'bg-blue-500 text-white font-semibold'
                  : 'bg-gray-100 hover:bg-blue-100'
              }`}
            >
              {i + 1}
            </li>
          ))}
        </ul>

        {/* 작성 버튼 */}
        {user && isGameCategory ? (
          <Link
            to="/community/write"
            className="absolute top-0 right-0 bg-blue-500 text-white font-medium px-3 py-1.5 rounded-md hover:bg-amber-600 transition flex items-center gap-1"
          >
            <AiOutlinePlus className="text-base" />
            Write
          </Link>
        ) : null}
      </div>
    </div>
  );
}
