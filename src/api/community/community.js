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

export async function getAllPostsApi() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const posts = await res.json();
  return posts;
}

export async function getPostDetailApi(id) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch post detail');
  }
  const post = await res.json();
  return post;
}

export async function uploadImages(files) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file); // name="files" 맞춰줘야 함
  });

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('이미지 업로드 실패');
  }

  const urls = await res.json(); // 이미지 URL 배열
  return urls;
}
