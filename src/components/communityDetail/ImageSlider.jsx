import { useState } from 'react';

export default function ImageSlider({ imageUrls }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-[360px] h-[360px] mx-auto overflow-hidden border rounded">
      {/* 슬라이드 트랙 */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / imageUrls.length)}%)`,
          width: `${imageUrls.length * 100}%`,
        }}
      >
        {imageUrls.map((image, idx) => {
          const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${image}`;
          return (
            <div
              key={idx}
              className="flex justify-center items-center shrink-0 h-[360px]"
              style={{ width: `${100 / imageUrls.length}%` }}
            >
              <img
                src={fullUrl}
                alt={`slide-${idx}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          );
        })}
      </div>

      {/* 좌우 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white
          bg-opacity-70 hover:bg-opacity-90  px-2 py-1 shadow h-full"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white
          bg-opacity-70 hover:bg-opacity-90  px-2 py-1 shadow h-full"
      >
        ▶
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {imageUrls.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
