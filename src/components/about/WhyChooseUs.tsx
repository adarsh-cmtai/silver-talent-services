import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaHandshake } from 'react-icons/fa';

const WhyChooseUs = () => {
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

    const elementsToObserve = document.querySelectorAll(".animate-on-scroll");
    elementsToObserve.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToObserve.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const reasons = [
    {
      icon: "/image/about/icon1.png",
      title: "Access to a Larger Talent Pool",
      content:
        "Silver Talent has access to a vast pool of candidates from job portals, social media, and referrals from past hired candidates.",
      delay: "0s",
    },
    {
      icon: "/image/about/icon2.png",
      title: "Save Time and Effort",
      content:
        "Outsource your recruitment and let us handle the entire process — from screening to interviewing — saving your resources.",
      delay: "0.2s",
    },
    {
      icon: "/image/about/icon3.png",
      title: "Flexibility and Scalability",
      content:
        "Our customized services ensure your business stays agile with the right talent in a constantly evolving environment.",
      delay: "0.4s",
    },
    {
      icon: "/image/about/icon4.png",
      title: "Quality of Hire",
      content:
        "We use comprehensive assessments and background checks to ensure every candidate is the best fit for the role.",
      delay: "0.6s",
    },
  ];

  return (
    <section className="py-9 px-4 bg-gray-50"> {/* Added a light gray background to the section for contrast with white cards */}
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center gap-3 mb-4 animate-on-scroll">
            <h2 className="text-xl md:text-3xl font-bold text-center text-gray-800"> {/* Ensured text color */}
              Why Choose Us for Your Recruitment Services?
            </h2>
            <FaHandshake className="text-sky-600 w-8 h-8 md:w-12 md:h-12" /> {/* Slightly adjusted size for visual balance */}
          </div>
          <p className="text-base text-gray-600 max-w-3xl mx-auto animate-on-scroll"> {/* Ensured text-base */}
            Why you should choose our recruitment solutions to drive your business success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="animate-on-scroll bg-white border-gray-500 shadow-2xl rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
              style={{ transitionDelay: reason.delay }}
            >
              <CardContent className="p-8 flex flex-col items-center text-center flex-grow">
                {/* Icon container */}
                <div className="mb-6">
                  <div className="bg-royal-blue/10 p-3 rounded-full inline-flex items-center justify-center">
                    <img
                      src={reason.icon}
                      alt={reason.title}
                      className="w-16 h-16 object-contain" // Icon image size increased
                    />
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{reason.title}</h3>
                {/* Content */}
                <p className="text-base text-gray-600 flex-grow min-h-[8em]"> {/* min-h for height consistency */}
                  {reason.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;