import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/authAction";
import type { AppDispatch } from "./redux/store";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignIn from "./pages/Dashboard/AuthPages/SignIn";
import SignUp from "./pages/Dashboard/AuthPages/SignUp";
import NotFound from "./pages/Dashboard/OtherPage/NotFound";
import UserProfiles from "./pages/Dashboard/UserProfiles";
import Videos from "./pages/Dashboard/UiElements/Videos";
import Images from "./pages/Dashboard/UiElements/Images";
import Alerts from "./pages/Dashboard/UiElements/Alerts";
import Badges from "./pages/Dashboard/UiElements/Badges";
import Avatars from "./pages/Dashboard/UiElements/Avatars";
import Buttons from "./pages/Dashboard/UiElements/Buttons";
import LineChart from "./pages/Dashboard/Charts/LineChart";
import BarChart from "./pages/Dashboard/Charts/BarChart";
import Calendar from "./pages/Dashboard/Calendar";
import BasicTables from "./pages/Dashboard/Tables/BasicTables";
import FormElements from "./pages/Dashboard/Forms/FormElements";
import Blank from "./pages/Dashboard/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/dashboard/common/ScrollToTop";
import RequireAuth from "./routes/RequireAuth";
import PropertyDetailsPage from "./pages/Future/PropertyDetailsPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import Chatbot from "./components/Chatbot";
import SubscribePopup from "./components/SubscribePopup";
import PostProperty from "./components/dashboard/RealEstate/PostProperty";
import DashboardHome from "./pages/Dashboard/Dashboard/Home";
import LookingForPropertiesDashboard from "./pages/Dashboard/homeListing/LookingForPropertiesDashboard";
import PropertyCarouselDashboard from "./pages/Dashboard/homeListing/PropertyCarouselDashboard";
import RentToOwnDashboard from "./pages/Dashboard/homeListing/RentToOwnDashboard";
import HeroSearchDashboard from "./pages/Dashboard/homeListing/HeroSearchDashboard";
import SplitCardDashboard from "./pages/Dashboard/homeListing/SplitCardDashboard";
import FeaturedProjectsDashboard from "./pages/Dashboard/homeListing/FeaturedProjectsDashboard";
import NewHomesDashboard from "./pages/Dashboard/homeListing/NewHomesDashboard";
import MostPopularDashboard from "./pages/Dashboard/homeListing/MostPopularDashboard";
import MustSellPropertyDashboard from "./pages/Dashboard/homeListing/MustSellPropertyDashboard";
import TrendingYoutubeDashboard from "./pages/Dashboard/homeListing/TrendingYoutubeDashboard";
import NewsPropertyDashboard from "./pages/Dashboard/homeListing/NewsPropertyDashboard";
import ThailandSecretsDashboard from "./pages/Dashboard/homeListing/ThailandSecretsDashboard";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/BlogDetails";
import CityProperty from "./pages/home/CityProperty";
import BlogDashboard from "./components/dashboard/BlogDash/BlogDashboard";
import CustomerManagement from "./components/dashboard/Management/CustomerManagement";
import LoginPopupDashboard from "./pages/Dashboard/homeListing/PopupDashboard";
import SubscribePopupDashboard from "./components/dashboard/homeListing/SubscribePopupCrud";
import Projects from "./components/dashboard/RealEstate/Projects";
import Features from "./components/dashboard/RealEstate/Features"
import Investores from "./components/dashboard/RealEstate/Investors";
import BlogCategories from "./components/dashboard/BlogDash/BlogCategories";
import Categories from "./components/dashboard/RealEstate/Categories";
import Reviews from "./components/dashboard/RealEstate/Reviews"
import Subscription from "./pages/Dashboard/subscription/Subscription"
import BlogTag from "./components/dashboard/BlogDash/BlogTag";
import AmenitiesProperty from "./pages/Properties/AmenitiesProperty";
import PostPropertyPage from "./pages/Dashboard/RealEstate/PostProperty";
import AmenitiesHome from "./components/home/AmenitiesHome";


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [showPopup] = useState(true);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      {showPopup && (
        <SubscribePopup
          // handleClose={() => setShowPopup(false)} // <-- Pass handleClose here
        />
      )}
      <Chatbot />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/projects" element={<AmenitiesProperty/>}/>
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/amenities" element={<AmenitiesHome />} />
        <Route path="/city/:cityName" element={<CityProperty/>} />
        <Route path="/propertydeatilspage" element={<PropertyDetailsPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<AppLayout />}>
            {/*/dashboard */}
            <Route index element={<DashboardHome/>} />

            <Route path="profile" element={<UserProfiles />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} />

            {/* Forms */}
            <Route path="form-elements" element={<FormElements />} />
            <Route
              path="LookingForProperties"
              element={<LookingForPropertiesDashboard />}
            />
            <Route
              path="PropertyCarousel"
              element={<PropertyCarouselDashboard />}
            />
            <Route path="RentToOwn" element={<RentToOwnDashboard />} />
            <Route path="/dashboard/login-popup"element={<LoginPopupDashboard />}/>
            <Route path="/dashboard/subscribe-popup"element={<SubscribePopupDashboard />}/>
            <Route path="HeroSearchCrud" element={<HeroSearchDashboard />} />
            <Route path="SplitCardCrud" element={<SplitCardDashboard />} />
            <Route
              path="FeaturedProjects"
              element={<FeaturedProjectsDashboard />}
            />
            <Route path="NewHomes" element={<NewHomesDashboard />} />
            <Route path="MostPopular" element={<MostPopularDashboard />} />
            <Route path="MustSellProperty" element={<MustSellPropertyDashboard />} />
            <Route path="TrendingYoutube" element={<TrendingYoutubeDashboard />} />
            <Route path="NewsProperty" element={<NewsPropertyDashboard />} />
            <Route path="ThailandSecrets" element={<ThailandSecretsDashboard />} />

            {/* {Real EState} */}
            <Route path="/dashboard/Projects" element={<Projects/>}/>
            <Route path="/dashboard/amenities" element={<Features/>}/>
            <Route path="/dashboard/Investors" element={<Investores/>}/>
            <Route path="/dashboard/propertyCategories" element={<Categories/>} />
            <Route path="/dashboard/reviews" element={<Reviews/>} />

            {/* {Subscription} */}
            <Route path="/dashboard/subscription" element={<Subscription/>} />

            {/* Tables */}
            <Route path="basic-tables" element={<BasicTables />} />
            <Route path="CustomerManagement" element={<CustomerManagement />} />
            <Route path="PropertyTable" element={<PostPropertyPage />} />
            <Route path="Blog" element={<BlogDashboard/>} />
            <Route path="tags" element={<BlogTag/>} />
            <Route path="Categories" element={<BlogCategories/>} />

            {/* UI Elements */}
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />

            {/* Charts */}
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />

            {/* Optional: 404 for unknown /dashboard/* */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Public auth pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Global 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
