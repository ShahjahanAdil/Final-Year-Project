import React, { useState } from "react";
import thumbnailImg from "../../assets/images/video.jpg"; 

export default function Customization() {
  const [videoUrl, setVideoUrl] = useState("");

  const runVideo = (url) => setVideoUrl(url);

  return (
    <section className="section p-[calc(1rem+4vw)]">
      <div className="container">
        <div className="border md:border md:border-[#dee2e6] p-4 sm:p-6 md:p-8 lg:p-10">

          {/* Top Row: Text + Video */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Text */}
            <div className="xl:w-5/12 lg:w-6/12 w-full">
              <h2 className="text-2xl font-bold mb-4">
                Scale-up with an Endless Array of Customizations
              </h2>
              <p className="mb-6">
                Continuously relying on a legacy system or avoiding digitization comes at a price. 
                To achieve rapid transformative change, SMBs & large enterprises can embrace 
                customizing our multivendor eCommerce platform.
              </p>
            </div>

            {/* Right Video */}
            <div className="xl:w-7/12 lg:w-6/12 w-full flex justify-center">
              <div className="relative w-full max-w-[60%] h-[300px] lg:h-[360px] rounded-lg overflow-hidden shadow-lg">
                {videoUrl ? (
                  <iframe
                    className="w-full h-full"
                    src={`${videoUrl}?autoplay=1&mute=1`}
                    title="YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={thumbnailImg}
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        runVideo("https://www.youtube.com/embed/PsxHrGIlJgQ")
                      }
                      className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#EE3E5A] text-xl shadow-lg hover:scale-110 transition"
                    >
                      ▶
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Features */}
          <div className="mt-8 w-full">
            <div className="flex flex-wrap gap-6 justify-center md:justify-between">
              
              <div className="flex flex-col items-center text-center p-4 rounded min-w-[140px] flex-none">
                <img src="/src/assets/images/web-app.svg" alt="Web App" className="w-12 h-12 mb-2" />
                <h6 className="text-sm font-semibold">
                  Custom Web <br /> App Development
                </h6>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded min-w-[140px] flex-none">
                <img src="/src/assets/images/vertical.svg" alt="Feature" className="w-12 h-12 mb-2" />
                <h6 className="text-sm font-semibold">
                  Vertical <br /> Specific Design
                </h6>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded min-w-[140px] flex-none">
                <img src="/src/assets/images/custom.svg" alt="Feature" className="w-12 h-12 mb-2" />
                <h6 className="text-sm font-semibold">
                  Custom <br /> Feature Integration
                </h6>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded min-w-[140px] flex-none">
                <img src="/src/assets/images/api.svg" alt="Feature" className="w-12 h-12 mb-2" />
                <h6 className="text-sm font-semibold">
                  3rd Party <br /> API Integration
                </h6>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded min-w-[140px] flex-none">
                <img src="/src/assets/images/backend.svg" alt="Feature" className="w-12 h-12 mb-2" />
                <h6 className="text-sm font-semibold">
                  Extra Backend <br /> Functionalities
                </h6>
              </div>

            </div>

            <div className="mt-8 text-center">
              <h5 className="mb-4">Turn the Ideas into Realities with our Extensive Customization</h5>
              <a
                href=""
                id="homepage-custom"
                className="inline-block bg-[#ee3e5a] text-white px-5 py-3 rounded-md transition-all duration-300 ease-in-out hover:opacity-85 hover:scale-105"
              >
                Get in touch
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

