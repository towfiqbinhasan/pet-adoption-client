import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4 text-gray-600">Page not found!</p>
      <Link to="/" className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg">
        Back to Home
      </Link>
    </div>
  );
};
export default NotFound;