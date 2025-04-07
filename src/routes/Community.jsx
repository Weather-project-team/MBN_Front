import { useParams, Navigate } from 'react-router-dom';
import SideMenu from '../components/community/SideMenu';
import Contents from '../components/community/Contents';

export default function Community() {
  const { platform } = useParams();

  const validPlatforms = ['pc', 'mobile'];
  if (!validPlatforms.includes(platform)) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      {/* 좌측 콘텐츠 영역 */}
      <Contents platform={platform} />

      {/* 우측 아카이브 사이드바 */}
      <SideMenu />
    </div>
  );
}
