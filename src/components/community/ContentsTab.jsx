export default function ContentsTab({ platform }) {
  return (
    <div className="flex items-center border-b border-gray-300 justify-between">
      <h2 className="lg:text-2xl text-md font-bold">
        {platform.charAt(0).toUpperCase() + platform.slice(1)} Games
      </h2>

      {/* 탭 */}
      <div className="flex items-center gap-3  text-xs text-gray-700">
        <button className="text-red-500 font-semibold border-b-2 border-red-500 pb-1">
          Daily
        </button>
        <button className="hover:text-red-400">Weekly</button>
        <button className="hover:text-red-400">Monthly</button>
      </div>
      {/* 필터 탭 (정렬용) */}
      <div className="flex gap-4 text-xs">
        <button className="text-blue-600 font-medium underline underline-offset-4">
          Likes
        </button>
        <button className="hover:underline hover:text-blue-500">Views</button>
      </div>
    </div>
  );
}
