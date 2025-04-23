export default function LoginPopup({ onClose }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleKakaoLogin = async () => {
    const res = await fetch(`${baseUrl}/oauth/kakao`);
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
            className="bg-yellow-400 cursor-pointer text-white px-4 py-2 rounded"
          >
            Kakao Login
          </button>
        </div>
        <button className="mt-4 text-red-500" onClick={onClose}>
          close
        </button>
      </div>
    </div>
  );
}
