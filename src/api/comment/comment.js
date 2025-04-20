export async function createCommentApi(data, token) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('댓글 작성 실패!');
  }
  const result = await res.json();
  return result;
}

export async function getAllCommentsApi(postId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/comments?postId=${postId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!res.ok) {
    throw new Error('댓글 못 가져옴!');
  }
  return await res.json();
}
