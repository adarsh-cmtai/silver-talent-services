// src/pages/Services.tsx
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'; // For navigation to detail pages
import {
  ArrowRight,
  Users,
  Target,
  Award,
  Shield,
  Zap,
  Heart,
  Building2,
  Briefcase,      // Recruitment Services
  UserCheck,      // Executive Search
  Users2 as LucideUsers2, // Staffing Services (renamed to avoid conflict)
  Settings2,      // HR Outsourcing
  Calculator,     // Payroll Services
  BookOpen,       // Training & Development
  ChevronRight    // For "Read More" link
} from 'lucide-react';
import { FaUsersCog } from 'react-icons/fa'; // For the services section heading

// CSS for scroll animations (add to your global CSS file e.g., src/globals.css or src/index.css)
/*
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.animate-on-scroll.animated {
  opacity: 1;
  transform: translateY(0);
}
*/

// Type definitions (optional, but good for TypeScript)
interface ServiceItem {
  id: string;
  icon: React.ElementType; // Lucide icon components are of this type
  title: string;
  content: string[];
  delay: string;
}

interface StatItem {
  number: string;
  label: string;
  icon: React.ElementType;
}

const servicesContent: ServiceItem[] = [
  {
    id: "recruitment-services",
    icon: Briefcase,
    title: "Recruitment Services",
    content: [
      "Silver Talent is a trusted name in recruitment, specializing in both IT and Non-IT hiring solutions. Leveraging advanced technology and a client-first approach, we develop customized strategies tailored to your specific workforce needs.",
      "With deep expertise and insight into evolving market dynamics, we excel at identifying and recommending top-tier talent that aligns with your business goals. As a respected recruitment partner, we offer end-to-end solutions—including sourcing, screening, interviewing, and placement—ensuring efficient and impactful hiring to drive your company’s success.",
      "As a leading placement consultancy, we go beyond the active job market to engage high-caliber professionals, ensuring that our clients connect with the right talent—not just those currently seeking new opportunities. Our process is private, efficient, cost-effective, and time-sensitive."
    ],
    delay: "0s",
  },
  {
    id: "executive-search",
    icon: UserCheck,
    title: "Executive Search",
    content: [
      "Silver Talent Services is a premier recruitment agency with deep expertise in hiring CXO, business heads, and senior functional leaders. Renowned for our exclusive Executive Search practice, we specialize in recruiting medium to high-level executives across IT and non-IT sectors. Our expert consultants help businesses grow by identifying and placing top industry-ready talent, fostering agile and diverse organizations capable of meeting strategic goals.",
      "With decades of proven experience, Silver Talent Services blends deep industry knowledge with an extensive professional network to deliver outstanding recruitment, staffing, and HR services. Our approach is powered by continuous market research, talent strategy insights, and a commitment to excellence.",
      "What sets Silver Talent Services apart is our research-led Executive Search model combined with a personalized, high-touch approach to candidate engagement. From multinational corporations to startups, our team consistently delivers exceptional results, meeting even the most complex and niche talent needs."
    ],
    delay: "0.2s",
  },
  {
    id: "staffing-services",
    icon: LucideUsers2,
    title: "Staffing Services",
    content: [
      "At Silver Talent, we specialize in providing top-tier Staffing Services, Whether you require short-term staffing solutions or long-term workforce management.",
      "At Silver Talent, we understand that the foundation of every successful organization lies in the strength of its people. Our Staffing Services are designed to equip your business with the right talent to thrive in today’s competitive landscape.",
      "As a leading Staffing Company, we serve as your trusted partner in identifying and placing top-tier professionals who drive innovation and performance. Our experienced team takes the time to understand your unique hiring needs, delivering customized staffing solutions that align perfectly with your business goals."
    ],
    delay: "0.4s",
  },
  {
    id: "hr-outsourcing",
    icon: Settings2,
    title: "HR Outsourcing",
    content: [
      "Silver Talent provides end-to-end Outsourcing Services aimed at boosting operational efficiency, cutting costs, and propelling your business growth.",
      "Silver Talent is a premier Recruitment and HR Consulting firm with a pan-India presence, committed to helping businesses unlock the full potential of their workforce. We understand that people are a company’s most valuable asset—key to driving success, shaping culture, and achieving long-term growth.",
      "Our expert team delivers end-to-end HR solutions, including recruitment, training, workforce planning, succession mapping, compliance, and compensation strategy. With deep industry knowledge and a strategic approach, we tailor solutions that attract, develop, and retain top talent.",
      "Recognized both in India and globally, Silver Talent is your trusted partner for building high-performing teams and future-ready organizations."
    ],
    delay: "0.6s",
  },
  {
    id: "payroll-services",
    icon: Calculator,
    title: "Payroll Services",
    content: [
      "At Silver Talent, we specialize in delivering customized Third-Party Payroll Services designed to support the diverse needs of businesses across various industries. Our solutions simplify complex payroll management—whether it's for temporary staff, seasonal hires, or remote teams.",
      "By partnering with trusted third-party payroll providers, Silver Talent ensures a smooth and compliant process for workforce management. From onboarding to salary processing and statutory compliance, we handle every aspect efficiently, allowing you to focus on your core operations while we manage your payroll with precision and care."
    ],
    delay: "0.8s",
  },
  {
    id: "training-development",
    icon: BookOpen,
    title: "Training & Development",
    content: [
      "Training and development are fundamental pillars of human resource management, focused on enhancing the skills, knowledge, and competencies of employees across all levels of an organization. These initiatives are not only crucial for boosting individual performance but also play a vital role in driving overall organizational growth, adaptability, and long-term success. By investing in continuous learning, companies can foster innovation, improve employee retention, and build a resilient workforce ready to meet evolving business challenges.",
      "At Silver Talent, we design and deliver tailored training and development programs that empower your teams to reach their full potential. From technical upskilling to leadership development, our solutions are strategically aligned with your business objectives—ensuring that your talent grows in tandem with your organization."
    ],
    delay: "1s",
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Services | Silver Talent";
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, { threshold: 0.1 });

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


  const stats: StatItem[] = [
    { number: "500+", label: "Companies Empowered", icon: Building2 },
    { number: "10k+", label: "Talent Successfully Placed", icon: Users },
    { number: "98%", label: "Client Satisfaction Rate", icon: Heart },
    { number: "24/7", label: "Dedicated Support", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#111827] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-medium">Trusted by 500+ Companies</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Comprehensive Talent & HR Solutions for Your Business Growth
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Silver Talent offers a full spectrum of services from recruitment and executive search to staffing, HR outsourcing, payroll, and strategic training & development, all designed to meet your unique business needs.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 px-8">
                Explore Our Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-white shadow-xl border-0">
              <div className="flex items-center gap-4">
                <div className="bg-sky-50 p-3 rounded-lg">
                  <stat.icon className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center gap-3 mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
              Empowering Your Business with Outstanding Talent Solutions
            </h2>
            <FaUsersCog className="text-sky-600 w-10 h-10 md:w-12 md:h-12 mt-2" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4">
                Discover our comprehensive range of talent solutions designed to help your business thrive.
            </p>
          </div>

          <div className="space-y-8">
            {servicesContent.map((service) => { // No index needed if not used as key
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id} // Use unique service.id as key
                  className="animate-on-scroll bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border-gray-300 rounded-xl overflow-hidden"
                  style={{ animationDelay: service.delay }}
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-4">
                      {IconComponent && (
                        <div className="bg-sky-100 p-4 rounded-full mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                          <IconComponent className="w-10 h-10 text-sky-600" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                      </div>
                    </div>
                    
                    <div className="text-gray-700 text-base space-y-3 text-left leading-relaxed">
                      <p>
                        {service.content[0].substring(0, 200)}
                        {service.content[0].length > 200 ? "..." : ""}
                      </p> 
                    </div>

                    <div className="mt-6 text-center md:text-right">
                      <Link to={`/services/${service.id}`} state={{ from: location.pathname }}>
                        <Button
                          variant="link"
                          className="text-sky-600 hover:text-sky-700 font-semibold text-base group"
                        >
                          Read More
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-sky-50 rounded-full text-sky-600 font-medium mb-4">
              Why Partner with Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Silver Talent Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover how our comprehensive approach and dedicated experts can elevate your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Users className="w-10 h-10 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">Our seasoned professionals bring deep expertise across the full spectrum of talent and HR services, from recruitment to payroll and development.</p>
            </div>
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Target className="w-10 h-10 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customized Approach</h3>
              <p className="text-gray-600 leading-relaxed">Our solutions, from executive search to HR outsourcing, are tailored to your specific business needs and organizational culture.</p>
            </div>
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-10 h-10 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Efficient & Responsive</h3>
              <p className="text-gray-600 leading-relaxed">Experience swift, effective service delivery, ensuring your talent and HR requirements are met with speed and precision.</p>
            </div>
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <Award className="w-10 h-10 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Results-Driven Partnership</h3>
              <p className="text-gray-600 leading-relaxed">We are committed to delivering measurable outcomes, helping you build a stronger workforce and achieve your strategic business goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting servicesContent so it can be imported by ServiceDetailPage.tsx
// If ServiceDetailPage.tsx fetches this data or has it defined internally, this export is not strictly necessary from here.
export { servicesContent };
export default Services;