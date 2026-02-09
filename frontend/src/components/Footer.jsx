import { FaLeaf, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <FaLeaf className="text-xl text-green-600" />
            <span className="text-lg font-bold text-gray-800">AgroConnect</span>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} AgroConnect. Empowering Sustainable Agriculture.
          </div>

          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-green-600 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-green-600 transition-colors"><FaGithub /></a>
            <a href="#" className="hover:text-green-600 transition-colors"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
  