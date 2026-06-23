import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/pets?search=${search}&species=${species}`)
      .then(res => {
        setPets(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, species]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">All Pets</h2>
        <p className="text-gray-500 mt-1">Browse pets currently looking for a loving home.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-10 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
        </div>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full md:w-56 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition cursor-pointer"
        >
          <option value="all">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : pets.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-3">🐾</p>
          <p className="text-gray-400 font-medium">No pets found! Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map(pet => (
            <div
              key={pet._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${pet.status === 'adopted' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {pet.status === 'adopted' ? 'Adopted' : 'Available'}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{pet.species} • {pet.breed}</p>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                  <span>📍</span> {pet.location}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-orange-500 font-bold">${pet.adoptionFee}</p>
                  <p className="text-xs text-gray-400">Adoption Fee</p>
                </div>

                <Link
                  to={`/pet/${pet._id}`}
                  className="mt-4 block text-center bg-orange-500 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-sm shadow-orange-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPets;