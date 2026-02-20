import React from 'react';
import { 
  ShoppingBag, 
  Clock, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  MoreVertical, 
  ChevronRight,
  Package 
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Orders', value: '142', icon: <Package size={24} />, color: 'bg-blue-500', trend: '+12%', trendUp: true },
    { label: 'Active Orders', value: '03', icon: <Clock size={24} />, color: 'bg-orange-500', trend: 'In Progress', trendUp: true },
    { label: 'Total Spent', value: '₹8.4k', icon: <ShoppingBag size={24} />, color: 'bg-green-600', trend: '+5.4%', trendUp: true },
    { label: 'Saved Items', value: '12', icon: <Heart size={24} />, color: 'bg-red-500', trend: '-2%', trendUp: false },
  ];

  const recentOrders = [
    { id: '#ORD-7782', item: 'Fresh Organic Box', date: 'Today, 10:30 AM', price: '₹450', status: 'Processing' },
    { id: '#ORD-7781', item: '5kg Potatoes & Onions', date: 'Yesterday', price: '₹220', status: 'Delivered' },
    { id: '#ORD-7780', item: 'Dairy Pack (Milk/Ghee)', date: '22 Oct, 2025', price: '₹1,200', status: 'Delivered' },
  ];

  const freshNearby = [
    { id: 1, name: 'Sweet Corns', farmer: 'Rajesh Kumar', price: 30, unit: 'kg', dist: '1.2km', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Red Chillies', farmer: 'Suresh Farm', price: 80, unit: 'kg', dist: '2.5km', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=150&q=80' }, // using milk image as placeholder or swap for chillies
  ];

  return (
    <div className="p-1 md:p-1 space-y-8 bg-slate-50 min-h-screen font-sans animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start">
                <div className="z-10">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl text-white shadow-lg ${stat.color} bg-opacity-90 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {stat.trend}
                </span>
                <span className="text-xs text-slate-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Orders (Takes 2 cols space) */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-3 border-b border-slate-50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
                    <button className="text-green-600 cursor-pointer text-sm font-semibold hover:underline">View All</button>
                </div>
                <div className="p-2">
                    {recentOrders.map((order, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-md transition-all">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{order.item}</h4>
                                    <p className="text-xs text-slate-500">{order.id} • {order.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-800">{order.price}</p>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Fresh Nearby (Takes 1 col space) */}
        <div className="space-y-6">
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp size={20} className="text-green-600"/> Fresh Nearby
                    </h2>
                    <button className="p-2 cursor-pointer hover:bg-slate-100 rounded-full text-slate-400">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="space-y-4">
                    {freshNearby.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 border border-slate-100 rounded-xl hover:border-green-500 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white group">
                            <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 group-hover:text-green-600 transition-colors">{item.name}</h4>
                                <p className="text-xs text-slate-500 mb-2">{item.farmer} • {item.dist}</p>
                                <div className="flex justify-between items-end">
                                    <p className="font-black text-slate-800">₹{item.price}<span className="text-xs font-normal text-slate-400">/{item.unit}</span></p>
                                    <button className="w-6 h-6 bg-white cursor-pointer border border-slate-200 rounded flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors">
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <button className="w-full py-3 mt-2 cursor-pointer border-2 border-dashed border-slate-200 text-slate-500 rounded-xl text-sm font-semibold hover:border-green-500 hover:text-green-600 transition-colors">
                        Browse All Products
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;