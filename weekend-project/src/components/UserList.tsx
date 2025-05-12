import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext, User } from "../context/UserContext";

const UserList = () => {
  const { state, fetchUsers } = useUserContext();
  const { users, loading, error } = state;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
        <button
          onClick={() => fetchUsers()}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User List</h1>

      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {users.length > 0
            ? "No users match your search."
            : "No users found. Add some users!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              {user.age && (
                <p className="text-gray-600 mb-4">Age: {user.age}</p>
              )}
              <Link
                to={`/users/${user.id}`}
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
