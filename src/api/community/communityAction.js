export default async function toggleLikeApi(postId, token) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/like`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('좋아요 실패!');
  }
  const result = await res.text();
  return result;
}
