import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { User } from "../context/UserContext";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error("User not found");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading user details...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error || "User not found"}</p>
        <Link
          to="/"
          className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Back to User List
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-500 hover:underline flex items-center"
        >
          &larr; Back to User List
        </Link>
      </div>

      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        {user.age && <p className="text-gray-700">Age: {user.age}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Email:</span> {user.email}
            </li>
            <li>
              <span className="font-medium">Phone:</span> {user.phone}
            </li>
            <li>
              <span className="font-medium">Website:</span> {user.website}
            </li>
          </ul>
        </div>

        {user.address && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Address</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Street:</span>{" "}
                {user.address.street}
              </li>
              <li>
                <span className="font-medium">Suite:</span> {user.address.suite}
              </li>
              <li>
                <span className="font-medium">City:</span> {user.address.city}
              </li>
              <li>
                <span className="font-medium">Zipcode:</span>{" "}
                {user.address.zipcode}
              </li>
            </ul>
          </div>
        )}

        {user.company && (
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-3">Company</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Name:</span> {user.company.name}
              </li>
              <li>
                <span className="font-medium">Catchphrase:</span>{" "}
                {user.company.catchPhrase}
              </li>
              <li>
                <span className="font-medium">BS:</span> {user.company.bs}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
