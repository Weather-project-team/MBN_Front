import { Link } from 'react-router-dom';
import ContentsList from './ContentsList';
import { AiOutlinePlus } from 'react-icons/ai';
import ContentsTab from './ContentsTab';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userAtom';

export default function Contents({ platform, posts }) {
  const user = useRecoilValue(userState);
  return (
    <div className="lg:col-span-3">
      {/* 제목 */}

      <ContentsTab platform={platform} />

      {/* 콘텐츠 리스트 자리 */}
      <ContentsList platform={platform} posts={posts} />
      <div className="relative">
        <ul className="flex justify-center items-center gap-2 mt-4">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
        {user ? (
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
