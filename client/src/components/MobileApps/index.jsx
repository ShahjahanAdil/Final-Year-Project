import React from "react";
import appImg from "../../assets/images/mobile-apps.webp";

export default function MobileApps() {
  return (
    <section className="bg-[#f3f3f3] p-[calc(1rem+4vw)]">
      <div className="max-w-[1800px] mx-auto px-[calc(1rem+2vw)]">
    
        <div className="flex flex-col lg:flex-row items-center justify-around">
          
          {/* Image Column */}
          <div className="w-full lg:w-5/12 px-2 mb-8 lg:mb-0">
            <div className="text-center lg:text-left">
              <img
                className="block h-auto w-auto mx-auto lg:mx-0"
                src={appImg}
                alt="Sorty Mobile Apps"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-7/12 px-2">
            <div className="pb-[clamp(2rem,3.5vw,3.5rem)] mx-auto">
              <h2 className="mb-4 text-2xl lg:text-3xl font-semibold">
                Sorty Mobile Apps ― Augment eCommerce experience
              </h2>
              <p className="font-light text-[calc(112.5%+0.24vw)] leading-relaxed text-[#464646]">
                Offer a complete digital experience with feature-rich Sorty
                mobile apps for Android and iOS platforms. Complement your
                Sorty-powered web app to offer the signature Sorty
                user-experience across devices.
              </p>
            </div>

            <h4 className="mb-3 text-xl font-semibold">
              Buyer&apos;s App (Android and iOS)
            </h4>
            <p className="font-light text-[calc(112.5%+0.24vw)] leading-relaxed text-[#464646] mb-6">
              The buyer-app engages users with an intuitive interface, logical
              workflows, interactive functionality, and robust performance.
            </p>

            {/* Explore More Link */}
            <a href="#"
   class="group inline-flex items-center text-[#EE3E5A] font-bold relative pb-[3px]">
  <span>Explore More</span>
  <span class="ml-2">→</span>

 
  <span class="absolute left-0 -bottom-[2px] w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
</a>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-center text-center mt-12">
          <h5 className="text-lg lg:text-xl font-semibold mb-5">
            Supercharge your Success with Best-in-Class Mobile Apps
          </h5>
          <a
            href="#homepage-mobile"
            className="inline-block bg-[#EE3E5A] text-white px-6 py-3 rounded-md font-medium shadow-md transition-all duration-300 hover:opacity-90 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
