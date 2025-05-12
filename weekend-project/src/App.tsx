import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/add-user" element={<AddUser />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
