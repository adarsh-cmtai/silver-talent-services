import { useRef, useEffect } from "react";
import { Briefcase, ShieldCheck } from "lucide-react";

const logos = [
  { id: 1, name: "Cushman & Wakefield", url: "https://logo.clearbit.com/cushwake.com" },
  { id: 2, name: "CB Richard Ellis", url: "https://logo.clearbit.com/cbre.com" },
  { id: 3, name: "Zepto", url: "https://logo.clearbit.com/zeptonow.com" },
  { id: 4, name: "Bigbasket", url: "https://logo.clearbit.com/bigbasket.com" },
  { id: 5, name: "Ola Cabs", url: "https://logo.clearbit.com/olacabs.com" },
  { id: 6, name: "Nobroker", url: "https://logo.clearbit.com/nobroker.in" },
  { id: 7, name: "Springwel", url: "https://logo.clearbit.com/springwel.com" },
  { id: 8, name: "Reliance Retail", url: "https://logo.clearbit.com/relianceretail.com" },
  { id: 9, name: "Blue Tokai", url: "https://logo.clearbit.com/bluetokaicoffee.com" },
  { id: 10, name: "Dish TV", url: "https://logo.clearbit.com/dishtv.in" },
  { id: 11, name: "Goibibo", url: "https://logo.clearbit.com/goibibo.com" },
  { id: 12, name: "Classplus", url: "https://logo.clearbit.com/classplusapp.com" },
  { id: 13, name: "Concentrix", url: "https://logo.clearbit.com/concentrix.com" },
  { id: 14, name: "Fever104 FM", url: "https://logo.clearbit.com/fever.fm" },
  { id: 15, name: "CBRE", url: "https://logo.clearbit.com/cbre.com" }
];

const LogoSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sliderRef.current?.classList.add("animate-scroll");
        }
      },
      { threshold: 0.1 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800 flex items-center justify-center gap-4">
          <Briefcase className="w-12 h-12 text-[#006CB7]" />
          Trusted by <span className="text-[#006CB7]">150+ Employers</span>
          <ShieldCheck className="w-12 h-12 text-[#006CB7]" />
        </h2>
        <div className="overflow-hidden relative w-full group"> {/* Added group for potential group-hover states if needed */}
          <div
            ref={sliderRef}
            className="flex w-max space-x-7 will-change-transform" // Increased space between items
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex items-center h-20 p-3 rounded-lg 
                           transition-all duration-300 ease-in-out 
                           hover:scale-105 hover:shadow-2xl hover:bg-white 
                           min-w-[240px] md:min-w-[280px]" // Container for logo + text, with hover effects
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-32 w-32 max-w-[150px] object-contain 
                             filter whitescale shadow-lg group-hover:grayscale-0
                             transition-all duration-300 rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none'; // Hide broken image
                    // Create a text fallback directly if image fails
                    const fallbackText = document.createElement('span');
                    fallbackText.className = "text-xs text-gray-500 px-2 py-1 bg-gray-200 rounded-lg";
                    fallbackText.textContent = `${logo.name.substring(0, 10)} (logo error)`;
                    target.parentNode?.insertBefore(fallbackText, target.nextSibling);
                  }}
                />
                <span className="ml-4 text-sm font-medium text-slate-700 truncate flex-shrink min-w-0">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
          {/* Optional: Fades for edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        <style>
          {`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%); /* Scrolls one full set of logos */
              }
            }

            .animate-scroll {
              animation: scroll 40s linear infinite; /* Increased duration for smoother scroll with more content */
            }
            
            /* If you defined custom colors like royal-blue or mustard-gold, ensure they are in your global CSS or Tailwind config */
            /* .text-royal-blue { color: #4169E1; } */
            /* .text-mustard-gold { color: #FFDB58; } */
          `}
        </style>
      </div>
    </section>
  );
};

export default LogoSlider;