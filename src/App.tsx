import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScheduleInterview from "./pages/ScheduleInterview";
import Navbar from "./components/app/Navbar";

const App = () => {
  return (
    <Router>
      <div className="p-4 px-0 font-rethink">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schedule" element={<ScheduleInterview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
