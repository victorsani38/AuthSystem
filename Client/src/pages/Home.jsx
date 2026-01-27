
import HeroImage from "../assets/hero.svg"; // make sure path is correct
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
   

      {/* Hero Section */}
      <section
        className="flex flex-col-reverse md:flex-row items-start justify-between max-w-7xl mx-auto px-6 py-10 md:py-20 gap-8 flex-1"
        style={{ minHeight: 'calc(100vh - 128px)' }} // adjust for header + footer height
      >
        {/* Left Text */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome to AUTH:V
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Secure your account, manage your data, and access all your tools seamlessly.
          </p>
          <p className="text-gray-700 text-base md:text-lg">
            Sign up today to experience the future of authentication.
          </p>
          <p className="text-gray-700 text-base md:text-lg">
            Simple, fast, and reliable — just for you.
          </p>

          {/* Buttons Side by Side */}
          <div className="flex gap-4 mt-4 flex-wrap">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-base font-medium transition">
             <Link to="/login">
             Login
             </Link>
            </button>
            <button className="border border-gray-500 text-gray-700 px-6 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition">
              <Link to="/register">
               Register
             </Link>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center items-start">
          {HeroImage ? (
            <img
              src={HeroImage}
              alt="Hero Illustration"
              className="w-64 md:w-60 h-auto object-contain" // smaller width
            />
          ) : (
            <p className="text-gray-400">SVG not found</p>
          )}
        </div>
      </section>

    
    </div>
  );
};

export default Home;
