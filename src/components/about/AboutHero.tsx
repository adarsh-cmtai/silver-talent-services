import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const AboutHero = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section
      className="py-16 px-4 md:py-9 bg-no-repeat bg-cover bg-center relative md:pt-1 shadow-2xl"
      style={{ backgroundImage: "url('/images/bg-illustration.png')" }}
    >
      {/* Optional overlay for better text contrast */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      <div
        className="absolute inset-y-0 right-0 w-full md:w-3/4 lg:w-2/3 xl:w-3/5 -z-0"
        aria-hidden="true"
      >
        <div
          className="h-[95%] bg-sky-100" // Light blue background
          style={{
            clipPath:
              "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)", // Creates a slanted left edge
              // On smaller screens, this might need adjustment or a different approach.
              // e.g. on mobile when layout is stacked. This polygon is more for desktop.
          }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold text-royal-blue mb-6">
              About Silver Talent
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              At Silver Talent, we pride ourselves on delivering both quality and speed in recruitment. Our average turnaround time for providing a high-quality shortlist is just 24 to 48 hr, depending on the role's complexity.
              With one of the largest and most refined candidate databases in the country, we offer unmatched access to top-tier, experienced professionals.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We leverage proprietary assessment tools to create customized hiring solutions, significantly improving the chances of finding the right fit. Our domain-focused approach ensures targeted sourcing and successful placements.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase px-6 py-3 rounded-lg transition duration-200">
              Learn More
            </Button>
          </div>

          {/* Right Image */}
          <div className="animate-on-scroll self-start" style={{ transitionDelay: "0.2s" }}>
            <img
              src="/image/image1.png"
              alt="HR recruitment collaboration"
              className="rounded-lg w-full h-96 object-cover mt-1 md:mt-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
