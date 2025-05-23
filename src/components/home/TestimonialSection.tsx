import { useState, useEffect, useRef } from "react";

const initialTestimonials = [
  {
    id: 1,
    rating: 5,
    content:
      "With strong experience in leadership assessments, the Silver Talent team delivered impressive results on a crucial project by securing top-tier talent for all our executive positions.",
    name: "Associate Director Talent Acquisition",
    details: "Leading E-commerce Company",
  },
  {
    id: 2,
    rating: 5,
    content:
      "Great job, Team Silver Talent! You delivered the best available talent in record time to meet our needs.",
    name: "Head of HR",
    details: "Global Facility Management Company",
  },
  {
    id: 3,
    rating: 5,
    content:
      "Silver Talent has exceeded all expectations with their professionalism, prompt communication, and quality of candidates. They made the hiring process smooth and hassle-free. It’s been a pleasure working with them, and I look forward to a continued partnership.",
    name: "GM HR",
    details: "Leading Edtech Company",
  },
  {
    id: 4,
    rating: 5,
    content:
      "I’d like to take a moment to acknowledge and appreciate the excellent work you do. You’ve been a dedicated, reliable, and approachable recruitment partner. Your adaptability to shifting business needs has enabled us to hire quickly and identify the right talent for our roles. Thank you for your consistent effort and proactive approach.",
    name: "—",
    details: "Leading Media Client",
  },
  {
    id: 5,
    rating: 5,
    content:
      "I've worked closely with the HR team at Silver Talent, and they’ve consistently supported us in successfully filling several niche roles. Their dedication to quality service and openness to feedback make them a reliable and valuable recruitment partner.",
    name: "Manager HR",
    details: "Leading Travel Company",
  },
  {
    id: 6,
    rating: 5,
    content:
      "Silver Talent has consistently demonstrated genuine commitment to delivering talent across all levels. Their proactive involvement in understanding our requirements is truly commendable, and I’ve always appreciated their round-the-clock availability and support.",
    name: "Talent Acquisition Head",
    details: "Leading Real Estate Company",
  },
];


const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const itemsPerPage = 3;
  const intervalRef = useRef<number | null>(null);

  // Autoplay functions (optional)
  const startAutoScroll = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Optional: Start autoplay
    // startAutoScroll();
    // return () => stopAutoScroll();
  }, [testimonials.length]);

  const nextTestimonials = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonials = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    const visible = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const itemIndex = (currentIndex + i) % testimonials.length;
      // Ensure we don't go out of bounds if testimonials.length < itemsPerPage
      if (testimonials[itemIndex]) {
        visible.push(testimonials[itemIndex]);
      } else if (testimonials.length > 0) { // Fill with first items if not enough unique
        visible.push(testimonials[i % testimonials.length]);
      }
    }
    // If still not enough (e.g. 1 testimonial, itemsPerPage = 3), duplicate it
    while (visible.length > 0 && visible.length < itemsPerPage) {
      visible.push(...visible.slice(0, itemsPerPage - visible.length));
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  // The blue color from your image, similar to Tailwind's blue-600 or blue-700
  const hoverBgColor = "hover:bg-sky-600"; // You can adjust this e.g. hover:bg-[#00529B]
  const hoverBorderColor = "hover:border-sky-600"; // Match background to make border blend

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Our Use Kind Words
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center justify-center">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}-${currentIndex}`}
                className={`group bg-white rounded-2xl shadow-lg p-6 border border-blue-500 
                    ${hoverBgColor} ${hoverBorderColor}
                    h-full flex flex-col transition-all duration-1000 ease-in-out
                    cursor-pointer`}
              >
                {/* Stars */}
                <div className="flex justify-start mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Company */}
                <p className="text-sm font-semibold text-blue-700 group-hover:text-blue-200 transition-colors duration-150 ease-in-out mb-1">
                  {testimonial.details}
                </p>

                {/* Position */}
                <h3 className="text-gray-900 group-hover:text-white font-bold text-lg transition-colors duration-150 ease-in-out mb-4">
                  {testimonial.name}
                </h3>

                {/* Content */}
                <p className="text-gray-700 group-hover:text-white text-base leading-relaxed mb-6 min-h-[100px] md:min-h-[120px] transition-colors duration-150 ease-in-out flex-grow">
                  {testimonial.content}
                </p>

                {/* Avatar Circle */}
                <div className="mt-auto pt-4">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-gray-200 mr-4 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <span className="text-xl font-semibold text-gray-500 group-hover:text-gray-500 transition-colors duration-150 ease-in-out">
                        {/* {testimonial.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > itemsPerPage && (
            <div className="flex justify-center mt-10 space-x-3">
              <button
                onClick={prevTestimonials}
                className="bg-white hover:bg-gray-100 text-blue-600 rounded-full p-3 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Previous testimonials"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={nextTestimonials}
                className="bg-white hover:bg-gray-100 text-blue-600 rounded-full p-3 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Next testimonials"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>


        {/* CTA Button - "Get in touch and chat with us" */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-10 py-4 text-base rounded-md shadow-lg transition-colors duration-300"
            style={{ clipPath: 'polygon(0% 0%, calc(100% - 18px) 0%, 100% 50%, calc(100% - 18px) 100%, 0% 100%)' }}
          >
            Get in touch and chat with us
          </a>
        </div>
      </div>

      {/* Side CTAs */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div
          className="bg-yellow-400 text-black font-bold px-2 py-4 mb-1 cursor-pointer shadow-lg hover:bg-yellow-500 transition-colors"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          onClick={() => {/* Handle Query Now click */ }}
        >
          QUERY NOW
        </div>
        <div
          className="bg-blue-600 text-white font-bold px-2 py-4 cursor-pointer shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          onClick={() => {/* Handle Call Now click */ }}
        >
          <span className="mr-1">CALL NOW?</span>
          <svg
            className="w-4 h-4 inline-block transform rotate-[-90deg]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;