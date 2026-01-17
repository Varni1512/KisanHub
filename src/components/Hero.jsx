import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const arrowRef = useRef(null);

  // Function to handle smooth scroll to the next section
  const handleScrollDown = () => {
    // This scrolls the window down by the height of the viewport
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance animations for text
      tl.from(".hero-anim", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3
      });

      // Infinite Bouncing/Jumping animation for the arrow
      gsap.to(arrowRef.current, {
        y: 15,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      id='home'
    >
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <img 
          src="Herom.png" 
          alt="Agriculture Mobile" 
          className="block md:hidden w-full h-full object-cover opacity-70"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=800"}}
        />
        <img 
          src="Hero.png" 
          alt="Agriculture Desktop" 
          className="hidden md:block w-full h-full object-cover opacity-70"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1600"}}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="hero-anim text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1]">
          Empowering Farmers with a <br />
          <span className="text-green-400">Digital Farming</span> Ecosystem
        </h1>
        
        <p className="hero-anim mt-8 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          KisanHub connects farmers directly with buyers, medicine shops, and other farmers — 
          enabling easy selling, smart buying, equipment sharing, and community support in one platform.
        </p>

        <div className="hero-anim mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <button className="bg-green-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-xl active:scale-95">
            Get Started
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all active:scale-95">
            Learn More
          </button>
        </div>
      </div>

      {/* --- JUMPING ARROW SECTION WITH CLICK HANDLER --- */}
      <div 
        onClick={handleScrollDown}
        className="hero-anim absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <p className="text-white/70 text-[10px] uppercase tracking-[4px] font-medium group-hover:text-green-400 transition-colors">
          Scroll
        </p>
        
        <div ref={arrowRef} className="text-green-400">
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;