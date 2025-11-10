// App.tsx

import { useEffect } from "react";
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
import DashboardHome from "./pages/Dashboard/Dashboard/Home";
import Bangkok from "./pages/Future/Bangkok";
import RequireAuth from "./routes/RequireAuth";


function App() {

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bangkok" element={<Bangkok />} />

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<AppLayout />}>
            {/*/dashboard */}
            <Route index element={<DashboardHome />} />

            <Route path="profile" element={<UserProfiles />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} />

            {/* Forms */}
            <Route path="form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="basic-tables" element={<BasicTables />} />

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
