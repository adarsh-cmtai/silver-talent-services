import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Silver Talent<span className="text-sky-600">Services</span>
            </h3>
            <p className="mb-4 text-gray-200">
              Empowering businesses with exceptional recruitment solutions designed to drive success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-200 hover:text-sky-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-200 hover:text-sky-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-200 hover:text-sky-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-200 hover:text-sky-600 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-200 hover:text-sky-600transition-colors">About Us</a></li>
              <li><a href="/services" className="text-gray-200 hover:text-sky-600 transition-colors">Services</a></li>
              <li><a href="/blog" className="text-gray-200 hover:text-sky-600 transition-colors">Blog</a></li>
              <li><a href="/vacancies" className="text-gray-200 hover:text-sky-600 transition-colors">Vacancies</a></li>
              <li><a href="/contact" className="text-gray-200 hover:text-sky-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Business Avenue, Corporate Park, Mumbai, 400001</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <span>+91 9300000000</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>info@silvertalentservices.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Newsletter</h3>
            <p className="mb-4 text-gray-200">Subscribe to get the latest updates on recruitment trends.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                required
                className="bg-action-blue/30 border-gray-600 text-white placeholder:text-gray-300"
              />
              <Button
                type="submit"
                className="bg-sky-600 hover:bg-sky-600/80 text-[#363672] font-semibold w-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} HiringGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
