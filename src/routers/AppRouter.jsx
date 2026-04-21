import { BrowserRouter, Routes, Route } from "react-router-dom";
import Activities from "../pages/Activities";
import Stats from "../pages/Stats";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;