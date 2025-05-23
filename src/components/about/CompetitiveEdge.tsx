import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card"; // Assuming shadcn/ui
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui
import {
  Users,        // For Access to a Larger Talent Pool
  Clock,        // For Speed in Recruitment
  Repeat,       // For Customized Hiring Solutions
  Check,        // For Proven Quality and Retention
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Helper components for Embla Carousel Navigation (PrevButton, NextButton, DotButton - remain the same)
const PrevButton = (props) => {
  const { enabled, onClick } = props;
  return (
    <button
      className="embla__button embla__button--prev disabled:opacity-30 transition-opacity absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-sky-600" />
    </button>
  );
};

const NextButton = (props) => {
  const { enabled, onClick } = props;
  return (
    <button
      className="embla__button embla__button--next disabled:opacity-30 transition-opacity absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-sky-600" />
    </button>
  );
};

const DotButton = (props) => {
  const { selected, onClick } = props;
  return (
    <button
      className={`embla__dot w-3 h-3 rounded-full mx-1.5 transition-colors duration-300 ${
        selected ? 'bg-sky-600' : 'bg-gray-300 hover:bg-gray-400'
      }`}
      type="button"
      onClick={onClick}
      aria-label="Go to slide"
    />
  );
};

// Using the 'advantages' content as requested
const advantagesData = [
  {
    icon: Users,
    title: "Access to a Larger Talent Pool",
    content:
      "With one of the largest and most refined candidate databases in the country, we offer unmatched access to top-tier, experienced professionals.",
    delay: "0s", // delay is kept in data, though not used for animation in this version
  },
  {
    icon: Clock,
    title: "Speed in Recruitment",
    content:
      "Our average turnaround time for providing a high-quality shortlist is just 24 to 48 hours, depending on the role's complexity.",
    delay: "0.2s",
  },
  {
    icon: Repeat,
    title: "Customized Hiring Solutions",
    content:
      "We leverage proprietary assessment tools to create tailored hiring solutions, ensuring the right fit for every role.",
    delay: "0.4s",
  },
  {
    icon: Check,
    title: "Proven Quality and Retention",
    content:
      "Over 85% of our key clients are MNCs, showcasing our consistency, quality, and the long-term success of our hires.",
    delay: "0.6s",
  },
];

const CompetitiveEdge = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto">
        {/* Optional: Add a title for this section if needed, e.g.,  */}
        <h2 className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold text-center mb-12 animate-on-scroll">
          Our Competitive Edge
          {/* <FaLightbulb className="text-sky-600 w-6 h-6 md:w-9 md:h-9" /> */}
        </h2>
       
        <div className="embla relative" >
          <div className="embla__viewport overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="embla__container flex -ml-4"> {/* Negative margin for spacing */}
              {advantagesData.map((advantage, index) => (
                <div 
                  className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4" // Slide widths
                  key={index}
                >
                  <Card className="h-full bg-white rounded-xl shadow-2xl flex flex-col border-gray-400">
                    <CardContent className="p-2 flex flex-col items-center text-center flex-grow"> {/* Increased padding to p-8 */}
                      <advantage.icon className="w-16 h-16 text-sky-600 mb-6" /> {/* Slightly larger icon, more margin */}
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{advantage.title}</h3> {/* Larger title text, more margin */}
                      <p className="text-base text-gray-600 mb-6 flex-grow min-h-[10em]"> {/* Larger description text, more margin, increased min-height */}
                        {advantage.content}
                      </p>
                      <Button 
                        variant="default" 
                        className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-8 rounded-md mt-auto text-base" // Slightly larger button text & padding
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {emblaApi && scrollSnaps.length > 1 && (
            <>
              <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
              <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </>
          )}
        </div>

        {emblaApi && scrollSnaps.length > 1 && (
          <div className="embla__dots flex justify-center mt-8">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompetitiveEdge;