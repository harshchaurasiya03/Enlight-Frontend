import Navbar from '../../components/Navbar';
import HeroSearch from '../../components/home/HeroSearch';
import FeaturedProjects from '../../components/home/FeaturedProjects';
import Footer from '../../components/Footer';
import PropertyCarousel from '../../components/home/PropertyCarousel';
import TrendingYoutube from '../../components/home/TrendingYoutube';
import GoogleReview from '../../components/home/GoogleReview';
import SplitCard from '../../components/home/SplitCard';
import RentToOwn from '../../components/home/RentToOwn';
import FutureProjects from '../../components/home/FutureProjects';
import NewHomes from '../../components/home/NewHomes';
import MostPopular from '../../components/home/MostPopular';
import MustSellProperty from '../../components/home/MustSellProperty'
import NewsProperty from '../../components/home/NewsProperty';
import ThailandSecrets from '../../components/home/ThailandSecrets';
import Topheader from '../../components/Topheader'


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Topheader/>
      <Navbar />
      <HeroSearch />
      <FeaturedProjects />
      {/* <PropertyCarousel /> */}
      <SplitCard/>
      <RentToOwn/>
      <FutureProjects/>
      <NewHomes/>
      <MostPopular/>
      <GoogleReview/>
      <MustSellProperty/>
      <TrendingYoutube/>
<NewsProperty/>
<ThailandSecrets/>
      <Footer />
    </div>
  );
};

export default HomePage;
