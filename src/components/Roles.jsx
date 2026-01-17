import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, ShoppingCart, User, Store, CheckCircle } from 'lucide-react';

const Roles = () => {
  const roles = [
    { title: "Farmer", desc: "Can sell crops, buy medicines, rent equipment, and chat.", icon: <Sprout size={32} />, color: "border-green-500", bg: "bg-green-50" },
    { title: "Seller", desc: "Can buy crops in bulk directly from farmers.", icon: <ShoppingCart size={32} />, color: "border-blue-500", bg: "bg-blue-50" },
    { title: "User", desc: "Can buy fresh vegetables directly from farmers.", icon: <User size={32} />, color: "border-orange-500", bg: "bg-orange-50" },
    { title: "Medicine Shop", desc: "Can list medicines, manage orders, and advise farmers.", icon: <Store size={32} />, color: "border-purple-500", bg: "bg-purple-50" }
  ];

  return (
    <section id="roles" className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-green-600 font-bold uppercase tracking-widest text-xs mb-3"
          >
            Ecosystem
          </motion.h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">Who Can Use KisanHub?</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-8 rounded-[2rem] bg-white border-b-4 ${role.color} shadow-sm hover:shadow-xl transition-all duration-300`}
            >
              <div className={`w-16 h-16 ${role.bg} rounded-2xl flex items-center justify-center mb-6`}>
                {role.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{role.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{role.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;