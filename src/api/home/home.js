export async function getRecentApi() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/recent?limit=10`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!res.ok) {
    throw new Error('최신 게시글을 가져올 수 없습니다.');
  }
  const result = await res.json();
  return result;
}
