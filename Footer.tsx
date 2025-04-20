
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-echopurple-600 to-echoblue-500 bg-clip-text text-transparent">
                EchoMentor
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Where guidance today meets tomorrow. Connecting mentees with expert mentors for
              personalized growth and development.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/find-mentors"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contact
            </h3>
            <address className="not-italic">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Greater Noida, Uttar Pradesh, India
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Email: info@echomentor.in
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Phone: +91 9876543210
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} EchoMentor. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0 flex items-center">
              Made with <Heart size={14} className="mx-1 text-red-500" /> by Team EchoMentor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
