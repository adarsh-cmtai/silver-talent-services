import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/vacancies", label: "Vacancies" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const commonButtonStyles = "text-xs font-semibold h-9 px-5 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  // MODIFIED: The "Job Seeker" button now leads to admin login.
  // You might want to rename this variable or the button text if "JOB SEEKER" is confusing for an admin login.
  // For now, sticking to the request of changing where the "JOB SEEKER" button leads.
  const adminLoginButtonStyles = `border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white focus:ring-blue-400 ${commonButtonStyles}`;
  const employersButtonStyles = `bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 ${commonButtonStyles}`;


  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar Section */}
      <div className="bg-[#111827] text-white">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-2 py-2 
                        sm:flex-row sm:justify-between sm:items-center sm:space-y-0 sm:text-left text-xs sm:text-sm">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 sm:gap-x-3 gap-y-1">
            <span className="font-medium">Job Seekers:</span>
            <a href="mailto:jobs@silvertalentservices.com" className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
              <Mail size={14} strokeWidth={1.5} />
              <span>jobs@silvertalentservices.com</span>
            </a>
            <span className="hidden sm:inline-block text-gray-400">|</span>
            <a href="tel:+919300000000" className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
              <Phone size={14} strokeWidth={1.5} />
              <span>+91-9300000000</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 sm:gap-x-3 gap-y-1 mt-2 sm:mt-0">
            <span className="font-medium">Looking for Candidates:</span>
            <a href="mailto:hello@silvertalentservices.com" className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
              <Mail size={14} strokeWidth={1.5} />
              <span>hello@silvertalentservices.com</span>
            </a>
            <span className="hidden sm:inline-block text-gray-400">|</span>
            <a href="tel:+91930000000000" className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
              <Phone size={14} strokeWidth={1.5} />
              <span>+91-930000000000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 py-4" 
          }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center">
            <img src="/image/Logo.avif" alt="Silver Talent Services" className="h-16 w-52" />
          </Link>

          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  text-sm uppercase font-semibold tracking-wider
                  pb-1.5 pt-1 relative group
                  transform transition-all duration-300 ease-in-out
                  hover:text-sky-600 hover:scale-105
                  ${location.pathname === link.to
                    ? "text-sky-600"
                    : "text-slate-700"
                  }
                `}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-sky-500 transform transition-transform duration-300 ease-out
                                 ${location.pathname === link.to ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}>
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2.5">
            {/* MODIFIED HERE: Changed Link to="/admin-login" */}
            <Button asChild className={adminLoginButtonStyles}>
              <Link to="/admin-login">JOB SEEKER</Link> 
            </Button>
            <Button asChild className={employersButtonStyles}>
              <Link to="/employers">EMPLOYERS</Link>
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-7 w-7 text-slate-700" />
            ) : (
              <Menu className="h-7 w-7 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-xl border-t border-gray-200">
          <div className="flex flex-col space-y-2 px-5 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  py-2.5 px-3 rounded-md text-sm font-medium
                  transition-colors duration-200 ease-in-out
                  hover:bg-sky-50 hover:text-sky-600
                  ${location.pathname === link.to
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-700"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-gray-200 flex flex-col space-y-3">
              {/* MODIFIED HERE: Changed Link to="/admin-login" */}
              <Button asChild className={`${adminLoginButtonStyles} w-full`}>
                <Link to="/admin-login" onClick={() => setIsOpen(false)}>JOB SEEKER</Link>
              </Button>
              <Button asChild className={`${employersButtonStyles} w-full`}>
                <Link to="/employers" onClick={() => setIsOpen(false)}>EMPLOYERS</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;