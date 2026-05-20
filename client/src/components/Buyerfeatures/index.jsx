
import React, { useState } from "react";

/**
 * Replace image paths below as needed:
 * - For CRA: import buyerImg from '../assets/images/buyer-features.webp';
 * - For Vite: const buyerImg = new URL('../assets/images/buyer-features.webp', import.meta.url).href;
 * - Or place images in /public/assets/... and use '/assets/buyer-features.webp'
 */
export default function BuyerSellerFeatures() {
  const [activeTab, setActiveTab] = useState("buyer");
  const [openIndex, setOpenIndex] = useState(null);

  const buyerFeatures = [
    {
      title: "Streamlined checkout",
      desc:
        "Swift checkout process to reduce abandoned carts and ensure an effective sales funnel. Buyers can choose shipping (Standard or Express) and delivery (Home delivery or store pickup).",
    },
    {
      title: "Rewards & Discounts",
      desc:
        "Allow buyers to earn rewards or avail discounts. Buyers can earn rewards on signups and first purchase.",
    },
    {
      title: "Ratings & Reviews",
      desc:
        "Customers can leave ratings and reviews to help others make better decisions and build trust.",
    },
    {
      title: "Smart Recommendations",
      desc:
        "Personalized suggestions to help buyers discover relevant products and increase conversions.",
    },
  ];

  const sellerFeatures = [
    {
      title: "Banner Advertisement",
      desc: "Boost the sales by enabling sellers to use the marketplace homepage to display banner advertisements and send traffic to the promoted product page.",
    },
    {
      title: "Inventory Managment",
      desc:
        "Sorty multi-vendor comes with various email templates that are helpful to keep the admin and sellers notified for events such as out of stock product, shipment success, and more.",
    },
    {
      title: "Order Fulfillment",
      desc:
        "From inventory management to creating shipping labels and delivery, operate all fulfillment operations quickly and accurately with Sorty. The platform enables admin/seller to define fulfillment methods (ship only, pickup only, or both) within the respective dashboard.",
    },
    {
      title: "Private Products",
      desc:"Sellers can add a new product in-case it is not available in the catalog maintained by the admin. After getting approval from the admin, the seller can list the added product.",

    }
    
  ];

  const features = activeTab === "buyer" ? buyerFeatures : sellerFeatures;
  const imageSrc =
    activeTab === "buyer"
      ? "/src/assets/images/buyer-features.webp"
      : "/src/assets/images/seller-new.webp"; 

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
  };

  return (
    <section className="tab-section py-[calc(1rem+4vw)] bg-[#f3f3f3]">
      <div className="container mx-auto px-6 " >
        {/* header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Focused Buyer And Seller Features
          </h2>
          <p className="text-lg text-gray-600">
            Compliment your eCommerce marketplace with tailor-made features that
            cover essential use cases for both user profiles.
          </p>
        </div>

        {/* tabs */}
        <ul className="flex items-center justify-center gap-4">
          <li>
            <button
              type="button"
              onClick={() => {
                setActiveTab("buyer");
                setOpenIndex(null); 
              }}
              className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${
                activeTab === "buyer"
                  ? "bg-white text-[#ee3e5a] shadow"
                  : "text-black hover:text-[#ee3e5a]"
              }`}
            >
              Buyer Features
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setActiveTab("seller");
                setOpenIndex(null);
              }}
              className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${
                activeTab === "seller"
                  ? "bg-white text-[#ee3e5a] shadow"
                  : "text-black hover:text-[#ee3e5a]"
              }`}
            >
              Seller Features
            </button>
          </li>
        </ul>

        {/* tab content two columns */}
        <div className="bg-white mt-8 rounded-md shadow p-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* left: accordion */}
            <div>
              {features.map((item, index) => (
                <div key={index} className="border-b last:border-none">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`panel-${index}`}
                    className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
                  >
                    <h6 className="text-lg font-medium">{item.title}</h6>

                    {/* inline chevron svg (no external dependency) */}
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* animated panel */}
                  <div
                    id={`panel-${index}`}
                    aria-hidden={openIndex !== index}
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                      openIndex === index ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="pb-6 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* right: image */}
            <div className="text-center">
              <img
                src={imageSrc}
                alt={activeTab === "buyer" ? "Buyer features" : "Seller features"}
                className="mx-auto object-contain max-h-[420px]"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <h5 className="text-xl font-medium mb-4">
            Discover All The Essential Features To Take Your Business Online
          </h5>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="inline-block bg-[#ee3e5a] text-white px-5 py-3 rounded-md transition-all duration-300 ease-in-out 
             hover:opacity-85 hover:scale-105"
            >
              Try Sorty
            </a>
            <a href="#" className="text-[#ee3e5a] font-semibold self-center underline">
              View All Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
