import MainBanner from './MainBanner';
import MainRecentPosts from './MainRecentPosts';

export default function HomeMain() {
  return (
    <main className="lg:col-span-3">
      <MainBanner />

      <MainRecentPosts />
    </main>
  );
}
