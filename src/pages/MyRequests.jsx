import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get(`/adoption-requests/user/${user?.email}`);
      setRequests(res.data);
    } catch {
      toast.error("Failed to load requests!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Cancel Request?",
      text: "This adoption request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/adoption-requests/${id}`);
          toast.success("Request cancelled!");
          fetchRequests();
        } catch {
          toast.error("Failed to cancel!");
        }
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No adoption requests yet!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow">
            <thead>
              <tr className="bg-orange-50 text-gray-700 text-sm">
                <th className="px-4 py-3 text-left">Pet Name</th>
                <th className="px-4 py-3 text-left">Request Date</th>
                <th className="px-4 py-3 text-left">Pickup Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t border-gray-100 text-sm">
                  <td className="px-4 py-3 font-medium text-gray-800">{req.petName}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{req.pickupDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${req.status === "approved" ? "bg-green-100 text-green-600" :
                        req.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-600"}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link to={`/pet/${req.petId}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600">
                      View
                    </Link>
                    <button onClick={() => handleCancel(req._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequests;