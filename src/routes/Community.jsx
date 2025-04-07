// src/routes/Community.jsx
import { useParams, Navigate } from 'react-router-dom';

export default function Community() {
  const { platform } = useParams();

  // 허용된 플랫폼만 통과
  const validPlatforms = ['pc', 'mobile'];

  // 유효하지 않으면 에러 페이지로 리다이렉트
  if (!validPlatforms.includes(platform)) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div>
      <h1>{platform.toUpperCase()} Game Community</h1>
      {/* 나머지 내용 */}
    </div>
  );
}
