// import React from 'react'

// export default function TestimonialSection() {
//   return (
//     <div>
//       <section>
//         <div className="container">
//           <div className='testimonial grid'>
//              <div className="testimonial-header">
//               <h2>Clients' Testimonials that Depict our Commitment to Success</h2>
//              </div>
//              <div className="testimonial-body">
//               <div className='js-testimialSlider testimonial-slider slick-initialized slick-slider'>
//                 <div aria-live='polite' className='slick-list draggable'>
//                   <div className='slick-track' role='listbox'>
//                     <div className='slick-slide slick-cloned' tabIndex={-1} role='option' aria-describedby='slicks-lide222'id='aria-hidden-true'>
//                       <div className='testimonial__detail'>
//                         <p className='p--large'>
//                           The team has been very efficient in their support. Their expertise is outstanding.
//                     1-year technical support was one of the factors and design of the GoQuick package. In our opinion,
//                     the GoQuick package is more user-friendly than the competitors even if it did take some time to get
//                     used to. I appreciate that I was able to make changes to suit my requirements while giving me the
//                     option to include all of the functions at a later stage. Also, I am very happy with the marketing
//                     work that has been done.
//                         </p>
//                         <div className='testimonial-provider'>Prabashnee Naidoo (Managing Director) - Samsyn</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//              </div>
//              <div className="testimonial-footer">
//               <div className='testimonial-arrow'>
//                 <a className='slider-btn prev-btn' href='javascript:void(0)'></a>
//                 <a className='slider-btn next-btn' href='javascript:void(0)'></a>
//               </div>
//              </div>
//              <div className="yokart-video-popup" id='videoHtml'></div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import tiImg from "../../assets/images/tinash-video-thumbnail.webp";
import homeImg from "../../assets/images/video-thumb-home-1.webp";
import testImg from "../../assets/images/testimonial-video-thumbnail.webp";

const testimonials = [
  {
    id: 1,
    text: "The team has been very efficient in their support. Their expertise is outstanding. 1-year technical support was one of the factors and design of the GoQuick package. In our opinion, the GoQuick package is more user-friendly than the competitors even if it did take some time to get used to. I appreciate that I was able to make changes to suit my requirements while giving me the option to include all of the functions at a later stage. Also, I am very happy with the marketing work that has been done.",
    author: "Prabashnee Naidoo",
    position: "Managing Director",
    company: "Samsyn",
    videoThumbnail: testImg,
    videoUrl: "https://www.youtube.com/embed/7L0n7JHmkes?rel=0",
    hasVideo: true,
  },
  {
    id: 2,
    text: "Working with this team has transformed our business operations. Their innovative solutions and dedicated support have exceeded our expectations. The implementation was seamless, and the results speak for themselves.",
    author: "Tinashe Chambati",
    position: "Founder",
    company: "Takeyt",
    videoThumbnail: tiImg,
    videoUrl: "https://www.youtube.com/embed/BwY_Kwx0EkY",
    hasVideo: true,
  },
  {
    id: 3,
    text: "The professionalism and dedication of this team is unmatched. From the very beginning, they understood our vision and helped us execute it flawlessly. We are grateful for their partnership.",
    author: "Another Client",
    position: "CEO",
    company: "Example Corp",
    videoThumbnail: homeImg,
    videoUrl: "https://www.youtube.com/embed/t2C_eVqsuVM",
    hasVideo: true,
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 lg:py-16 bg-[#f3f3f3]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="testimonial-header relative">
              <Quote className="text-[var(--primary)] w-10 h-10 mb-4" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Clients' Testimonials that Depict our Commitment to Success
              </h2>
            </div>

            <div className="testimonial-body">
              <p className="text-base lg:text-lg text-[var(--text)] leading-relaxed mb-4">
                {currentTestimonial.text}
              </p>
              <div>
                <p className="font-semibold text-gray-900">
                  {currentTestimonial.author}
                </p>
                <p className="text-gray-500">
                  {currentTestimonial.position} - {currentTestimonial.company}
                </p>
              </div>
            </div>

            {/* Footer Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prevTestimonial}
                className="w-9 h-9 flex items-center justify-center border-2 border-gray-300 hover:border-[var(--primary)] rounded-full hover:bg-primary hover:border-primary hover:text-[var(--primary)] transition"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-9 h-9 flex items-center justify-center border-2 border-gray-300 hover:border-[var(--primary)] rounded-full hover:bg-primary hover:border-primary hover:text-[var(--primary)] transition"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="relative rounded-xl overflow-hidden shadow-xl max-w-lg mx-auto">
            {currentTestimonial.hasVideo ? (
              <div className="aspect-video relative">
                <img
                  src={currentTestimonial.videoThumbnail}
                  alt={`${currentTestimonial.author} testimonial`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:scale-105 transition flex items-center justify-center"
                    onClick={() => setIsVideoPlaying(true)}
                    aria-label="Play testimonial video"
                  >
                    <Play className="w-7 h-7 ml-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No video available</p>
              </div>
            )}

            {/* Author overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg mb-1">
                {currentTestimonial.author}
              </h3>
              <p className="text-white/80 text-sm">
                {currentTestimonial.position} - {currentTestimonial.company}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <div
        id="videoHtml"
        className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center ${
          isVideoPlaying ? "block" : "hidden"
        }`}
        onClick={() => setIsVideoPlaying(false)}
      >
        <div className="bg-white p-3 rounded-lg max-w-3xl w-full mx-4">
          <div className="aspect-video">
            {currentTestimonial.videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={currentTestimonial.videoUrl}
                title={`${currentTestimonial.author} testimonial video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-gray-600">No video available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
