import { useRef, useEffect, useState } from "react";
import {
  TrendingUp,
  Trophy,
  Building,
  FileText,
  Map,
  Users,
} from "lucide-react";

const statsData = [
  { id: 1, value: 10, label: "Years of Experience", suffix: "+", icon: <Trophy /> },
  { id: 2, value: 250, label: "Corporates Served", suffix: "+", icon: <Building /> },
  { id: 3, value: 100000, label: "Resumes Scanned", suffix: "+", icon: <FileText /> },
  { id: 4, value: 200, label: "Unique Roles Mapped", suffix: "+", icon: <Map /> },
  { id: 5, value: 8500, label: "Candidates Placed", suffix: "+", icon: <Users /> },
];

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(statsData.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const animationTimersRef = useRef<NodeJS.Timeout[]>([]);

  const animateValues = () => {
    animationTimersRef.current.forEach(clearInterval);
    animationTimersRef.current = [];

    statsData.forEach((stat, index) => {
      const duration = 2000;
      const steps = 100;
      const stepValue = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const nextVal = Math.round(stepValue * currentStep);

        setAnimatedStats(prev => {
          const newValues = [...prev];
          newValues[index] = nextVal >= stat.value ? stat.value : nextVal;
          return newValues;
        });

        if (nextVal >= stat.value) clearInterval(timer);
      }, duration / steps);

      animationTimersRef.current.push(timer);
    });
  };

  useEffect(() => {
    if (isVisible) {
      setAnimatedStats(statsData.map(() => 0));
      animateValues();
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    const el = statsRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      animationTimersRef.current.forEach(clearInterval);
    };
  }, []);

  const formatValue = (value: number) => {
    return value >= 1000 ? value.toLocaleString() : value.toString();
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
            The Facts and Figures Behind Our Success
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </h3>
        </div>

        <div
          ref={statsRef}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
            {statsData.map((stat, index) => (
              <div
                key={stat.id}
                className="flex flex-col items-center p-3 hover:scale-105 transition-transform duration-200"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full p-3 mb-4 flex items-center justify-center">
                  {stat.icon && (
                    <div className="w-full h-full">
                      {stat.icon}
                    </div>
                  )}
                </div>

                <div className="text-3xl md:text-4xl font-bold text-blue-700">
                  {formatValue(animatedStats[index])}{stat.suffix}
                </div>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;