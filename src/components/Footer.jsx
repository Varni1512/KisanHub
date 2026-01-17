import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    // Switched to bg-slate-50 to match your website's background
    <footer className="bg-slate-50 text-slate-600 lg:pt-10 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Logo doesn't need inversion now since the background is light */}
            <img src="logo.png" alt="KisanHub" className="h-20 -ml-7" />
            <p className="text-sm leading-relaxed max-w-xs text-slate-500">
              Empowering farmers through a digital ecosystem by removing middlemen and providing direct access to resources.
            </p>
            <div className="flex space-x-5 text-slate-400">
              <Facebook size={18} className="hover:text-green-600 cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-green-600 cursor-pointer transition-colors" />
              <Instagram size={18} className="hover:text-green-600 cursor-pointer transition-colors" />
              <Linkedin size={18} className="hover:text-green-600 cursor-pointer transition-colors" />
            </div>
          </motion.div>

          {/* Column 2: Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-slate-900 font-bold mb-6">Quick Links</h4>
            <ul className="grid grid-cols-1 gap-4">
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm hover:text-green-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-slate-900 font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-green-600" />
                <a href="mailto:support@kisanhub.com" className="hover:text-green-600 transition-colors">
                  support@kisanhub.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-600" />
                <a href="tel:+91XXXXXXXXXX" className="hover:text-green-600 transition-colors">
                  +91-XXXXXXXXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-green-600 shrink-0" />
                <span>Vadodara, Gujarat, India</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-slate-200 pt-8 text-center">
          <p className="text-xs text-slate-400">
            © {currentYear} KisanHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;