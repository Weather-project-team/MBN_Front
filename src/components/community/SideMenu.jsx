export default function SideMenu() {
  return (
    <aside className="hidden lg:block lg:col-span-1 border-l border-gray-300 pl-6 text-sm">
      <h3 className="font-semibold mb-2">LAUNCH ARCHIVE</h3>
      <ul className="space-y-1">
        <li className="font-bold text-red-500">2025</li>
        <ul className="ml-4 space-y-1 text-gray-700">
          <li className="bg-red-100 px-2 py-1 rounded">· 4월</li>
          <li>· 3월</li>
          <li>· 2월</li>
          <li>· 1월</li>
        </ul>
        <li className="mt-2">2024</li>
        <li>2023</li>
        <li>2022</li>
        <li>…</li>
      </ul>
    </aside>
  );
}
