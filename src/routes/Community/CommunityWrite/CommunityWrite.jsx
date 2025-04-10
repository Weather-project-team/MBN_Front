import { useState } from 'react';
import CommunityWriteForm from '../../../components/communityWrite/CommunityWriteForm';
import { uploadImages, createPostApi } from '../../../api/community/community';
import { useNavigate } from 'react-router-dom';

export default function CommunityWrite() {
  const navigate = useNavigate();
  const [writeInput, setWriteInput] = useState({
    title: '',
    platform: '',
    content: '',
    tag: '',
    imageUrls: [],
  });
  console.log('writeInput', writeInput);

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

    try {
      const hasImages = writeInput.imageUrls && writeInput.imageUrls.length > 0;

      const postData = {
        ...writeInput,
        imageUrls: hasImages
          ? await uploadImages(writeInput.imageUrls) // ✅ 이미지 있을 때만 업로드
          : [], // ✅ 없으면 빈 배열
      };

      await createPostApi(postData);
      navigate('/community/pc');
    } catch (err) {
      console.error('업로드 또는 글쓰기 실패:', err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

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
