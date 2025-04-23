import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthSuccessPage() {
  const navigate = useNavigate();
  console.log('asdf');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        localStorage.setItem('token', token);
        // 저장 성공 후 리디렉션
        navigate('/', { replace: true });
      } catch (error) {
        console.error('토큰 저장 실패:', error);
      }
    } else {
      // 토큰 없을 경우 fallback (에러 처리)
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <div>🔐 로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
}
