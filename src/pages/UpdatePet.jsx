import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpdatePet = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/pets/${id}`)
      .then(res => setPet(res.data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedPet = {
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
    };

    axios.patch(`${import.meta.env.VITE_API_URL}/pets/${id}`, updatedPet, { withCredentials: true })
      .then(() => {
        toast.success("Pet updated successfully!");
        navigate("/dashboard/my-listings");
      })
      .catch(() => toast.error("Failed to update pet!"));
  };

  if (!pet) return (
    <div className="flex justify-center py-20">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Toaster />
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Update Pet</h2>
      <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Pet Name</label>
            <input type="text" name="name" defaultValue={pet.name} required className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Species</label>
            <select name="species" defaultValue={pet.species} className="w-full border rounded-lg px-4 py-2">
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Breed</label>
            <input type="text" name="breed" defaultValue={pet.breed} required className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Age</label>
            <input type="text" name="age" defaultValue={pet.age} required className="w-full border rounded-lg px-4 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <select name="gender" defaultValue={pet.gender} className="w-full border rounded-lg px-4 py-2">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image URL</label>
            <input type="text" name="image" defaultValue={pet.image} required className="w-full border rounded-lg px-4 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Health Status</label>
            <input type="text" name="healthStatus" defaultValue={pet.healthStatus} required className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Vaccination Status</label>
            <select name="vaccinationStatus" defaultValue={pet.vaccinationStatus} className="w-full border rounded-lg px-4 py-2">
              <option value="Vaccinated">Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input type="text" name="location" defaultValue={pet.location} required className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Adoption Fee ($)</label>
            <input type="number" name="adoptionFee" defaultValue={pet.adoptionFee} required className="w-full border rounded-lg px-4 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea name="description" defaultValue={pet.description} rows="4" className="w-full border rounded-lg px-4 py-2"></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Owner Email</label>
          <input type="email" value={user?.email || ""} readOnly className="w-full border rounded-lg px-4 py-2 bg-gray-50" />
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">
          Update Pet
        </button>
      </form>
    </div>
  );
};

export default UpdatePet;