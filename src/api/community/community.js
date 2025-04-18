export async function createPostApi(data, token) {
  console.log(`${import.meta.env.VITE_API_BASE_URL} url`);
  console.log('data', data);
  console.log('token', token);
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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

export async function updatePostApi(postId, data, token) {
  const formData = new FormData();

  // 1. 기존 이미지 URL만 담은 dto 생성
  const dto = {
    title: data.title,
    content: data.content,
    platform: data.platform,
    tag: data.tag,
    existingImageUrls: data.imageUrls.filter((img) => typeof img === 'string'),
  };

  formData.append(
    'dto',
    new Blob([JSON.stringify(dto)], { type: 'application/json' })
  );

  // 2. 새로 추가된 파일만 필터링해서 추가
  data.imageUrls
    .filter((img) => typeof img !== 'string') // File 객체만 추출
    .forEach((file) => {
      formData.append('newImages', file);
    });

  // 3. 요청 전송
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, // Content-Type은 FormData일 때 생략해야 함
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error('게시글 수정 실패');
  }

  const result = await res.text(); // 현재 컨트롤러는 "게시글 수정 완료" 텍스트 반환 중
  return result;
}
