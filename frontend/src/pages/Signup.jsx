import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaUserPlus, FaLeaf } from "react-icons/fa";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "farmer") navigate("/farmer");
      else if (role === "restaurant") navigate("/restaurant");
      else if (role === "driver") navigate("/driver");
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await signup(form);
      if (res.user) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      } else {
        toast.error(res.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("An error occurred during signup. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-50">
          <div className="bg-green-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
              <FaLeaf className="text-3xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-green-100 mt-2">Join AgroConnect and start growing</p>
          </div>

          <form onSubmit={handleSignup} className="p-8 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaUserTag />
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="farmer">Farmer</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 active:transform active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaUserPlus />
                  <span>Create Account</span>
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-600 pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-bold hover:underline">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
