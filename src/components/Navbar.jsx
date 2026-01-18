import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import GoogleTranslate from './Language';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const menuItems = [
    { name: "Home", target: "#home" },
    { name: "Features", target: "#features" },
    { name: "How It Works", target: "#how-it-works" },
    { name: "Roles", target: "#roles" },
    { name: "Contact", target: "#cta" },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: targetId, offsetY: 80 },
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-anim", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "expo.out" });
    } else {
      document.body.style.overflow = "auto";
      gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [isOpen]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full bg-white z-[100] border-b border-gray-100 shadow-sm">
      <div className="container max-w-8xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left: Logo */}
        <div className="nav-anim flex-shrink-0">
          <img
            className="h-16 md:h-20 w-auto object-contain cursor-pointer -ml-4 lg:ml-0"
            src="logo.png"
            alt="KisanHub"
            onClick={(e) => handleNavClick(e, "#home")}
          />
        </div>

        {/* Middle: Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.target)}
              className="nav-anim text-slate-700 hover:text-green-600 font-semibold transition-colors text-[15px] cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Right: Actions (Translate + Login + Toggle) */}
        <div className="nav-anim flex items-center gap-2 sm:gap-4">
          
          {/* Google Translate - Set for Mobile & Desktop */}
          <div className="scale-90 origin-right">
            <GoogleTranslate />
          </div>

          <a href="/login" className="hidden sm:block">
            <button className="bg-black cursor-pointer text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap">
              Login
            </button>
          </a>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
          >
            <span className="h-0.5 w-6 bg-black" />
            <span className="h-0.5 w-6 bg-black" />
            <span className="h-0.5 w-6 bg-black" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div ref={menuRef} className="fixed inset-0 bg-white z-[110] flex flex-col translate-x-full lg:hidden">
        <div className="flex items-center justify-end px-8 py-6 border-b border-slate-50">
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center focus:outline-none">
            <div className="relative w-6 h-6">
              <span className="absolute block w-6 h-0.5 bg-black rotate-45 top-1/2 -translate-y-1/2"></span>
              <span className="absolute block w-6 h-0.5 bg-black -rotate-45 top-1/2 -translate-y-1/2"></span>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-end space-y-8 px-10 py-12">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.target)}
              className="text-4xl font-bold text-slate-800 hover:text-green-600 transition-colors text-right"
            >
              {item.name}
            </button>
          ))}
          
          <div className="pt-8 w-full flex justify-end">
            <a href="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-black text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg active:scale-95">
                Login
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;