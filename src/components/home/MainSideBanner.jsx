import SideBanner from '../../assets/sidebanner.jpg';
import SideBanner2 from '../../assets/sidebanner2.jpg';

export default function MainSideBanner() {
  return (
    <aside className="hidden lg:block lg:col-span-1 border-l border-gray-300 pl-6 text-sm">
      <img className="rounded" src={SideBanner} alt="" />
      <img className="mt-3 rounded" src={SideBanner2} alt="" />
    </aside>
  );
}
