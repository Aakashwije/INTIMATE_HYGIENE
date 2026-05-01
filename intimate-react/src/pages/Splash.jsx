import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  // Redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#28a745] to-[#5cd65c] text-white text-center overflow-hidden animate-fadeInScreen">
      <div className="max-w-xl animate-slideUp">
        {/* Logo */}
        <img
          src="/shortlogo.png"
          alt="Logo"
          className="w-28 h-auto mx-auto mb-5 animate-bounceLogo"
        />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-10 tracking-wide drop-shadow-lg">
          Welcome to Intimate Hygiene Enterprises
        </h1>

        {/* Loader dots */}
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`w-3 h-3 bg-white rounded-full inline-block animate-loaderBounce loader-dot-${n}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
