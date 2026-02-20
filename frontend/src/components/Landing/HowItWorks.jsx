import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserPlus, UserCircle, PlayCircle, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const steps = [
    {
      title: "Sign Up",
      description: "Choose your role: Farmer, Seller, User, or Medicine Shop.",
      icon: <UserPlus size={32} />,
      side: "left"
    },
    {
      title: "Create Profile",
      description: "Add your details and location to connect with your local community.",
      icon: <UserCircle size={32} />,
      side: "right"
    },
    {
      title: "Start Using",
      description: "Farmers list crops, buy medicines, or rent equipment. Buyers purchase directly. Shops list medicines.",
      icon: <PlayCircle size={32} />,
      side: "left"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Vertical Line Growth Animation
      gsap.fromTo(lineRef.current, 
        { height: 0 }, 
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1, // Line grows as you scroll
          }
        }
      );

      // 2. Steps Entrance Animation
      const items = gsap.utils.toArray('.step-item');
      items.forEach((item) => {
        gsap.from(item, {
          x: item.classList.contains('item-left') ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-green-600 font-bold uppercase tracking-widest text-xs mb-3">
            Process
          </h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            How KisanHub Works
          </h1>
        </div>

        {/* Timeline Container */}
        <div className="steps-container relative flex flex-col items-center">
          
          {/* Vertical Progress Line (Desktop Only) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-slate-100 hidden md:block">
            <div ref={lineRef} className="w-full bg-green-500 origin-top"></div>
          </div>

          {/* Steps */}
          <div className="relative w-full">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`step-item flex flex-col md:flex-row items-center mb-20 last:mb-0 w-full ${
                  step.side === 'left' ? 'md:flex-row-reverse item-left' : 'item-right'
                }`}
              >
                {/* Content Side */}
                <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
                  <div className={`p-4 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:bg-green-50/50 hover:border-green-200 group`}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center justify-center md:justify-start gap-3">
                      <span className="text-green-600 bg-green-100 w-10 h-10 flex items-center justify-center rounded-lg text-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                        0{index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon Node */}
                <div className="relative z-10 w-20 h-20 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-green-600 shadow-xl my-6 md:my-0">
                  {step.icon}
                </div>

                {/* Empty Side for Spacing */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>

        </div>

        {/* Final Success Icon */}
        <div className="mt-16 flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                <CheckCircle2 size={24} />
            </div>
            <p className="mt-4 font-bold text-slate-900">Platform Ready!</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;