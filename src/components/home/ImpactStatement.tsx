import { useRef, useEffect } from "react";
import { Users } from "lucide-react";

const ImpactStatement = () => {
  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          statementRef.current?.classList.add("animated");
        }
      },
      { threshold: 0.1 }
    );

    if (statementRef.current) {
      observer.observe(statementRef.current);
    }

    return () => {
      if (statementRef.current) {
        observer.unobserve(statementRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-[#091e42] text-white">
      <div className="container mx-auto px-4">
        <div
          ref={statementRef}
          className="animate-on-scroll max-w-4xl mx-auto text-center flex flex-col"
        >
          {/* <Users className="w-12 h-12 text-[#006CB7]"/> */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white flex items-center gap-4">
            Recruit Leaders & High-performing Innovative Teams Using HiringGo Services
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatement;
