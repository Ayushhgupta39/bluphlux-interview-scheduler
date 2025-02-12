import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScheduleInterview from "./pages/ScheduleInterview";

const App = () => {
  return (

      <Router>
        <div className="p-4">
          <nav className="mb-4">
            <a href="/" className="mr-4 text-blue-600">Dashboard</a>
            <a href="/schedule" className="text-blue-600">Schedule Interview</a>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<ScheduleInterview />} />
          </Routes>
        </div>
      </Router>

  );
};

export default App;
