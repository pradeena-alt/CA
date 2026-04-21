import { BrowserRouter, Routes, Route } from "react-router-dom";
import Activities from "./pages/Activities";
import Stats from "./pages/Stats";
import FilterPage from "./pages/FilterPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<ActivityDetailPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;