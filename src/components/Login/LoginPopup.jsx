export default function LoginPopup({ onClose }) {
  const handleKakaoLogin = async () => {
    const res = await fetch('http://116.34.191.73:3334/oauth/kakao');
    const loginUrl = await res.text();
    window.location.href = loginUrl;
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-96 h-96 rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleKakaoLogin}
            className="bg-yellow-400 text-white px-4 py-2 rounded"
          >
            Kakao Login
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            네이버로 로그인
          </button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded">
            애플로 로그인
          </button>
        </div>
        <button className="mt-4 text-red-500" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
