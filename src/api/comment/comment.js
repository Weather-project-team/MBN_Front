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

export async function editCommentApi(data, token, commentId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/comments/${commentId}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteCommentApi(commentId, token) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('댓글 삭제 실패');
  }

  return await res.text(); // or res.json() depending on server
}
