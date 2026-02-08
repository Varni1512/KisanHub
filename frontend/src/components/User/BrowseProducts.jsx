import React, { useState, useEffect } from 'react';
import { Search, MapPin, Plus } from 'lucide-react';
import { farmerProductsAPI } from '../../utils/api';

const BrowseProducts = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await farmerProductsAPI.getAll();
      if (res.success && res.products) setProducts(res.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Spices', 'Seeds', 'Farming Tools'];
  const uniqueCategories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  const handleAdd = (p) => {
    if (!addToCart) return;
    addToCart({
      _id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      unit: p.unit || 'Kg',
      stock: p.stock,
      img: p.img,
      farmer: p.farmer?.name,
      farmerId: p.farmer?._id || p.farmer,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-1 md:p-1 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Marketplace</h1>
            <p className="text-slate-500 mt-1">Direct from local farmers to your kitchen.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-4 z-10">
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
            <input
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="Search for vegetables, fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
            {(uniqueCategories.length > 1 ? uniqueCategories : categories).map((cat) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div key={p._id} className="bg-white rounded-lg border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative h-56 overflow-hidden">
                <img src={p.img || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80'} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{p.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={12} className="text-green-600" /> {p.location || p.farmer?.state || '-'} • {p.farmer?.name || 'Farmer'}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-slate-100 mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-xl text-slate-900">₹{p.price}</span>
                      <span className="text-xs text-slate-500 font-medium">/{p.unit || 'Kg'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAdd(p)}
                    className="bg-slate-900 text-white p-2.5 cursor-pointer rounded-xl shadow-lg shadow-slate-200 hover:bg-green-600 hover:shadow-green-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group/btn"
                  >
                    <Plus size={18} />
                    <span className="text-sm font-semibold pr-1">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No products found</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4 cursor-pointer text-green-600 font-semibold hover:underline">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProducts;
