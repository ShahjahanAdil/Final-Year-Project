import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import liImg from "../../assets/images/liquor-thumbnail.webp";
import auctionImg from "../../assets/images/auction-marketplace-thumbnal.webp";
import b2bImg from "../../assets/images/b2b-blog.webp";
import strImg from "../../assets/images/stripe-blog.webp";
import eggaImg from "../../assets/images/egg-paradox.webp";
import queriesImg from "../../assets/images/queries-answered.webp";
import digitalImg from "../../assets/images/bg-digital-goods-marketplace.webp";

export default function GuideSection() {
  const guides = [
    { img: liImg, title: "The Ultimate Guide To Launch Liquor And Wine eCommerce Marketplace", link: "#" },
    { img: auctionImg, title: "Auction Marketplace Guide: Build & Scale", link: "#" },
    { img: b2bImg, title: "B2B Marketplace Blog: Essential Strategies", link: "#" },
    { img: strImg, title: "Stripe Integration For Multi-Vendor Marketplaces", link: "#" },
    { img: eggaImg, title: "The Egg Paradox in Marketplace Growth", link: "#" },
    { img: queriesImg, title: "Top Queries Answered for Marketplace Startups", link: "#" },
    { img: digitalImg, title: "Digital Marketplace Trends for 2025", link: "#" },
  ];

  const [startIndex, setStartIndex] = useState(0);

  // Responsive items per view
  const getItemsPerView = () => {
    if (window.innerWidth >= 1024) return 3; // lg and above
    if (window.innerWidth >= 768) return 2; // md to lg
    return 1; // sm
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Update itemsPerView on window resize
  React.useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (startIndex + itemsPerView < guides.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Section */}
          <div>
            <h2 className="text-[28px] font-bold text-gray-900 mb-4 leading-snug">
              Resource - Guides & Blogs To Help Set Up A Multi Vendor Marketplace
            </h2>
            <p className="text-gray-600 mb-6 text-[15px] leading-relaxed">
              Presenting collection of extensive guides to help expand your
              knowledge for setting up an eCommerce marketplace & capture the
              growth by investing in the right capabilities.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-semibold text-[15px] text-[var(--primary)] underline hover:opacity-80"
            >
              Explore All Guides →
            </a>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="flex gap-6 overflow-hidden">
                {guides.slice(startIndex, startIndex + itemsPerView).map((guide, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    <img src={guide.img} alt={guide.title} className="w-full h-[200px] object-cover" />
                    <div className="p-4 flex flex-col justify-between h-[160px]">
                      <p className="text-gray-800 font-medium text-[14px] leading-snug mb-3">
                        {guide.title}
                      </p>
                      <a
                        href={guide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] font-semibold text-[var(--primary)] underline hover:opacity-80 mt-auto"
                      >
                        Read this Guide →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Chevron Buttons */}
              <div className="flex justify-center gap-6 mt-8">
                <button
                  onClick={prevSlide}
                  disabled={startIndex === 0}
                  className="p-3 rounded-full bg-gray-200 text-gray-700 hover:text-[var(--primary)] hover:bg-gray-300 disabled:opacity-50 transition"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={startIndex + itemsPerView >= guides.length}
                  className="p-3 rounded-full bg-gray-200 text-gray-700 hover:text-[var(--primary)] hover:bg-gray-300 disabled:opacity-50 transition"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

