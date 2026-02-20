import React, { useState } from 'react';
import { Search, MapPin, Plus, ShoppingCart, Star, Filter, Heart } from 'lucide-react';

const BrowseProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 12 Realistic Products Data
  const products = [
    { id: 1, name: 'Fresh Red Tomatoes', category: 'Vegetables', farmer: 'Sunil Singh', price: 40, oldPrice: 60, unit: 'kg', location: '1.2 km', rating: 4.8, reviews: 124, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Organic Potatoes', category: 'Vegetables', farmer: 'Amit Patel', price: 25, oldPrice: 35, unit: 'kg', location: '0.8 km', rating: 4.5, reviews: 89, img: 'https://images.unsplash.com/photo-1518977676605-69da130835d6?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Green Chillies', category: 'Vegetables', farmer: 'Sita Devi', price: 15, oldPrice: 20, unit: '250g', location: '3.0 km', rating: 4.9, reviews: 210, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Fresh Cauliflower', category: 'Vegetables', farmer: 'Vikas K.', price: 45, oldPrice: 50, unit: 'pc', location: '2.1 km', rating: 4.2, reviews: 56, img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=500&q=80' },
    { id: 5, name: 'Red Apples', category: 'Fruits', farmer: 'Himachal Orchards', price: 120, oldPrice: 150, unit: 'kg', location: '5.0 km', rating: 4.7, reviews: 300, img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80' },
    { id: 6, name: 'Yellow Bananas', category: 'Fruits', farmer: 'South Farms', price: 60, oldPrice: 0, unit: 'dozen', location: '1.5 km', rating: 4.6, reviews: 150, img: 'https://images.unsplash.com/photo-1571771896612-6184e9085cb4?auto=format&fit=crop&w=500&q=80' },
    { id: 7, name: 'Fresh Milk', category: 'Dairy', farmer: 'Desi Dairy', price: 65, oldPrice: 70, unit: 'L', location: '4.2 km', rating: 4.9, reviews: 500, img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80' },
    { id: 8, name: 'Basmati Rice', category: 'Grains', farmer: 'Punjab Fields', price: 110, oldPrice: 140, unit: 'kg', location: '10 km', rating: 4.8, reviews: 45, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
    { id: 9, name: 'Farm Eggs', category: 'Dairy', farmer: 'Poultry Co.', price: 180, oldPrice: 200, unit: 'tray', location: '6.0 km', rating: 4.5, reviews: 112, img: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=500&q=80' },
    { id: 10, name: 'Carrots', category: 'Vegetables', farmer: 'Local Farm', price: 35, oldPrice: 45, unit: 'kg', location: '2.5 km', rating: 4.3, reviews: 78, img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80' },
    { id: 11, name: 'Strawberries', category: 'Fruits', farmer: 'Hilltop', price: 250, oldPrice: 300, unit: 'box', location: '8.0 km', rating: 4.9, reviews: 88, img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80' },
    { id: 12, name: 'Whole Wheat', category: 'Grains', farmer: 'MP Wheat', price: 42, oldPrice: 0, unit: 'kg', location: '12 km', rating: 4.6, reviews: 34, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80' },
  ];

  // Filtering Logic
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Grains'];

  return (
    <div className="min-h-screen bg-slate-50 p-1 md:p-1 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Marketplace</h1>
            <p className="text-slate-500 mt-1">Direct from local farmers to your kitchen.</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-4 z-10">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
            <input 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-slate-400" 
              placeholder="Search for vegetables, fruits..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm cursor-pointer font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-green-600 text-white shadow-md shadow-green-200' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-lg border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300 group">
              
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Overlay Tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] bg-white/90 backdrop-blur-sm text-green-700 font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-sm">
                    Organic
                  </span>
                  {p.oldPrice > 0 && (
                    <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-sm">
                      {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                
                <button className="absolute top-3 right-3 p-2 cursor-pointer bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-colors">
                  <Heart size={16} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{p.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={12} className="text-green-600"/> {p.location} • {p.farmer}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                {/* <div className="flex items-center gap-1 mb-4">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-slate-700">{p.rating}</span>
                  <span className="text-xs text-slate-400">({p.reviews} reviews)</span>
                </div> */}

                <div className="h-px bg-slate-100 mb-4"></div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 line-through decoration-slate-400">
                      {p.oldPrice > 0 ? `₹${p.oldPrice}` : ''}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-xl text-slate-900">₹{p.price}</span>
                      <span className="text-xs text-slate-500 font-medium">/{p.unit}</span>
                    </div>
                  </div>
                  
                  <button className="bg-slate-900 text-white p-2.5 cursor-pointer rounded-xl shadow-lg shadow-slate-200 hover:bg-green-600 hover:shadow-green-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group/btn">
                    <Plus size={18} />
                    <span className="text-sm font-semibold pr-1 ">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
            <div className="text-center py-20">
                <p className="text-slate-400 text-lg">No products found for "{searchQuery}"</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('All')}}
                  className="mt-4 cursor-pointer text-green-600 font-semibold hover:underline"
                >
                    Clear Filters
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default BrowseProducts;