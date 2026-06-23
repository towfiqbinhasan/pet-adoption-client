import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

const AddPet = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const pet = {
      name: form.name.value,
      species: form.species.value,
      breed: form.breed.value,
      age: form.age.value,
      gender: form.gender.value,
      image: form.image.value,
      healthStatus: form.healthStatus.value,
      vaccinationStatus: form.vaccinationStatus.value,
      location: form.location.value,
      adoptionFee: form.adoptionFee.value,
      description: form.description.value,
      ownerEmail: user.email,
    };
    try {
      await axiosSecure.post("/pets", pet);
      toast.success("Pet added successfully!");
      navigate("/dashboard/my-listings");
    } catch {
      toast.error("Failed to add pet.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Pet Name", name: "name", type: "text", placeholder: "e.g. Buddy" },
    { label: "Breed", name: "breed", type: "text", placeholder: "e.g. Golden Retriever" },
    { label: "Age (years)", name: "age", type: "number", placeholder: "2" },
    { label: "Image URL", name: "image", type: "url", placeholder: "https://imgbb.com/..." },
    { label: "Health Status", name: "healthStatus", type: "text", placeholder: "e.g. Healthy" },
    { label: "Vaccination Status", name: "vaccinationStatus", type: "text", placeholder: "e.g. Up to date" },
    { label: "Location", name: "location", type: "text", placeholder: "e.g. Dhaka, Bangladesh" },
    { label: "Adoption Fee ($)", name: "adoptionFee", type: "number", placeholder: "50" },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">➕ Add a New Pet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(f => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            <input name={f.name} type={f.type} required placeholder={f.placeholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
          <select name="species" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
            {SPECIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select name="gender" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" rows="4" required placeholder="Tell us about this pet..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
          <input value={user?.email || ""} readOnly className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition disabled:opacity-50">
          {loading ? "Adding..." : "Add Pet 🐾"}
        </button>
      </form>
    </div>
  );
};

export default AddPet;