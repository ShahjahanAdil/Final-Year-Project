import React from "react";
import processImg from "../../assets/images/methodology.svg";

export default function ProcessSection() {
  return (
    <section className="py-[calc(2rem+3vw)]">
      <div className="container mx-auto max-w-[1500px] px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ecommerce Capability Building Process We Follow for Large Enterprises
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We educate our clients to avoid a big kitchen-sink eCommerce web
            application. Using design thinking and agile methodology, we make a
            series of small incremental updates by executing two-three weeks
            sprints and deliver the marketplace minimum viable product (MVP).
          </p>
        </div>

        <div className="flex justify-center mb-6 relative">
          <img
            loading="lazy"
            src={processImg}
            alt="ecommerce process"
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex justify-center">
          <div className="text-center max-w-2xl">
            <h5 className="text-lg md:text-xl font-medium mb-4">
              Reduce the Time-to-Market with our Agile and Flexible Development Process
            </h5>
            <a
              href="#"
              id="homepage-agile"
              className="inline-block bg-[#ee3e5a] text-white px-6 py-3 rounded-md font-medium transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-105"
            >
              Let&apos;s Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
