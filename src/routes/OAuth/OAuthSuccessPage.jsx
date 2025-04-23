import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('✅ OAuthSuccessPage 렌더링됨');

    const timeout = setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      console.log('🔍 받은 토큰:', token);

      if (token) {
        try {
          localStorage.setItem('token', token);
          console.log('✅ 토큰 저장 완료, 메인 페이지로 이동합니다.');
          navigate('/', { replace: true });
        } catch (error) {
          console.error('❌ 토큰 저장 실패:', error);
          navigate('/', { replace: true });
        }
      } else {
        console.warn('❗ 토큰이 없습니다. 메인 페이지로 이동합니다.');
        navigate('/', { replace: true });
      }
    }, 200); // 렌더링 후 딜레이 줘서 타이밍 안정화

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <div>🔐 로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
}
