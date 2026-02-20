import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  MoreHorizontal,
  DollarSign,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { shopStatsAPI } from '../../utils/api';

const ShopDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const shopkeeperId = user?._id;

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (!shopkeeperId) return;
    const fetch = async () => {
      try {
        const res = await shopStatsAPI.get(shopkeeperId);
        if (res.success) {
          setStats(res.stats);
          setRecentOrders(res.recentOrders || []);
          setLowStockProducts(res.lowStockProducts || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [shopkeeperId]);

  const statsCards = [
    { title: "Total Revenue", value: `₹${stats.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, color: "bg-green-500", bg: "bg-green-50", trendUp: true },
    { title: "Total Orders", value: String(stats.totalOrders || 0), icon: ShoppingCart, color: "bg-blue-500", bg: "bg-blue-50", trendUp: true },
    { title: "Pending Orders", value: String(stats.pendingOrders || 0), icon: Clock, color: "bg-orange-500", bg: "bg-orange-50", trendUp: false },
    { title: "Total Products", value: String(stats.totalProducts || 0), icon: Package, color: "bg-purple-500", bg: "bg-purple-50", trendUp: true },
  ];

  const statusStyles = {
    'Pending': 'bg-orange-100 text-orange-700',
    'Completed': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

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
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color.replace('bg-', 'text-')} group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              {stat.trendUp !== undefined && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${stat.trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  <TrendingUp size={12} className={stat.trendUp ? '' : 'rotate-180'} />
                </span>
              )}
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
              <Link to="/medicine/orders" className="text-green-600 text-sm font-semibold hover:underline">View All</Link>
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
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-500">No recent orders</td>
                    </tr>
                  ) : recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-sm font-bold text-slate-600">{order.orderId || order._id}</td>
                      <td className="p-4">
                        <p className="text-sm font-semibold text-slate-800">{(order.items || [])[0]?.name || '-'}</p>
                        <p className="text-xs text-slate-500">{order.farmer?.name || 'Farmer'}</p>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-800">₹{order.total}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyles[order.status] || 'bg-slate-100 text-slate-600'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link to="/medicine/orders">
                          <button className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={18} />
                          </button>
                        </Link>
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
                {lowStockProducts.length > 0
                  ? `Items like ${lowStockProducts.map(p => p.name).join(', ')} are running low. Restock now.`
                  : 'All products are well stocked. Add more to grow your business.'}
              </p>
              <Link to="/medicine/products">
              <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2 group">
                Check Inventory 
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
              </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopDashboard;