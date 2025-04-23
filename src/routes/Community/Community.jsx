import { useEffect, useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { getAllPostsApi, searchPostsApi } from '../../api/community/community';
import Contents from '../../components/community/Contents';
import SideMenu from '../../components/community/SideMenu';
import { formatShortDate } from '../../utils/formatDate';

export default function Community() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const [period, setPeriod] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [sort, setSort] = useState('createdAt,desc'); // 또는 'viewCount,desc'

  const [page, setPage] = useState(0); // 0-based
  const [postsData, setPostsData] = useState(null);

  const keyword = searchParams.get('keyword');
  const categoryQuery = searchParams.get('category'); // ✅ category 쿼리스트링 추가

  const [posts, setPosts] = useState([]);

  // ✅ 영어 category → 한글 매핑
  const categoryMap = {
    pc: 'pc',
    mobile: 'mobile',
    notice: 'notice',
    event: 'event',
    search: 'Search Result',
  };

  const validcategorys = Object.keys(categoryMap);

  // ✅ category이 있을 때만 유효성 검사
  if (category && !validcategorys.includes(category)) {
    return <Navigate to="/error" replace />;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const categoryKey =
          categoryQuery || (category ? categoryMap[category] : null);

        const res = keyword
          ? await searchPostsApi(keyword)
          : await getAllPostsApi({
              category: categoryKey,
              page,
              size: 10,
              sort, // 여기에 현재 상태값 넣어줌
              // startDate: startDate.toISOString(), → 나중에 백엔드에서 쓸거임
            });
        // Page 객체 기준으로 전체 설정
        setPostsData({
          content: res.content.map((post) => ({
            ...post,
            createdAt: formatShortDate(post.createdAt),
          })),
          totalPages: res.totalPages,
        });
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, [keyword, category, categoryQuery, page, period, sort]);

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      {/* 좌측 콘텐츠 영역 */}
      <Contents
        posts={postsData?.content || []}
        category={categoryQuery || category || 'search'}
        page={page}
        setPage={setPage}
        totalPages={postsData?.totalPages || 1}
        period={period}
        setPeriod={setPeriod}
        sort={sort}
        setSort={setSort}
      />

      {/* 우측 아카이브 사이드바 */}
      <SideMenu />
    </div>
  );
}
