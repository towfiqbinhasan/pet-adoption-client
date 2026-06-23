import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/pets`)
      .then(res => setPets(res.data.slice(0, 6)))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="font-sans">

      {/* ===== BANNER / HERO SECTION ===== */}
      {/* 
        🔴 CHANGED PART: Hero section
        - Added a real pet adoption background image from Unsplash (free, no attribution needed)
        - Added a dark overlay so text remains readable (same orange-tinted gradient as before)
        - All text, button, and link are EXACTLY the same as original
        - Image URL: https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600
          (a warm golden-hour dog photo — perfect for adoption vibes)
      */}
      <div
        className="relative text-white py-36 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Orange gradient overlay — same brand color as original */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(251,146,60,0.82) 0%, rgba(234,88,12,0.88) 100%)",
          }}
        />
        {/* Content — identical to original */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Find Your Perfect Pet</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow">
            Give a loving home to a pet in need. Browse hundreds of adorable animals waiting for adoption.
          </p>
          <Link
            to="/all-pets"
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-lg hover:bg-orange-50 transition shadow-lg"
          >
            Adopt Now 🐾
          </Link>
        </div>
      </div>

      {/* ===== FEATURED PETS SECTION ===== */}
      {/* 🟢 UNCHANGED LOGIC — only minor visual polish: smoother card hover, subtle border */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Featured Pets</h2>
        <p className="text-center text-gray-500 mb-10">Meet some of our adorable pets looking for a home</p>

        {pets.length === 0 ? (
          <p className="text-center text-gray-400">No pets available yet. Add some pets first!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map(pet => (
              <div key={pet._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-orange-50">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                  <p className="text-gray-500 text-sm mt-0.5">{pet.species} • {pet.breed}</p>
                  <p className="text-orange-500 font-semibold mt-2">${pet.adoptionFee} Adoption Fee</p>
                  <Link
                    to={`/pet/${pet._id}`}
                    className="mt-4 block text-center bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== WHY ADOPT ===== */}
      {/* 🟢 UNCHANGED — only rounded cards upgraded to rounded-2xl for consistency */}
      <div className="bg-orange-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Adopt a Pet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-2">Save a Life</h3>
              <p className="text-gray-500">Every adoption gives a pet a second chance at a happy life in a loving home.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Reduce Overpopulation</h3>
              <p className="text-gray-500">Adopting helps reduce the number of homeless animals in shelters.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4">😊</div>
              <h3 className="text-xl font-bold mb-2">Gain a Best Friend</h3>
              <p className="text-gray-500">Pets bring joy, reduce stress, and become lifelong companions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SUCCESS STORIES ===== */}
      {/* 🟢 UNCHANGED */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-orange-400">
              <p className="text-gray-600 italic">"We adopted Max 2 years ago and he has completely changed our lives. Best decision ever!"</p>
              <p className="text-orange-500 font-bold mt-4">— Sarah & Family, Dhaka</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-orange-400">
              <p className="text-gray-600 italic">"Luna was shy at first but now she's the queen of our home. We couldn't imagine life without her."</p>
              <p className="text-orange-500 font-bold mt-4">— Rahim, Chittagong</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PET CARE TIPS ===== */}
      {/* 🟢 UNCHANGED */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Pet Care Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">🍖</div>
              <h3 className="font-bold text-gray-800 mb-1">Proper Nutrition</h3>
              <p className="text-gray-500 text-sm">Feed your pet a balanced diet suitable for their age and breed.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">🏃</div>
              <h3 className="font-bold text-gray-800 mb-1">Regular Exercise</h3>
              <p className="text-gray-500 text-sm">Keep your pet active with daily walks and playtime.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">🩺</div>
              <h3 className="font-bold text-gray-800 mb-1">Vet Checkups</h3>
              <p className="text-gray-500 text-sm">Schedule regular vet visits to keep your pet healthy.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-4xl mb-3">🛁</div>
              <h3 className="font-bold text-gray-800 mb-1">Grooming</h3>
              <p className="text-gray-500 text-sm">Regular grooming keeps your pet clean and comfortable.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      {/* 🟢 UNCHANGED */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">1</div>
              <h3 className="text-xl font-bold mb-2">Browse Pets</h3>
              <p className="text-gray-500">Explore our wide selection of pets available for adoption.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">2</div>
              <h3 className="text-xl font-bold mb-2">Submit Request</h3>
              <p className="text-gray-500">Fill out the adoption form for your chosen pet.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">3</div>
              <h3 className="text-xl font-bold mb-2">Welcome Home</h3>
              <p className="text-gray-500">Get approved and welcome your new furry family member!</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PARTNER SHELTERS ===== */}
      {/* 🟢 UNCHANGED */}
      <div className="bg-orange-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Partner Shelters</h2>
          <p className="text-gray-500 mb-10">We work with trusted shelters across Bangladesh to bring you healthy, vaccinated pets.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm font-bold text-gray-700 hover:shadow-md transition">🏠 Dhaka Animal Shelter</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm font-bold text-gray-700 hover:shadow-md transition">🐾 Pawsome Rescue</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm font-bold text-gray-700 hover:shadow-md transition">❤️ Happy Tails BD</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm font-bold text-gray-700 hover:shadow-md transition">🌟 Safe Haven Pets</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
