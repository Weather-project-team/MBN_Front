export default function SideMenu() {
  return (
    <aside className="hidden lg:block lg:col-span-1 border-l border-gray-300 pl-6 text-sm">
      <h3 className="font-semibold mb-2">Notice</h3>
      <ul>
        <li>공지사항입니다.</li>
      </ul>
      <h3 className="font-semibold mb-2 mt-2">Event</h3>
      <ul>
        <li>이벤트입니다.</li>
      </ul>
    </aside>
  );
}
