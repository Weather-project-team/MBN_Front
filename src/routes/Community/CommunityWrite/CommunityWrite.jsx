import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  createPostApi,
  updatePostApi,
  uploadImages,
} from '../../../api/community/community';
import { editPostState } from '../../../atoms/editPostAtom';
import CommunityWriteForm from '../../../components/communityWrite/CommunityWriteForm';

export default function CommunityWrite() {
  const navigate = useNavigate();
  const id = useParams().id;
  const editPost = useRecoilValue(editPostState);

  const [writeInput, setWriteInput] = useState({
    title: '',
    category: 'pc',
    content: '',
    imageUrls: [],
  });
  console.log(writeInput);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      alert('로그인 후 사용 가능합니다.');
      navigate('/');
    }

    if (id && editPost) {
      setWriteInput({
        title: editPost.title,
        category: editPost.category,
        content: editPost.content,
        imageUrls: editPost.imageUrls,
      });
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWriteInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (files) => {
    setWriteInput((prev) => ({
      ...prev,
      imageUrls: files, // ✅ files = 이미지 파일 배열 or 업로드된 URL 리스트
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const hasImages = writeInput.imageUrls && writeInput.imageUrls.length > 0;

      if (id) {
        // ✅ 수정 로직
        const updatedData = {
          ...writeInput,
          imageUrls: writeInput.imageUrls, // 혼합된 상태 그대로 넘김 (string + File)
        };
        console.log(id, updatedData, token, '업데이트');

        await updatePostApi(id, updatedData, token);
        alert('게시글이 수정되었습니다.');
      } else {
        // ✅ 새 글 작성 로직
        console.log('🔍 이미지 업로드 시도 중:', writeInput.imageUrls);

        const postData = {
          ...writeInput,
          imageUrls: hasImages
            ? await uploadImages(writeInput.imageUrls) // 새 이미지 업로드
            : [],
        };

        await createPostApi(postData, token);
        alert('게시글이 등록되었습니다.');
      }

      navigate(`/community?category=${writeInput.category}`);
    } catch (err) {
      console.error('업로드 또는 글쓰기 실패:', err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  };
  if (id) {
    return (
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
        <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-4">글 수정하기</h1>
          <CommunityWriteForm
            writeInput={writeInput}
            onInputChange={handleInputChange}
            onImageChange={handleImageChange} // ✅ 이미지 업데이트 콜백 추가
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-4">글쓰기</h1>
        <CommunityWriteForm
          writeInput={writeInput}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange} // ✅ 이미지 업데이트 콜백 추가
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
