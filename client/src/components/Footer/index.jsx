import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import dayjs from "dayjs";

export default function Footer() {
  const footerData = [
    {
      title: "Solutions",
      links: [
        "B2C Marketplace Software",
        "B2B Marketplace Software",
        "Multi-Vendor Software",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Contact Us"],
    },
    {
      title: "Resources",
      links: ["Blog", "Help Center", "Tutorials"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms & Conditions", "Site Map"],
    },
    {
      title: "Products",
      links: ["Sorty Enterprise", "Sorty SaaS", "Sorty Mobile App"],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <footer className="bg-[#151f20] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {footerData.map((col, index) => (
            <div key={index}>
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center py-3 lg:py-0 lg:cursor-default font-bold text-lg lg:text-white mb-2"
              >
                {col.title}
                <ChevronDown
                  className={`lg:hidden w-5 h-5 text-gray-300 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                />
              </button>


              <ul
                className={`overflow-hidden transition-all duration-300 lg:overflow-visible lg:max-h-full ${openIndex === index ? "max-h-40 py-2" : "max-h-0"
                  }`}
              >
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-1 lg:py-0">
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-6 mt-12">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Site Map
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms & Conditions
              </a>
            </div>

            <div className="flex space-x-4 mt-2">                        <a href="#" className="text-gray-400 hover:text-white">                   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">                     <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.324v21.351C0 23.407.595 24 1.325 24h11.495v-9.294H9.69V11.01h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.324C24 .592 23.405 0 22.675 0z" />                   </svg>                 </a>                 {/* LinkedIn */}                 <a href="#" className="text-gray-400 hover:text-white">                   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">                     <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.208 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.225 0zM7.06 20.452H3.555V9h3.505v11.452zM5.307 7.648c-1.121 0-2.03-.912-2.03-2.036 0-1.122.908-2.034 2.03-2.034s2.03.912 2.03 2.034c0 1.124-.909 2.036-2.03 2.036zm14.64 12.804h-3.504v-5.603c0-1.337-.026-3.062-1.867-3.062-1.868 0-2.154 1.459-2.154 2.967v5.698H9.372V9h3.364v1.561h.048c.468-.888 1.608-1.827 3.31-1.827 3.538 0 4.19 2.33 4.19 5.358v6.9z" />                   </svg>                 </a>                 {/* Twitter */}                 <a href="#" className="text-gray-400 hover:text-white">                   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">                     <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482C7.69 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.903 4.903 0 0 1-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827a4.902 4.902 0 0 1-2.224.084c.627 1.956 2.444 3.379 4.6 3.419a9.868 9.868 0 0 1-6.102 2.104c-.395 0-.787-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.056 0 14.002-7.496 14.002-13.986 0-.21-.004-.423-.014-.634A9.936 9.936 0 0 0 24 4.557z" />                   </svg>                 </a>                 {/* Instagram */}                 <a href="#" className="text-gray-400 hover:text-white">                   <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.772.131 4.603.39 3.635 1.358 2.666 2.327 2.407 3.496 2.348 4.776.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.059 1.28.318 2.449 1.287 3.418.969.969 2.138 1.228 3.418 1.287 1.28.059 1.689.072 4.948.072s3.668-.013 4.948-.072c1.28-.059 2.449-.318 3.418-1.287.969-.969 1.228-2.138 1.287-3.418.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.28-.318-2.449-1.287-3.418-.969-.969-2.138-1.228-3.418-1.287C15.668.013 15.259 0 12 0z" />                     <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />                     <circle cx="18.406" cy="5.594" r="1.44" />                   </svg>                 </a>
            </div>

            <div className="flex flex-col items-center lg:items-start space-y-2">
              <p className="text-gray-500 text-center lg:text-left text-sm">
                &copy; {dayjs().year()} Sorty. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}