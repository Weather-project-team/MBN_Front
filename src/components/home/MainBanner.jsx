import BannerImage from '../../assets/banner.jpg';

export default function MainBanner() {
  return (
    <div className="flex items-center border-b border-gray-300 justify-between">
      <img src={BannerImage} alt="" />
    </div>
  );
}
