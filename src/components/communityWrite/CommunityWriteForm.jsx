import { AiOutlinePlus } from 'react-icons/ai';
import ImageUploadInput from './ImageUploadInput';

export default function CommunityWriteForm({
  writeInput,
  onInputChange,
  onSubmit,
  onImageChange,
}) {
  const handleImageSelect = (files) => {
    onImageChange(files); // ✅ 부모에게 파일 전달
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          onChange={onInputChange}
          type="text"
          id="title"
          name="title"
          value={writeInput.title}
          className="mt-1 block w-full border p-2 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          카테고리
        </label>
        <select
          className="mt-1 block border p-2 rounded-md shadow-sm"
          name="category"
          id="category"
          onChange={onInputChange}
          value={writeInput.category}
        >
          <option>pc</option>
          <option>mobile</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          내용
        </label>
        <textarea
          onChange={onInputChange}
          id="content"
          name="content"
          rows="10"
          value={writeInput.content}
          className="mt-1 block w-full border p-2 rounded-md shadow-sm"
        ></textarea>
      </div>

      <button className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        <AiOutlinePlus className="text-lg" /> Write
      </button>
      <ImageUploadInput
        initialUrls={writeInput.imageUrls}
        onImageSelect={handleImageSelect}
      />
    </form>
  );
}
