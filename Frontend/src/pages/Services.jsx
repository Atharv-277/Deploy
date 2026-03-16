import React from "react";
import { Link } from "react-router-dom";
import {
  FaTools,
  FaPaintBrush,
  FaUserTie,
  FaCogs,
  FaChalkboardTeacher,
  FaHeadset,
  FaBullhorn,
  FaLaptopCode,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

// Importing specific images for each service
import i1 from "../assets/hero/i1.jpg";
import c1 from "../assets/hero/c1.jpg";
import ex1 from "../assets/hero/ex1.jpg";
import cu1 from "../assets/hero/cu.jpg";
import u1 from "../assets/hero/u1.jpg";
import t2 from "../assets/hero/t2.jpg";
import ad1 from "../assets/hero/ad1.jpg";
import cms from "../assets/hero/cms.jpg";
import ma1 from "../assets/hero/ma1.jpg";

function Services() {
  const services = [
    {
      title: "Installation Service",
      description:
        "Professional on-site installation ensuring seamless setup and optimal performance of your digital display systems. Our certified technicians handle everything from site survey and mounting to cable management and final calibration, so your screens are ready to go from day one.",
      icon: <FaTools size={28} />,
      image: i1,
      comingSoon: false,
    },
    {
      title: "Creative (Design & Template)",
      description:
        "Custom creative designs and engaging templates tailored to elevate your brand visibility. From eye-catching promotional layouts to interactive menu boards and corporate dashboards, our design team crafts content that captures attention and drives results.",
      icon: <FaPaintBrush size={28} />,
      image: c1,
      comingSoon: false,
    },
    {
      title: "Expert Consultation",
      description:
        "Strategic consultation to help you choose the right display solutions and maximize ROI. Our experts assess your space, audience, and goals to recommend the ideal screen sizes, placements, and content strategies that deliver measurable business impact.",
      icon: <FaUserTie size={28} />,
      image: ex1,
      comingSoon: false,
    },
    {
      title: "Customization & Integration",
      description:
        "Seamless integration with existing systems and tailored customization based on your business needs. Whether it's connecting to your POS, ERP, social media feeds, or third-party APIs, we ensure your displays work in perfect harmony with your tech stack.",
      icon: <FaCogs size={28} />,
      image: cu1,
      comingSoon: false,
    },
    {
      title: "User Training",
      description:
        "Comprehensive training sessions to ensure smooth content management and platform usage. We provide hands-on workshops for your team covering content scheduling, remote management, troubleshooting basics, and best practices for maximum engagement.",
      icon: <FaChalkboardTeacher size={28} />,
      image: u1,
      comingSoon: false,
    },
    {
      title: "Technical Support",
      description:
        "Reliable and responsive technical assistance to keep your systems running efficiently. Our dedicated support team is available via phone, email, and remote access to resolve issues quickly, minimizing downtime and keeping your displays performing at their best.",
      icon: <FaHeadset size={28} />,
      image: t2,
      comingSoon: false,
    },
    {
      title: "Advertising Services",
      description:
        "High-impact advertising solutions to promote your products effectively. Leverage our extensive digital signage network to run targeted ad campaigns, reach the right audience at the right time, and track performance with detailed analytics and reporting.",
      icon: <FaBullhorn size={28} />,
      image: ad1,
      comingSoon: true,
    },
    {
      title: "Software (CMS) Service",
      description:
        "Advanced content management solutions for remote and centralized display control. Our cloud-based CMS lets you schedule, update, and monitor content across all your screens from a single dashboard — anytime, anywhere, on any device.",
      icon: <FaLaptopCode size={28} />,
      image: cms,
      comingSoon: true,
    },
    {
      title: "Marketing For Your Brand",
      description:
        "Comprehensive brand marketing strategies powered by digital display networks. From in-store promotions and event branding to multi-location campaigns, we help you build a strong visual presence that resonates with your target audience and boosts conversions.",
      icon: <FaBullhorn size={28} />,
      image: ma1,
      comingSoon: true,
    },
  ];

  return (
    // Removed horizontal padding here to allow the footer to stretch full-width
    <div className="min-h-screen bg-sky-50 overflow-hidden flex flex-col">
      
      {/* Main Content Wrapper (Padding is now applied here) */}
      <div className="flex-grow px-6 md:px-12 lg:px-20 py-20">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            We provide end-to-end digital display solutions designed to enhance
            engagement, visibility, and business growth.
          </p>
        </div>

        {/* Services List (Alternating Rows) */}
        <div className="max-w-7xl mx-auto flex flex-col space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-12 lg:gap-20 ${
                  service.comingSoon ? "opacity-80" : ""
                }`}
              >
                {/* Kiosk / Standee Image Section */}
                <div className="w-full lg:w-1/2 relative group px-4 md:px-8">
                  <div className="relative bg-gradient-to-b from-gray-700 via-gray-900 to-black p-3 pb-10 md:p-4 md:pb-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[3px] border-gray-600 ring-4 ring-black/40 transform transition-transform duration-700 group-hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-2xl bg-black border border-gray-800">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-72 lg:h-[400px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <div className="w-8 h-1 bg-gray-800 rounded-full"></div>
                      <div className="w-8 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-4 right-8 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,1)] animate-pulse"></div>

                    {service.comingSoon && (
                      <span className="absolute top-8 left-8 bg-sky-500 text-white text-xs md:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-[0_4px_15px_rgba(14,165,233,0.5)] z-10">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="w-3/4 h-6 mx-auto bg-gradient-to-b from-gray-800 to-black rounded-b-3xl shadow-2xl relative z-[-1] -mt-2 border-x-2 border-b-2 border-gray-700"></div>
                  <div className="w-4/5 h-4 mx-auto bg-black rounded-[100%] opacity-40 blur-md mt-2"></div>
                </div>

                {/* Text / Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="p-4 bg-sky-100 text-sky-500 rounded-2xl shadow-sm">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {!service.comingSoon ? (
                    <Link to="/contact" className="self-start group flex items-center gap-2 text-sky-500 font-semibold text-lg hover:text-sky-600 transition-colors">
                      Get This Service
                      <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                        →
                      </span>
                    </Link>
                  ) : (
                    <span className="self-start text-gray-400 font-medium italic">
                      Currently in development
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-32 max-w-5xl mx-auto bg-gray-900 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Elevate Your Digital Presence?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Get in touch with our experts today and discover how our display solutions can transform your business.
          </p>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-transform hover:-translate-y-1 shadow-lg hover:shadow-sky-500/30">
            Contact Us
          </button>
        </div>
      </div>

      {/* Edge-to-Edge Premium Footer */}
      
    </div>
  );
}

export default Services;