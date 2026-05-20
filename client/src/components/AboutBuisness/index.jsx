import React, { useState } from "react";
import Slider from "react-slick";

import elecImg from "../../assets/images/category-electronic-2.webp";
import fashionImg from "../../assets/images/category-fashion-2.webp";
import fashImg from "../../assets/images/category-fashion.webp";
import furnImg from "../../assets/images/category-furniture.webp";
import growcerImg from "../../assets/images/category-growcer.webp";
import handmadeImg from "../../assets/images/category-handmade.webp";
import hardImg from "../../assets/images/category-hardware.webp";
import liImg from "../../assets/images/category-liquor.webp";
import sportImg from "../../assets/images/category-sport.webp";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AboutBusiness() {
  const [current, setCurrent] = useState(0);

  const categories = [
    { img: fashImg, title: "Fashion" },
    { img: elecImg, title: "Electronics" },
    { img: growcerImg, title: "Grocery" },
    { img: furnImg, title: "Furniture" },
    { img: fashionImg, title: "Jewelry" },
    { img: hardImg, title: "Hardware" },
    { img: liImg, title: "Liquor" },
    { img: sportImg, title: "Sports" },
    { img: handmadeImg, title: "Hand-made" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    beforeChange: (oldIndex, newIndex) => setCurrent(newIndex),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-[#151f20] py-16 text-white w-full">
      <div className="w-full px-6">
        {/* Header */}
<div className="max-w-[1140px] mx-auto px-4 mb-12">
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
    <div className="xl:col-span-4">
      <h2 className="text-3xl md:text-4xl font-bold leading-snug">
        Transforming Businesses Across Industries
      </h2>
    </div>
    <div className="xl:col-span-8 flex items-center">
      <p className="text-lg leading-relaxed">
        Drive Operational Improvements and Experience Incremental Growth with
        Sorty — a trusted enterprise solution to start, run and grow your
        online marketplace in B2C, P2P, B2B, and B2B2C industries. Our team
        brings deep industry insights to help businesses thrive amid
        disruptions and stay ahead of the curve.
      </p>
    </div>
  </div>
</div>

        <Slider {...settings} className="w-full">
          {categories.map((cat, index) => {
            const isCenter = index === current % categories.length;

            return (
              <div key={index} className="slider-item px-3">
                <div
                  className={`flex flex-col items-center transition-all duration-500 ${
                    isCenter ? "translate-y-6" : "translate-y-0"
                  }`}
                >
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className={`w-full h-[260px] object-cover mx-auto rounded-lg transition-all duration-500 ${
                      isCenter
                        ? "opacity-100 scale-105"
                        : "opacity-60 scale-95"
                    }`}
                  />
                  <h6
                    className={`mt-3 text-lg font-semibold transition-all ${
                      isCenter ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {cat.title}
                  </h6>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
