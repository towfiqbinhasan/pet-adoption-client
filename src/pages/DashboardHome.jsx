import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsRes, reqRes] = await Promise.all([
          axiosSecure.get(`/pets/owner/${user?.email}`),
          axiosSecure.get(`/adoption-requests/user/${user?.email}`),
        ]);
        setPets(petsRes.data);
        setRequests(reqRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchData();
  }, [user]);

  const total = pets.length;
  const available = pets.filter((p) => p.status === "available").length;
  const adopted = pets.filter((p) => p.status === "adopted").length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.displayName?.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's your pet adoption overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-orange-400">
          <p className="text-3xl font-bold text-orange-500">{total}</p>
          <p className="text-gray-500 text-sm mt-1">Total Listings</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-400">
          <p className="text-3xl font-bold text-green-500">{available}</p>
          <p className="text-gray-500 text-sm mt-1">Available Pets</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-blue-400">
          <p className="text-3xl font-bold text-blue-500">{adopted}</p>
          <p className="text-gray-500 text-sm mt-1">Adopted Pets</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-yellow-400">
          <p className="text-3xl font-bold text-yellow-500">{pending}</p>
          <p className="text-gray-500 text-sm mt-1">Pending Requests</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/dashboard/add-pet"
          className="bg-orange-500 text-white rounded-2xl p-6 hover:bg-orange-600 transition-all shadow-sm">
          <p className="text-3xl mb-2">➕</p>
          <p className="font-bold text-lg">Add New Pet</p>
          <p className="text-orange-100 text-sm mt-1">List a pet for adoption</p>
        </Link>
        <Link to="/dashboard/my-listings"
          className="bg-white rounded-2xl p-6 hover:shadow-md transition-all shadow-sm border border-gray-100">
          <p className="text-3xl mb-2">📋</p>
          <p className="font-bold text-lg text-gray-800">My Listings</p>
          <p className="text-gray-400 text-sm mt-1">{total} pets listed</p>
        </Link>
        <Link to="/dashboard/my-requests"
          className="bg-white rounded-2xl p-6 hover:shadow-md transition-all shadow-sm border border-gray-100">
          <p className="text-3xl mb-2">📩</p>
          <p className="font-bold text-lg text-gray-800">My Requests</p>
          <p className="text-gray-400 text-sm mt-1">{approved} approved • {pending} pending</p>
        </Link>
      </div>

      {/* Recent Pets */}
      {pets.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Listings</h2>
            <Link to="/dashboard/my-listings" className="text-orange-500 text-sm hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pets.slice(0, 3).map((pet) => (
              <div key={pet._id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-all">
                <img src={pet.image} alt={pet.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="font-semibold text-gray-800">{pet.name}</p>
                  <p className="text-gray-400 text-xs">{pet.species} • {pet.location}</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 font-medium
                    ${pet.status === "adopted" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {pet.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;