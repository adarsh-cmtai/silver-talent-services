import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// Define country codes - add more as needed
const countryCodes = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+86", name: "China", flag: "🇨🇳" },
];

const ContactForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    phone: "",
    yourMessage: ""
  });

  const [formErrors, setFormErrors] = useState({
    yourName: false,
    yourEmail: false,
    phone: false,
    yourMessage: false
  });

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("form-animated");
            // observer.unobserve(entry.target); // Optional: Unobserve after animation
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToObserve = document.querySelectorAll(".form-animate-on-scroll");
    elementsToObserve.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToObserve.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false })); // Clear error on change
  };

  const handleCountryChange = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
  };

  const validateForm = () => {
    const errors = {
      yourName: formData.yourName.trim() === "",
      yourEmail: !/^\S+@\S+\.\S+$/.test(formData.yourEmail),
      phone: !/^\d{7,15}$/.test(formData.phone.trim()), // Basic validation for 7-15 digits
      yourMessage: formData.yourMessage.trim() === ""
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const fullPhoneNumber = `${selectedCountry.code}${formData.phone}`;
      const dataToSubmit = {
        ...formData,
        fullPhoneNumber: fullPhoneNumber,
        countryCode: selectedCountry.code // Explicitly add country code
      };
      
      console.log("Form Data Submitted:", dataToSubmit);
      toast.success("Thank you for your message! We'll be in touch soon.");
      setFormData({
        yourName: "",
        yourEmail: "",
        phone: "",
        yourMessage: ""
      });
      setSelectedCountry(countryCodes[0]); // Reset country to default
    } else {
      toast.error("Please correct the errors in the form.");
    }
  };

  // Base classes for input styling
  const inputContainerBaseClasses = "flex items-stretch overflow-hidden rounded-md bg-slate-100 border-2";
  const inputFocusWithinClasses = "focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500";
  const inputErrorClasses = "border-red-500 focus-within:ring-red-500";
  const inputNormalClasses = "border-slate-100";
  
  const singleInputBaseClasses = "w-full bg-slate-100 border-2 text-sm p-3 rounded-md placeholder:text-gray-500";
  const singleInputFocusClasses = "focus:border-sky-500 focus:ring-1 focus:ring-sky-500";


  return (
    <section className="py-12 md:py-16 bg-slate-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-14 form-animate-on-scroll">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-800">
            Leave A Message
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Column: Image with Decorative Background */}
          <div className="relative form-animate-on-scroll overflow-hidden rounded-lg p-6 md:p-8">
            {/* The Decorative Shape */}
            <div
              className="absolute inset-0 -z-10" 
              aria-hidden="true"
            >
              <div
                className="h-full w-full bg-sky-100"
                style={{
                  clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 80%)",
                  // On smaller screens where layout stacks, you might want to adjust clipPath
                  // or hide this shape using responsive Tailwind classes e.g. hidden lg:block on the parent ^
                }}
              ></div>
            </div>

            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" 
              // IMPORTANT: REPLACE THIS WITH YOUR ACTUAL IMAGE PATH
              alt="Contact us illustration"
              className="relative w-full h-auto max-w-md mx-auto rounded-lg shadow-lg object-contain" 
            />
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border-gray-700 form-animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="yourName" className="block text-sm font-medium text-gray-600 mb-1.5">
                    Your Name<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="yourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleChange}
                    className={`${singleInputBaseClasses} ${formErrors.yourName ? 'border-red-500 focus:ring-red-500' : inputNormalClasses} ${singleInputFocusClasses}`}
                    placeholder="Enter your full name" 
                  />
                  {formErrors.yourName && <p className="text-red-500 text-xs mt-1">Please enter your name.</p>}
                </div>
                <div>
                  <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-600 mb-1.5">
                    Your Email<span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="yourEmail"
                    name="yourEmail"
                    type="email"
                    value={formData.yourEmail}
                    onChange={handleChange}
                    className={`${singleInputBaseClasses} ${formErrors.yourEmail ? 'border-red-500 focus:ring-red-500' : inputNormalClasses} ${singleInputFocusClasses}`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.yourEmail && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
                </div>
              </div>

              {/* Row 2: Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1.5">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div className={`${inputContainerBaseClasses} ${formErrors.phone ? inputErrorClasses : inputNormalClasses} ${inputFocusWithinClasses}`}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center px-3 py-2.5 bg-slate-200/70 border-none rounded-r-none hover:bg-slate-300/70 focus:ring-0">
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="ml-2 text-sm text-gray-700">{selectedCountry.code}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-1.5 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-60 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <DropdownMenuItem key={country.code + country.name} onSelect={() => handleCountryChange(country)} className="cursor-pointer">
                          <span className="text-lg mr-2">{country.flag}</span>
                          <span>{country.name} ({country.code})</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="!p-3 !text-sm !flex-grow !bg-transparent !border-none focus:!ring-0 placeholder:!text-gray-400 rounded-l-none"
                    placeholder="Enter phone number"
                  />
                </div>
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">Please enter a valid phone number (7-15 digits).</p>}
              </div>

              {/* Row 3: Message */}
              <div>
                <label htmlFor="yourMessage" className="block text-sm font-medium text-gray-600 mb-1.5">
                  Your Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="yourMessage"
                  name="yourMessage"
                  rows={5}
                  value={formData.yourMessage}
                  onChange={handleChange}
                  className={`${singleInputBaseClasses} resize-none ${formErrors.yourMessage ? 'border-red-500 focus:ring-red-500' : inputNormalClasses} ${singleInputFocusClasses}`}
                  placeholder="Type your message here..."
                />
                {formErrors.yourMessage && <p className="text-red-500 text-xs mt-1">Please enter your message.</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-base font-semibold transition-colors h-12">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;