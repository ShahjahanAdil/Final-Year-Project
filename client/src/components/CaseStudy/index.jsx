import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import uniImg from "../../assets/images/case-study-diamond.webp";
import voyImg from "../../assets/images/case-study-voyij.webp";
import liquorImg from "../../assets/images/case-study-liquor.webp";
import proImg from "../../assets/images/procure-net.webp";

const caseStudies = [
  {
    id: 1,
    company: "Uni-Diamonds",
    title: "Online B2B Diamond Trading Marketplace",
    description:
      "UNI is a diamond B2B trading eCommerce marketplace that enables the buyer to search, compare, value, bid, and buy diamonds.",
    image: uniImg,
    link: "#",
  },
  {
    id: 2,
    company: "Voyij",
    title: "Tour And Activities Online Marketplace",
    description:
      "Voyij is a tour and activities marketplace built using Sorty to connect travelers to local owners offering lifetime experiences in Alaska.",
    image: voyImg,
    link: "#",
  },
  {
    id: 3,
    company: "ProcureNet",
    title: "Redefining B2B Healthcare Sector Globally",
    description:
      "Procurenet empowers manufacturers and buyers in the healthcare sector. Sorty played a pivotal role in supporting this ecosystem.",
    image: proImg,
    link: "#",
  },
  {
    id: 4,
    company: "LiquorPro",
    title: "B2B Liquor Selling Platform",
    description:
      "A world-leading brewing company partnered with us to develop a B2B liquor selling platform, improving transparency in the liquor distribution market.",
    image: liquorImg,
    link: "#",
  },
];

export default function CaseStudySection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? caseStudies.length - 1 : prev - 1
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentCase = caseStudies[currentIndex];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            Custom Made Marketplaces Delivered by{" "}
            <span className="text-[var(--primary)]">Sorty</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--text)]">
            Industry leading enterprises worldwide choose Sorty for its
            capabilities such as ready-to-launch self-hosted platform and
            extensive customization.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 items-center gap-8">
            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-4">
              <h6 className="text-sm uppercase text-[var(--primary)] font-semibold">
                {currentCase.company}
              </h6>
              <h4 className="text-2xl font-bold text-[var(--text)]">
                {currentCase.title}
              </h4>
              <p className="text-[var(--text)]">{currentCase.description}</p>
              <a
                href={currentCase.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-[var(--primary)] font-bold hover:underline"
              >
                Read Case Study →
              </a>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <img
                src={currentCase.image}
                alt={currentCase.company}
                className="rounded-lg shadow-lg w-full h-[350px] object-cover"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border hover:bg-[var(--primary)] hover:text-white transition"
            >
              <ChevronLeft />
            </button>
            <div className="flex space-x-2">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    i === currentIndex
                      ? "bg-[var(--primar)] scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border hover:bg-[var(--primary)] hover:text-white transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
