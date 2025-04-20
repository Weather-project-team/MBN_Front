import { useState, useEffect, useRef } from 'react';

export default function ImageUploadInput({ onImageSelect, initialUrls = [] }) {
  const [images, setImages] = useState([]); // [{ file, preview }]
  const isInitialLoaded = useRef(false); // ✅ 최초 1회만 실행용

  // ✅ 최초 마운트 시 초기 이미지 세팅
  useEffect(() => {
    if (!isInitialLoaded.current && initialUrls.length > 0) {
      isInitialLoaded.current = true;

      const initial = initialUrls.map((url) => ({
        file: url,
        preview: url.startsWith('http')
          ? url
          : `${import.meta.env.VITE_API_BASE_URL}${url}`,
      }));

      setImages(initial);
      onImageSelect(initial.map((img) => img.file));
    }
  }, [initialUrls, onImageSelect]);

  // ✅ 이미지 추가
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updated = [...images, ...newImages];
    setImages(updated);
    onImageSelect(updated.map((img) => img.file));
  };

  // ✅ 이미지 삭제
  const handleRemoveImage = (index) => {
    const removed = images[index];
    if (removed.file instanceof File && removed.preview.startsWith('blob:')) {
      URL.revokeObjectURL(removed.preview);
    }

    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
    onImageSelect(updated.map((img) => img.file));
  };

  // ✅ 언마운트 시 blob 정리
  useEffect(() => {
    return () => {
      images.forEach(({ preview }) => {
        if (preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [images]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        이미지 업로드 (여러 장 가능)
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
      />

      <div className="flex flex-nowrap overflow-x-auto scrollbar-hide scroll-smooth md:flex-wrap gap-4 mt-4">
        {images.map(({ preview }, index) => (
          <div key={index} className="relative w-fit shrink-0">
            <img
              src={preview}
              alt={`미리보기 ${index}`}
              className="w-48 h-auto rounded-lg border shadow-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
