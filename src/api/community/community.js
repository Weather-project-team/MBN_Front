export async function createPostApi(data, token) {
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

// Posts GET
export async function getAllPostsApi({ category, page, size, sort }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const queryParams = new URLSearchParams();
  if (category) queryParams.append('category', category);
  queryParams.append('page', page);
  queryParams.append('size', size);
  queryParams.append('sort', sort);

  const url = `${baseUrl}/posts?${queryParams.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return await res.json(); // Page<Post> 형태
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
    category: data.category,
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

export async function deletePostApi(postId, token) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const errText = await res.text(); // json 대신 text로 받아
    throw new Error(`게시글 삭제 실패: ${errText}`);
  }

  // 만약 서버에서 본문 없이 응답하면 여기서 에러 방지
  try {
    const result = await res.json();
    return result;
  } catch (e) {
    return { message: '삭제 완료' }; // 대체 응답
  }
}

// search
export async function searchPostsApi(keyword) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/posts/search?keyword=${keyword}`,
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error('검색 실패!'); // <-- `throw` 해야 에러 처리가 제대로 돼
  }

  const result = await res.json(); // <-- `await` 빠졌음
  return result;
}
