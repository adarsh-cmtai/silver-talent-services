// src/components/Home/SolutionsSection.tsx (or wherever this file is located)
import { useState, useEffect } from "react"; // Added useEffect
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench } from "lucide-react";

// Define the type for a solution item
interface Solution {
  id: number; // Assuming id is numeric as in your example
  serviceId: string; // This will be used for the route parameter
  icon: string;
  title: string;
  description: string;
}

const solutions: Solution[] = [
  {
    id: 1,
    serviceId: "recruitment-services", // Matches the 'id' in servicesContent from Services.tsx
    icon: "/image/Home/icon1.png",
    title: "Recruitment Services",
    description:
      "Streamline your hiring process with Silver Talent's expert recruitment services. We match businesses with the right talent through customized solutions that ensure smooth and successful hiring.",
  },
  {
    id: 2,
    serviceId: "executive-search",
    icon: "/image/Home/icon2.png",
    title: "Executive Search",
    description:
      "We are leading professional headhunters with a proven track record of placing exceptional C-level executives across various industries.",
  },
  {
    id: 3,
    serviceId: "staffing-services",
    icon: "/image/Home/icon3.png",
    title: "Staffing Services",
    description:
      "At Silver Talent, we deliver premium staffing services—whether you need short-term support or long-term workforce solutions.",
  },
  {
    id: 4,
    serviceId: "hr-outsourcing",
    icon: "/image/Home/icon4.png",
    title: "HR Outsourcing",
    description:
      "Silver Talent provides end-to-end outsourcing services that boost efficiency, cut costs, and accelerate business growth.",
  },
  {
    id: 5,
    serviceId: "payroll-services",
    icon: "/image/Home/icon5.png",
    title: "Payroll Services",
    description:
      "Silver Talent specializes in customized Third-Party Payroll Services designed to suit the unique requirements of businesses across various industries.",
  },
  {
    id: 6,
    serviceId: "training-development",
    icon: "/image/Home/icon6.png",
    title: "Training & Development",
    description:
      "Silver Talent's principal objective of training and development is to make sure your employees are able to unlock their true potential.",
  },
  // Add more solutions if they exist, ensuring each has a unique serviceId
  // that corresponds to an entry in servicesContent in Services.tsx
];

const SolutionsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4); // Default for larger screens

  // Update cardsPerView based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) { // sm
        setCardsPerView(1);
      } else if (window.innerWidth < 768) { // md
        setCardsPerView(2);
      } else if (window.innerWidth < 1024) { // lg
        setCardsPerView(3);
      } else { // xl and above
        setCardsPerView(4);
      }
    };

    updateCardsPerView(); // Set initial value
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);


  const totalSlides =
    solutions.length > 0 ? Math.ceil(solutions.length / cardsPerView) : 0;

  const goToSlide = (index: number) => {
    if (totalSlides === 0) return;
    setCurrentIndex(index % totalSlides);
  };

  const nextSlide = () => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  if (solutions.length === 0) return null;

  // Calculate the items to display for the current slide
  const startIndex = currentIndex * cardsPerView;
  const endIndex = startIndex + cardsPerView;
  const currentSolutions = solutions.slice(startIndex, endIndex);


  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 flex justify-center items-center gap-3">
            Our Solutions For You
            <Wrench className="w-10 h-10 text-[#006CB7]" />
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore services tailored to drive your business success and optimize your workforce.
          </p>
        </div>

        <div className="relative"> {/* Removed overflow-hidden for a simpler non-translate carousel */}
          <div
            className="grid gap-6 sm:gap-8"
            style={{
              gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`,
            }}
          >
            {currentSolutions.map((solution) => (
              <div
                key={solution.id}
                className="flex" // Ensure cards take full height of their grid cell
              >
                <Card className="bg-[#fff] border shadow-2xl rounded-3xl border-gray-400 hover:shadow-[#777777] hover:scale-[1.03] transition-all duration-700 h-full flex flex-col min-h-[300px] md:min-h-[360px] w-full">
                  <CardHeader className="pt-6 pb-4 text-center">
                    <div className="mb-5 flex justify-center items-center h-16">
                      <img
                        src={solution.icon}
                        alt={`${solution.title} icon`}
                        className="w-12 h-12 md:w-20 md:h-20 object-contain rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/64x64/CBD5E1/475569?text=Err&font=sans`;
                          target.alt = `${solution.title} icon error`;
                        }}
                      />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-black"> {/* Adjusted title size */}
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 md:px-6">
                    <p className="text-black text-[15px] leading-relaxed">
                      {solution.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 md:p-6">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-sky-500 text-white bg-sky-600 hover:bg-sky-600 hover:text-white transition-colors duration-300 py-3 text-base"
                    >
                      {/* MODIFIED Link to point to the specific service detail page */}
                      <Link to={`/services/${solution.serviceId}`} state={{ from: location.pathname }}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          {/* Slider Controls - Keep these if you want pagination even with the grid display */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-700 rounded-full p-2.5 shadow-lg z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-700 rounded-full p-2.5 shadow-lg z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>

              <div className="flex justify-center mt-10">
                <div className="flex space-x-2.5">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out 
                        ${currentIndex === idx ? "bg-sky-600 scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
                      onClick={() => goToSlide(idx)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;