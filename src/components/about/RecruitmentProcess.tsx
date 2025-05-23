import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"; // Assuming shadcn/ui
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui, for "Read More"
import { FaArrowDown } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from "lucide-react"; // For Read More/Less icons

const RecruitmentProcess = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const MAX_WORDS = 15; // Adjust if a different preview length is desired

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

  const processSteps = [
    {
      icon: "/image/about/icon5.png",
      title: "Understanding Client Requirements",
      description:
        "At Silver Talent, we begin by gaining a deep understanding of the client’s needs, ensuring precise alignment with their manpower requirements—including skill sets, experience levels, and cultural fit.",
      delay: "0s",
    },
    {
      icon: "/image/about/icon6.png",
      title: "AI-Based Candidate Evaluation",
      description:
        "Silver Talent conducts in-depth research to compile a list of qualified candidates. Silver Talent leverages cutting-edge AI technology for candidate assessment. Our advanced software analyzes resumes, evaluates skills, and assesses compatibility, ensuring an efficient and unbiased short listing process tailored to client requirements.",
      delay: "0.2s",
    },
    {
      icon: "/image/about/icon7.png",
      title: "Client Assessment of the Shortlisted Candidates",
      description:
        "Silver Talent provides a curated list of shortlisted candidates, enabling clients to review profiles, conduct interviews.",
      delay: "0.4s",
    },
    {
      icon: "/image/about/icon8.png",
      title: "Selection Process of Candidates",
      description:
        "Interviews with shortlisted candidates are scheduled in coordination with the client, and upon selection, we manage the documentation process.",
      delay: "0.6s",
    },
    {
      icon: "/image/about/icon9.png",
      title: "Streamlined Documentation and Onboarding Process",
      description:
        "To accelerate the hiring journey, Silver Talent streamlines documentation and onboarding. We manage paperwork with precision, ensure smooth communication, and deliver a swift transition from candidate selection to onboarding—reducing administrative burdens along the way.",
      delay: "0.8s",
    },
  ].sort((a, b) => parseFloat(a.delay) - parseFloat(b.delay));

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getPreviewText = (text, index) => {
    if (expandedCards[index]) return text;
    const words = text.split(" ");
    return words.length > MAX_WORDS
      ? words.slice(0, MAX_WORDS).join(" ") + "..."
      : text;
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 animate-on-scroll">
            Our Recruitment Process
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto animate-on-scroll">
            How we deliver top talent step-by-step
          </p>
          <FaArrowDown className="mt-6 mx-auto text-sky-600 w-6 h-6 md:w-8 md:h-8 animate-bounce" />
        </div>

        {/* Switched to flex-wrap for centering last row items and controlling individual card widths */}
        <div className="flex flex-wrap justify-center gap-8">
          {processSteps.map((step, index) => (
            <Card
              key={index}
              className="animate-on-scroll bg-white shadow-2xl border-gray-400 rounded-xl transition-all duration-300 
                         hover:shadow-xl hover:scale-105 flex flex-col w-full max-w-[300px]" // Reduced max-width
              style={{ transitionDelay: step.delay }}
            >
              <CardContent className="p-6 md:p-8 flex flex-col items-center text-center flex-grow"> {/* p-6 or p-8, choose one for consistency */}
                {/* Icon Section */}
                <div className="mb-6">
                  <div className="bg-royal-blue/10 p-3 rounded-full inline-flex items-center justify-center">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3> {/* Adjusted title size for smaller card */}
                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 flex-grow min-h-[4em]"> {/* Adjusted text size and min-height for smaller card */}
                  {expandedCards[index]
                    ? step.description
                    : getPreviewText(step.description, index)}
                </p>
                {/* Read More/Less Button */}
                {step.description.split(" ").length > MAX_WORDS && (
                  <div className="mt-auto pt-2">
                    <Button
                      variant="link"
                      onClick={() => toggleExpand(index)}
                      className="text-sky-600 hover:text-sky-700 font-semibold text-sm" // Adjusted button text size
                    >
                      {expandedCards[index] ? "Read Less" : "Read More"}
                      {expandedCards[index] ? <ChevronUp className="ml-1.5 h-4 w-4" /> : <ChevronDown className="ml-1.5 h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentProcess;