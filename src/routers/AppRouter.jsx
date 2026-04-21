import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ActivitiesPage from "../pages/ActivitiesPage";
import ActivityDetailPage from "../pages/ActivityDetailPage";
import FilterPage from "../pages/FilterPage";
import Stats from "../pages/Stats";
import Achievements from "../pages/Achievements";
import NavBar from "../components/NavBar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityDetailPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;