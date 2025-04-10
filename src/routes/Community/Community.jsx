import { useParams, Navigate } from 'react-router-dom';
import Contents from '../../components/community/Contents';
import SideMenu from '../../components/community/SideMenu';
import { useEffect, useState } from 'react';
import { getAllPostsApi } from '../../api/community/community';
import { formatShortDate } from '../../utils/formatDate';

export default function Community() {
  const { platform } = useParams();
  const [posts, setPosts] = useState([]);

  const validPlatforms = ['pc', 'mobile'];
  if (!validPlatforms.includes(platform)) {
    return <Navigate to="/error" replace />;
  }

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await getAllPostsApi();

        // 받은 데이터에서 createdAt 값을 MM-DD 형식으로 변환
        const postsWithFormattedDate = res.map((post) => ({
          ...post,
          createdAt: formatShortDate(post.createdAt), // MM-DD 형식으로 변환
        }));

        setPosts(postsWithFormattedDate); // 변환된 데이터로 상태 업데이트
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };

    getAllPosts();
  }, []);
  console.log('posts', posts);

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      {/* 좌측 콘텐츠 영역 */}
      <Contents posts={posts} platform={platform} />

      {/* 우측 아카이브 사이드바 */}
      <SideMenu />
    </div>
  );
}
