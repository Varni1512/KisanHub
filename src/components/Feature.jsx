import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  FlaskConical, 
  Tractor, 
  MessageCircle, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Direct Selling",
      desc: "Farmers can sell their crops directly to wholesalers and consumers without middlemen.",
      icon: <ShoppingBag className="w-7 h-7" />,
    },
    {
      title: "Medicine Marketplace",
      desc: "Farmers can buy fertilizers, pesticides, and seeds from nearby agro shops.",
      icon: <FlaskConical className="w-7 h-7" />,
    },
    {
      title: "Equipment Sharing",
      desc: "Farmers can rent or share farming equipment like tractors, JCBs, and harvesters.",
      icon: <Tractor className="w-7 h-7" />,
    },
    {
      title: "Community Chat",
      desc: "A live chat platform where farmers can ask questions and help each other.",
      icon: <MessageCircle className="w-7 h-7" />,
    },
    {
      title: "Farming Knowledge",
      desc: "Access to farming tips, best crops, and seasonal guidance.",
      icon: <BookOpen className="w-7 h-7" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="features" className="relative py-10 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-green-600 font-bold uppercase tracking-widest text-xs">
            What we offer
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-6">
            Key Features
          </h2>
          <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full" />
        </div>

        {/* Centered Cards Container */}
        {/* We use flex-wrap and justify-center so that the last 2 cards stay in the middle */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              // basis-full for mobile, md:basis-[calc(50%-2rem)] for 2-column, lg:basis-[calc(33.33%-2rem)] for 3-column
              className="group relative p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-green-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px] max-w-[800px]"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-700">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {item.desc}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center gap-2 text-green-600 font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                Explore Feature <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;