import React from "react";
import "./HomePageService.css";

import fashImg from "../../assets/images/fashion.webp";
import furnImg from "../../assets/images/furniture.webp";
import elecImg from "../../assets/images/electronics.webp";
import sportsImg from "../../assets/images/sports.webp";
import liquorImg from "../../assets/images/liqour.webp";
import digImg from "../../assets/images/digital-products.webp";
import pharmImg from "../../assets/images/pharmacy.webp";
import auctImg from "../../assets/images/auction-marketplace.webp";
import groceImg from "../../assets/images/grocery-marketplace.webp";

export default function HomePageService() {
  const cards = [
    { img: fashImg, title: "Fashion", desc: "From industry leaders like ASOS to Zalando, fashion thrives with diversity. Our software empowers building a stylish marketplace tailored for fashion, showcasing trends, and enhancing the shopping experience effortlessly." },
    { img: furnImg, title: "Furniture", desc: "With IKEA's innovation as inspiration, our software helps furnish a digital storefront for artisans and buyers. Seamlessly display designs, manage inventory, and engage customers for a streamlined shopping journey." },
    { img: elecImg, title: "Electronics", desc: "Build an online hub connecting gadget enthusiasts to cutting-edge electronics products. We empower to create an electronics marketplace like Newegg, enabling sleek showcases, inventory precision, and effortless transactions." },
    { img: sportsImg, title: "Sports", desc: "Score big in the sports retail game. Our solution empowers to create a platform addressing vendors' and enthusiasts' needs, leveraging responsive design and features to effortlessly display sports equipment." },
    { img: liquorImg, title: "Liquor", desc: "Build a liquor marketplace like Vivino Inc. with Sorty. Our software enables to launch an age-gated, user-friendly liquor store, complying with regulations while offering a rich shopping experience." },
    { img: digImg, title: "Digital Products", desc: "Our software, Sorty, enables building a digital products marketplace meeting the digital age demands like Envato. Effortlessly sell creative assets, ensuring secure digital transactions and downloads." },
    { img: pharmImg, title: "Pharmacy", desc: "The global pharmaceuticals industry is experiencing a significant rise. Its numbers are increasing interestingly and show potential. Startups and enterprises can easily capture the market by building an online marketplace." },
    { img: auctImg, title: "Auction Marketplace", desc: "The convenience, accessibility, transparency and wider reach have increased the demand for online auction marketplaces. Therefore, launching an auction marketplace can be an excellent start. Explore how Sorty can help." },
    { img: groceImg, title: "Grocery Marketplace", desc: "According to eMarketer, online grocery sales are expected to surpass the apparel and accessories category by 2026. Its success is driven by convenience, quick delivery, deals and discounts offered by marketplaces." },
  ];

  return (
    <section className="py-[calc(1rem+4vw)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Sorty is best fit for a Multitude of eCommerce Niches
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We provide industry-specific multi-vendor solutions tailored to your
            business needs so that you can stay ahead in the competitive
            eCommerce landscape.
          </p>
        </div>

        {/* Cards Wrapper */}
        <div className="flex flex-wrap justify-between -mb-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative w-full sm:w-[48%] md:w-[32%] mb-8 overflow-hidden rounded-lg"
            >
              {/* Card Image */}
              <img
                src={card.img}
                alt={card.title}
                className="w-[447px] h-[297px] object-cover mx-auto transition-transform duration-300 group-hover:scale-105"
              />

              {/* Default Overlay with Title */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg md:text-xl font-medium">
                {card.title}
              </div>

              {/* Hover Content Overlay */}
              <div className="absolute inset-0 bg-white/95 text-gray-800 p-6 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm md:text-base text-center leading-relaxed">
                  {card.desc}
                </p>
                <a
                  href="#"
                  className="mt-3 bg-[#EE3E5A] text-white border-2 border-transparent rounded-md px-6 py-2 text-sm font-semibold inline-flex justify-center items-center capitalize whitespace-nowrap hover:bg-white hover:text-[#EE3E5A] hover:border-[#EE3E5A] transition-colors"
                >
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Button Section */}
      <div className="newBtn cta text-md-center cta-pt-4 m-10 text-center">
        <h5>Explore pricing plans that fit your needs.</h5>
        <a
          href=""
          id="homepage-niches"
          className="m-8 bg-[#EE3E5A] text-white border-2 border-transparent rounded-md px-6 py-2.5 text-base font-semibold inline-flex justify-center items-center capitalize whitespace-nowrap hover:bg-white hover:text-[#EE3E5A] hover:border-[#EE3E5A] transition-colors"
        >
          See Pricing
        </a>
      </div>
    </section>
  );
}


