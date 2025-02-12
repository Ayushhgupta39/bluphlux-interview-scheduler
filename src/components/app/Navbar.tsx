import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav className="mb-4 p-4 border-b-2 border-gray-300 flex item-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Interview Dashboard</h1>
      <div>
        {pathname !== "/" && (
          <a href="/">
            <Button>Dashboard</Button>
          </a>
        )}
        {pathname !== "/schedule" && (
          <a href="/schedule">
            <Button className="bg-green-600 hover:bg-green-700">
              Schedule Interview
            </Button>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
