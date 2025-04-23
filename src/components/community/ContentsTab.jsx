export default function ContentsTab({
  category,
  period,
  setPeriod,
  sort,
  setSort,
}) {
  const isGameCategory =
    category !== 'notice' && category !== 'event' && category !== 'search';

  return (
    <div className="flex items-center border-b border-gray-300 justify-between">
      <h2 className="lg:text-2xl text-md font-bold">
        {category.charAt(0).toUpperCase() + category.slice(1)}
        {isGameCategory ? ' Games' : ''}
      </h2>

      {isGameCategory ? (
        <>
          {/* 기간 필터 */}
          <div className="flex items-center gap-3 text-xs text-gray-700">
            {['daily', 'weekly', 'monthly'].map((type) => (
              <button
                key={type}
                onClick={() => setPeriod(type)}
                className={`pb-1 ${
                  period === type
                    ? 'text-red-500 font-semibold border-b-2 border-red-500'
                    : 'hover:text-red-400'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* 정렬 필터 */}
          <div className="flex gap-4 text-xs">
            <button
              onClick={() => setSort('createdAt,desc')}
              className={`${
                sort === 'createdAt,desc'
                  ? 'text-blue-600 font-medium underline underline-offset-4'
                  : 'hover:underline hover:text-blue-500'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setSort('likeCount,desc')}
              className={`${
                sort === 'likeCount,desc'
                  ? 'text-blue-600 font-medium underline underline-offset-4'
                  : 'hover:underline hover:text-blue-500'
              }`}
            >
              Likes
            </button>
            <button
              onClick={() => setSort('viewCount,desc')}
              className={`${
                sort === 'viewCount,desc'
                  ? 'text-blue-600 font-medium underline underline-offset-4'
                  : 'hover:underline hover:text-blue-500'
              }`}
            >
              Views
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
