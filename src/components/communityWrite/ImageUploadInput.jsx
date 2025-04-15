import { useState, useEffect } from 'react';

export default function ImageUploadInput({ onImageSelect, initialUrls }) {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // ✅ 수정 모드일 때 초기 URL들 세팅
  useEffect(() => {
    if (initialUrls.length > 0) {
      const previews = initialUrls.map((url) => ({
        file: null, // File 객체는 없음
        preview: `${import.meta.env.VITE_API_BASE_URL}${url}`, // 전체 URL로 만들어줌
      }));
      setPreviewUrls(previews);
      setSelectedFiles(initialUrls); // 그대로 string 배열 유지

      // 수정 모드에서는 업로드 안하므로, 그대로 전달
      setTimeout(() => {
        onImageSelect(initialUrls); // string URL 그대로 전달
      }, 0);
    }
  }, [initialUrls, onImageSelect]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedFiles = [...selectedFiles, ...files];
    const updatedPreviews = [...previewUrls, ...previews];

    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);

    // ✅ setState 직후에 실행
    // 다음 렌더링 사이클에서 안전하게 실행됨
    setTimeout(() => {
      onImageSelect(updatedFiles);
    }, 0);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      onImageSelect(newFiles);
      return newFiles;
    });

    setPreviewUrls((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      URL.revokeObjectURL(newPreviews[index].preview);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  // 언마운트 시 미리보기 메모리 해제
  useEffect(() => {
    return () => {
      previewUrls.forEach(({ preview }) => URL.revokeObjectURL(preview));
    };
  }, [previewUrls]);

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

      <div className="flex flex-wrap gap-4 mt-4">
        {previewUrls.map(({ preview }, index) => (
          <div key={index} className="relative w-fit">
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
