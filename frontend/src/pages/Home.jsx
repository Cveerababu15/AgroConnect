import { Link } from "react-router-dom";
import { FaLeaf, FaArrowRight, FaCheckCircle, FaTruck, FaUtensils, FaUserShield } from "react-icons/fa";
import AgroConnet from '../Images/AgroConnect.png'
export default function Home() {
  const features = [
    {
      icon: <FaLeaf className="text-green-500" />,
      title: "Fresh from Farm",
      desc: "Direct access to organic produce harvested daily."
    },
    {
      icon: <FaUtensils className="text-amber-500" />,
      title: "Restaurant Ready",
      desc: "Source high-quality ingredients at fair prices."
    },
    {
      icon: <FaTruck className="text-blue-500" />,
      title: "Fast Delivery",
      desc: "Reliable logistics connecting supply to demand."
    },
    {
      icon: <FaUserShield className="text-indigo-500" />,
      title: "Secure Payments",
      desc: "Transparent and safe transactions for everyone."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50/50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold mb-6">
                <FaLeaf />
                <span>Modernizing Agriculture</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Connecting <span className="text-green-600">Farmers</span>, Restaurants & Drivers
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                AgroConnect is a decentralized marketplace helping farmers sell directly, restaurants buy fresh,
                and drivers earn by delivering goods efficiently.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                {!localStorage.getItem("token") ? (
                  <>
                    <Link
                      to="/signup"
                      className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-xl shadow-green-100 transition-all flex items-center justify-center space-x-2 group"
                    >
                      <span>Get Started Now</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/login"
                      className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <Link
                    to={`/${localStorage.getItem("role") || "login"}`}
                    className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-xl shadow-green-100 transition-all flex items-center justify-center space-x-2 group"
                  >
                    <span>Go to My Dashboard</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-1">
                  <FaCheckCircle className="text-green-500" />
                  <span>No Middlemen</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCheckCircle className="text-green-500" />
                  <span>Real-time Tracking</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src={AgroConnet}
                alt="Agriculture Illustration"
                className="w-full relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">One Platform, Three Solutions</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              We empower every stakeholder in the supply chain with tools designed for their success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
