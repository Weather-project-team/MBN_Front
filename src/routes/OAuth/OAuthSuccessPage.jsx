// src/pages/OAuthSuccessPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/', { replace: true });
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}
