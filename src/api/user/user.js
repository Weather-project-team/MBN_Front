export async function getUser(token) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = await res.json();
  return user;
}

export async function updateUser(data, token) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to update user');
  }
  const message = await res.text(); // ✅ 이걸로 바꿔
  console.log('Updated user:', message);

  return message;
}
