import HomeMain from '../components/home/HomeMain';
import MainSideBanner from '../components/home/MainSideBanner';

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      <HomeMain />
      <MainSideBanner />
    </div>
  );
}
