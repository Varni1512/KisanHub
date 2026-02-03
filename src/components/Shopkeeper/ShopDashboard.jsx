import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  Plus,
  MoreHorizontal,
  DollarSign
} from 'lucide-react';

const ShopDashboard = () => {
  const stats = [
    { 
      title: "Total Revenue", 
      value: "₹45,230", 
      icon: DollarSign, 
      color: "bg-green-500", 
      bg: "bg-green-50",
      trend: "+12.5%", 
      trendUp: true 
    },
    { 
      title: "Total Orders", 
      value: "128", 
      icon: ShoppingCart, 
      color: "bg-blue-500", 
      bg: "bg-blue-50",
      trend: "+8.2%", 
      trendUp: true 
    },
    { 
      title: "Pending Orders", 
      value: "12", 
      icon: Clock, 
      color: "bg-orange-500", 
      bg: "bg-orange-50",
      trend: "-2.4%", 
      trendUp: false 
    },
    { 
      title: "Total Products", 
      value: "45", 
      icon: Package, 
      color: "bg-purple-500", 
      bg: "bg-purple-50",
      trend: "+4 Added", 
      trendUp: true 
    },
  ];

  const recentOrders = [
    { id: '#ORD-7882', product: 'Urea Fertilizer 50kg', customer: 'Ramesh Kumar', amount: '₹1,200', status: 'Pending' },
    { id: '#ORD-7881', product: 'Pesticide Spray', customer: 'Suresh Patel', amount: '₹450', status: 'Delivered' },
    { id: '#ORD-7880', product: 'Hybrid Seeds Pack', customer: 'Anita Devi', amount: '₹850', status: 'Processing' },
  ];

  const statusStyles = {
    'Pending': 'bg-orange-100 text-orange-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Processing': 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 text-sm">Welcome back, here is your store's daily summary.</p>
        </div>

      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color.replace('bg-', 'text-')} group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trendUp ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split: Banner & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Recent Activity (Takes 2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg">Recent Orders</h3>
              <button className="text-green-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Order ID</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Product</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Amount</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-sm font-bold text-slate-600">{order.id}</td>
                      <td className="p-4">
                        <p className="text-sm font-semibold text-slate-800">{order.product}</p>
                        <p className="text-xs text-slate-500">{order.customer}</p>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-800">{order.amount}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Promotion Banner (Takes 1/3 width) */}
        <div className="space-y-6">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl shadow-slate-200 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <Package size={24} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Low Inventory Alert?</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Some items like <strong>Urea Fertilizer</strong> are running low. Restock now to avoid losing sales.
              </p>
              <a href="/medicine/products">
              <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2 group">
                Check Inventory 
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
              </button>
              </a>
            </div>
          </div>

          {/* Mini Help Card */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h4 className="font-bold text-green-800 mb-1">Need Help?</h4>
              <p className="text-xs text-green-700 mb-3">Contact support if you face issues with orders.</p>
              <button className="text-xs font-bold text-green-700 underline">Contact Support</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopDashboard;