import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/background.png')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlock Your Academic Journey</h1>
        <p className="text-lg md:text-2xl mb-6">Discover scholarships, internships, and universities tailored just for you.</p>
        <button
          onClick={handleGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;
