import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section id="cta" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Rectangular Card with Background Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[350px] md:h-[300px] rounded-3xl overflow-hidden flex items-center justify-center text-center"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="CTA.png"
              alt="Join KisanHub"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495107336281-19d038f615f8?q=80&w=1600" }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content Over Image */}
          <div className="relative z-10 px-6 max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            >
              Join the Farming Revolution
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-200 text-lg mb-8"
            >
              Join KisanHub today and be part of the digital farming ecosystem.
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/login">
                <button className="bg-green-600 cursor-pointer text-white px-10 py-3.5 rounded-full font-bold text-lg hover:bg-green-700 transition-all shadow-lg">
                  Sign Up Now
                </button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;