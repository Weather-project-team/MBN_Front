import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

export default function RootLayout() {
  return (
    <div className="overflow-x-hidden">
      <Header />

      <main>
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-300 mt-12 py-4 text-center text-sm text-gray-500">
        ⓒ 2025 YourSite All rights reserved.
      </footer>
    </div>
  );
}
