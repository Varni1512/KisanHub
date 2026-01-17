import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for the image and text blocks
      gsap.from(".about-image", {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        }
      });

      gsap.from(".about-text", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-10 bg-slate-50 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Visual Representation */}
          <div className="about-image w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="About.png" 
                alt="Digital Farming" 
                className="w-full h-auto object-cover"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000"}}
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-green-600 rounded-2xl -z-10 opacity-10 rotate-12"></div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2">
            <div className="about-text mb-4">
              <span className="text-green-600 font-bold uppercase tracking-widest text-sm">
                Our Mission
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-6">
                What is KisanHub?
              </h2>
            </div>
            
            <p className="about-text text-lg text-slate-600 leading-relaxed mb-8">
              KisanHub is a digital platform designed to remove middlemen from the farming ecosystem. 
              It allows farmers to sell their produce directly, purchase farming medicines, rent equipment, 
              and connect with other farmers through a community chat system.
            </p>

            <div className="about-text grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-green-500">
                <h4 className="font-bold text-slate-900">Direct Sales</h4>
                <p className="text-sm text-slate-500 mt-1">Eliminate middlemen to maximize your profit margins.</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-green-500">
                <h4 className="font-bold text-slate-900">Community Chat</h4>
                <p className="text-sm text-slate-500 mt-1">Stay connected with other farmers and share knowledge.</p>
              </div>
            </div>

            <p className="about-text mt-8 text-slate-700 font-medium">
              The platform aims to improve farmers' income, access to resources, and overall digital presence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;