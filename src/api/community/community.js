export async function createPostApi(data) {
  console.log(`${import.meta.env.VITE_API_BASE_URL} url`);
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('Failed to create post');
  }
  const result = await res.json();
  return result;
}
