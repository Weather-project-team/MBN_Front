import { useState } from 'react';
import { createPostApi } from '../../../api/community/community';

export default function CommunityWrite() {
  const [writeInput, setWriteInput] = useState({
    title: '',
    platform: '',
    content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWriteInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(writeInput);
      await createPostApi(writeInput);
      alert('게시물이 작성되었습니다.');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-4">글쓰기</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              제목
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="platform"
              className="block text-sm font-medium text-gray-700"
            >
              플랫폼
              <input
                name="platform"
                onChange={handleInputChange}
                type="text"
                id="platform"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              내용
            </label>
            <textarea
              onChange={handleInputChange}
              id="content"
              rows="10"
              name="content"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            작성하기
          </button>
        </form>
      </div>
    </div>
  );
}
