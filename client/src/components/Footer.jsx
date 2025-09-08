import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#95A195] text-black">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo and Vision Section */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
            <p className="mt-4 max-w-xs text-sm">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-black transition hover:opacity-75"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-6 w-6 rounded-full bg-white p-1" />
              </a>
              <a
                href="#"
                className="text-black transition hover:opacity-75"
                aria-label="Twitter"
              >
                <FaTwitter className="h-6 w-6 rounded-full bg-white p-1" />
              </a>
              <a
                href="#"
                className="text-black transition hover:opacity-75"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6 rounded-full bg-white p-1" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <p className="font-medium">About</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Featured
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Partnership
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Business Relation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Community</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Podcast
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Invite a friend
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Socials</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-600 pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs">
              &copy; 2025 The Glamour. All rights reserved.
            </p>
            <div className="mt-4 flex gap-6 text-xs sm:mt-0">
              <a href="#" className="transition hover:opacity-75">
                Terms & Condition
              </a>
              <a href="#" className="transition hover:opacity-75">
                Privacy & Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
