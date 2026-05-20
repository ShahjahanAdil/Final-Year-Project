import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import partnerImg from "../../assets/images/partner.webp";

export default function BuyerApp() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Become A White Label Partner With Sorty",
      content: (
        <div>
          <p className="mb-6 text-base leading-relaxed text-[--text]">
            Resell our solution under your brand name. Our white label program
            enables you to focus on selling the eCommerce solution & controlling
            the profits while we stay anonymous. Sorty team will be your
            outsourcing and final deployment partner.
          </p>
          <ul className="mb-6 space-y-2 text-base text-[--text] font-bold">
            <li>- Pay Once, Own Forever</li>
            <li>- Launch Your Brand Marketplace</li>
            <li>- Customize As Required</li>
          </ul>
          <div className="flex flex-col gap-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#EE3E5A] text-white px-6 py-3 rounded-md font-semibold shadow-md transition-transform duration-300 hover:opacity-90 hover:scale-105"
            >
              Join White-label Program
            </a>
            <span className="text-xs text-[--text]">
              Note: Sorty is the Product Of FATbit Technologies
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Join Sorty Reseller Program",
      content: (
        <div>
          <p className="mb-6 text-base leading-relaxed text-[--text]">
            As a reseller, you can promote Sorty and earn commission. Focus on
            growing your network while we handle the product and deployment.
          </p>
          <ul className="mb-6 space-y-2 text-base text-[--text] font-bold">
            <li>- Attractive Commission Structure</li>
            <li>- Dedicated Support</li>
            <li>- Scalable Growth</li>
          </ul>
          <div className="flex flex-col gap-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#EE3E5A] text-white px-6 py-3 rounded-md font-semibold shadow-md transition-transform duration-300 hover:opacity-90 hover:scale-105"
            >
              Join White-label Program
            </a>
            <span className="text-xs text-[--text]">
              Note: Sorty is the Product Of FATbit Technologies
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src={partnerImg}
            alt="white partnership"
            className="max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-4xl font-bold mb-10">
            Sorty Partnership Programs
          </h2>

          {/* Accordion */}
          <div className="space-y-6">
            {accordionData.map((item, index) => (
              <div key={index} className="rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-5 text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100"
                >
                  <span>{item.title}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-5 bg-white">{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
