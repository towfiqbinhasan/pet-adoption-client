import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
   axios.get(`${import.meta.env.VITE_API_URL}/pets/${id}`)
      .then(res => { setPet(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdopt = (e) => {
    e.preventDefault();
    if (user?.email === pet?.ownerEmail) {
      return toast.error("You cannot adopt your own pet!");
    }
    const requestData = {
      petId: id,
      petName: pet.name,
      petImage: pet.image,
      requesterName: user.displayName,
      requesterEmail: user.email,
      pickupDate: e.target.pickupDate.value,
      message: e.target.message.value,
    };
   axios.post(`${import.meta.env.VITE_API_URL}/adoption-requests`, requestData, { withCredentials: true })
      .then(res => {
        if (res.data.insertedId) {
          toast.success("Adoption request submitted!");
          setShowForm(false);
          navigate("/dashboard/my-requests");
        }
      })
      .catch(() => toast.error("Failed to submit request!"));
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!pet) return <p className="text-center py-20">Pet not found!</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Toaster />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group mb-5 inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 group-hover:border-orange-300 group-hover:bg-orange-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </span>
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid md:grid-cols-2">
          {/* Full pet image, no cropping */}
          <div className="relative bg-gray-100 flex items-center justify-center min-h-[280px] md:min-h-[420px]">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full max-h-[420px] md:max-h-none object-contain p-3"
            />
            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${pet.status === 'adopted' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {pet.status === 'adopted' ? 'Adopted' : 'Available'}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{pet.name}</h2>
              <p className="text-gray-500 mt-1">{pet.species} • {pet.breed} • {pet.age}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-orange-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Gender</p>
                <p className="font-semibold text-gray-800">{pet.gender}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Health</p>
                <p className="font-semibold text-gray-800">{pet.healthStatus}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Vaccination</p>
                <p className="font-semibold text-gray-800">{pet.vaccinationStatus}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">{pet.location}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl col-span-2">
                <p className="text-xs text-gray-500">Adoption Fee</p>
                <p className="font-semibold text-orange-500 text-lg">${pet.adoptionFee}</p>
              </div>
            </div>

            <p className="text-gray-600 mt-6 leading-relaxed">{pet.description}</p>

            <div className="mt-auto pt-6">
              {pet.status !== 'adopted' && user?.email !== pet?.ownerEmail && (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-md shadow-orange-200"
                >
                  {showForm ? 'Cancel' : 'Adopt Me 🐾'}
                </button>
              )}

              {pet.status === 'adopted' && (
                <p className="text-red-500 font-semibold">This pet has already been adopted.</p>
              )}

              {user?.email === pet?.ownerEmail && (
                <p className="text-gray-500">You cannot adopt your own pet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Adoption Form */}
        {showForm && (
          <form onSubmit={handleAdopt} className="border-t border-gray-100 bg-orange-50/60 p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🐾</span> Adoption Request
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Pet Name</label>
                <input type="text" value={pet.name} readOnly className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-100 text-gray-600" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Your Name</label>
                <input type="text" value={user?.displayName || ""} readOnly className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-100 text-gray-600" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Your Email</label>
                <input type="email" value={user?.email || ""} readOnly className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-100 text-gray-600" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Pickup Date</label>
                <input type="date" name="pickupDate" required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Message</label>
              <textarea name="message" rows="3" placeholder="Why do you want to adopt this pet?" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"></textarea>
            </div>
            <button type="submit" className="w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-md shadow-orange-200">
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PetDetails;