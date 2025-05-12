import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            User Manager
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/add-user" className="hover:underline">
              Add User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
