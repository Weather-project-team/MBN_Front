import HeaderRight from './HeaderRight';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm ">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
        {/* 왼쪽: 로고 + 검색 */}
        <HeaderLeft />

        {/* 가운데: 메뉴 */}
        <HeaderCenter />

        {/* 오른쪽: 버튼 + 알림 + 유저 */}
        <HeaderRight />
      </div>
    </header>
  );
}
