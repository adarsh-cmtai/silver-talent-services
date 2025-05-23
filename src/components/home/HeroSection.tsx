import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // ---------------------------------------------------------------------------
  // CRITICAL STEP 1: Update this URL
  // ---------------------------------------------------------------------------
  // Replace this placeholder with the ACTUAL path to your
  // "computer with magnifying glass" image.
  // Example: If 'computer-background.jpg' is in your 'public' folder,
  // it would be: const desiredBackgroundUrl = "/computer-background.jpg";
  // Example: If it's in 'public/images/', it would be: const desiredBackgroundUrl = "/images/computer-background.jpg";
  const desiredBackgroundUrl = "/image/image 2.png"; // << **** REPLACE THIS ****

  // ---------------------------------------------------------------------------
  // CRITICAL STEP 2: Ensure this image is a TRANSPARENT PNG
  // ---------------------------------------------------------------------------
  // The image specified by foregroundIllustrationUrl ("/image/image 2.png")
  // MUST have a transparent background for the desiredBackgroundUrl to show through.
  // If it's a JPG or an opaque PNG, this effect will not work.
  const foregroundIllustrationUrl = "/image/image 2.png"; // Make sure this is in public/image/image 2.png AND is transparent


  return (
    <section className="pt-20 pb-16 md:pt-10 md:pb-9 bg-white shadow-2xl"> {/* Main section is white */}

     <div
        className="absolute inset-y-0 right-0 w-full md:w-3/4 lg:w-2/3 xl:w-3/5 -z-0"
        aria-hidden="true"
      >
        <div
          className="h-[14%] bg-sky-100" // Light blue background
          style={{
            clipPath:
              "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)", // Creates a slanted left edge
              // On smaller screens, this might need adjustment or a different approach.
              // e.g. on mobile when layout is stacked. This polygon is more for desktop.
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="animate-fade-in text-center lg:text-left z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              We are building a new way of hiring. Join us as we revolutionize talent acquisition
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              We are making hiring talent right a norm. At <span className="font-semibold text-sky-600">Silver Talent Services</span>, we
              get to work each day to help people have a simpler and smoother access to better jobs so they can fall in
              love with what they do, just like us.
            </p>
            <Button 
              asChild 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md uppercase text-sm tracking-wider transition-colors duration-300"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Right Column: Image with custom shaped background */}
          {/* Desktop Image */}
          <div className="hidden lg:flex justify-center items-center animate-slide-in-right">
            <div 
              style={{ 
                position: 'relative', 
                maxWidth: '500px', 
                display: 'inline-block', // So it wraps the content
                // border: '1px solid red', // Temporary: for debugging the container
              }}
            >
              {/* The "computer/magnifying glass" image as the background layer */}
              {desiredBackgroundUrl !== "/image/image 2.png" && ( // Render only if URL is updated
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('${desiredBackgroundUrl}')`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    borderRadius: '0.5rem', 
                    zIndex: 1, 
                    // border: '1px dashed blue', // Temporary: for debugging the background div
                  }}
                ></div>
              )}
              {/* The "people analyzing charts" illustration (MUST BE TRANSPARENT PNG) */}
              <img 
                src={foregroundIllustrationUrl} 
                alt="Recruitment process illustration" 
                className="rounded-lg max-w-full h-96"
                style={{ 
                  maxWidth: '570px', 
                  display: 'block',
                  position: 'relative', 
                  zIndex: 2, 
                }} 
              />
            </div>
          </div>
          
          {/* Mobile Image */}
          <div className="lg:hidden flex justify-center items-center mt-10 animate-fade-in">
            <div 
              style={{ 
                position: 'relative', 
                maxWidth: '400px',
                display: 'inline-block',
                // border: '1px solid red', // Temporary: for debugging the container
              }}
            >
              {desiredBackgroundUrl !== "/image/image 2.png" && ( // Render only if URL is updated
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('${desiredBackgroundUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '0.5rem',
                    zIndex: 1,
                    // border: '1px dashed blue', // Temporary: for debugging the background div
                  }}
                ></div>
              )}
              <img 
                src={foregroundIllustrationUrl}
                alt="Recruitment process illustration" 
                className="rounded-lg max-w-full h-auto shadow-md"
                style={{ 
                  maxWidth: '400px', 
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;