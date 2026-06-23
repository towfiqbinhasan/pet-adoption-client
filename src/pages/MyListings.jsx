import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPets();
  }, [user]);

  const fetchPets = async () => {
    try {
      const res = await axiosSecure.get(`/pets/owner/${user?.email}`);
      setPets(res.data);
    } catch {
      toast.error("Failed to load listings!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This pet will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/pets/${id}`);
          toast.success("Pet deleted!");
          fetchPets();
        } catch {
          toast.error("Failed to delete!");
        }
      }
    });
  };

  const handleViewRequests = async (pet) => {
    setSelectedPet(pet);
    try {
      const res = await axiosSecure.get(`/adoption-requests/pet/${pet._id}`);
      setRequests(res.data);
      setShowModal(true);
    } catch {
      toast.error("Failed to load requests!");
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await axiosSecure.patch(`/adoption-requests/${requestId}/approve`, {
        petId: selectedPet._id,
      });
      toast.success("Request approved!");
      const res = await axiosSecure.get(`/adoption-requests/pet/${selectedPet._id}`);
      setRequests(res.data);
      fetchPets();
    } catch {
      toast.error("Failed to approve!");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axiosSecure.patch(`/adoption-requests/${requestId}/reject`);
      toast.success("Request rejected!");
      const res = await axiosSecure.get(`/adoption-requests/pet/${selectedPet._id}`);
      setRequests(res.data);
    } catch {
      toast.error("Failed to reject!");
    }
  };

  const total = pets.length;
  const available = pets.filter((p) => p.status === "available").length;
  const adopted = pets.filter((p) => p.status === "adopted").length;

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Listings</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-orange-500">{total}</p>
          <p className="text-gray-600 text-sm mt-1">Total Listings</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-500">{available}</p>
          <p className="text-gray-600 text-sm mt-1">Available</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-500">{adopted}</p>
          <p className="text-gray-600 text-sm mt-1">Adopted</p>
        </div>
      </div>

      {pets.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No pets added yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white rounded-xl shadow overflow-hidden">
              <img src={pet.image} alt={pet.name} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                <p className="text-orange-500 font-semibold">${pet.adoptionFee} Adoption Fee</p>
                {pet.status === "adopted" && (
                  <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mt-1">
                    Adopted
                  </span>
                )}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => handleViewRequests(pet)}
                    className="bg-purple-500 text-white py-1.5 rounded-lg text-sm hover:bg-purple-600">
                    Requests
                  </button>
                  <Link
                    to={`/dashboard/update-pet/${pet._id}`}
                    className="bg-blue-500 text-white py-1.5 rounded-lg text-sm hover:bg-blue-600 text-center">
                    Edit
                  </Link>
                  <Link
                    to={`/pet/${pet._id}`}
                    className="bg-green-500 text-white py-1.5 rounded-lg text-sm hover:bg-green-600 text-center">
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="bg-red-500 text-white py-1.5 rounded-lg text-sm hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requests Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Requests for {selectedPet?.name}
              </h3>
              <button onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
            </div>

            {requests.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No requests yet!</p>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req._id} className="border border-gray-200 rounded-xl p-4">
                    <p className="font-semibold text-gray-800">{req.requesterName}</p>
                    <p className="text-gray-500 text-sm">{req.requesterEmail}</p>
                    <p className="text-gray-500 text-sm">Pickup: {req.pickupDate}</p>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 font-medium
                      ${req.status === "approved" ? "bg-green-100 text-green-600" :
                        req.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-600"}`}>
                      {req.status}
                    </span>
                    {req.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleApprove(req._id)}
                          className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-600">
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;