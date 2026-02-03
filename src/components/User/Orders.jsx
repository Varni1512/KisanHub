import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronRight, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Calendar,
  XCircle,
  MoreHorizontal
} from 'lucide-react';

const Orders = () => {
  const [filter, setFilter] = useState('All');

  // Realistic Order Data
  const orders = [
    { 
      id: '#ORD-9921', 
      date: 'Oct 24, 2025', 
      items: ['Fresh Red Tomatoes', 'Onions'], 
      totalItems: 3,
      farmer: 'Ram Singh', 
      amount: '₹120.00', 
      status: 'Delivered',
      img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '#ORD-9945', 
      date: 'Oct 23, 2025', 
      items: ['Organic Pumpkin'], 
      totalItems: 1,
      farmer: 'Sita Devi', 
      amount: '₹45.00', 
      status: 'Pending',
      img: 'https://images.unsplash.com/photo-1570586437263-160f0d1e813d?auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '#ORD-9948', 
      date: 'Oct 22, 2025', 
      items: ['Fresh Milk (1L)', 'Farm Eggs'], 
      totalItems: 2,
      farmer: 'Desi Dairy', 
      amount: '₹240.00', 
      status: 'Out for delivery',
      img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '#ORD-9800', 
      date: 'Oct 20, 2025', 
      items: ['Basmati Rice (5kg)'], 
      totalItems: 1,
      farmer: 'Punjab Fields', 
      amount: '₹550.00', 
      status: 'Cancelled',
      img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: '#ORD-9755', 
      date: 'Oct 18, 2025', 
      items: ['Green Chillies', 'Coriander'], 
      totalItems: 4,
      farmer: 'Suresh Farm', 
      amount: '₹85.00', 
      status: 'Delivered',
      img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=100&q=80'
    },
    
  ];

  // Helper for Status Styles & Icons
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Delivered':
        return { color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={14} /> };
      case 'Pending':
        return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Clock size={14} /> };
      case 'Out for delivery':
        return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Truck size={14} /> };
      case 'Cancelled':
        return { color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle size={14} /> };
      default:
        return { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <Package size={14} /> };
    }
  };

  return (
    <div className="p-4 md:p-1 bg-slate-50 min-h-screen font-sans">
      
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
            <p className="text-slate-500 mt-1">Track and manage your recent purchases.</p>
          </div>
          <button className="bg-white border cursor-pointer border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            Download Report
          </button>
        </div>

        {/* Toolbar: Search & Filter */}
        {/* <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              placeholder="Search by Order ID or Farmer..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                className="w-full md:w-48 pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:ring-2 focus:ring-green-500/20 outline-none cursor-pointer hover:border-slate-300"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">Status: All</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div> */}

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Farmer</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                      <td className="p-5">
                        <span className="font-bold text-slate-700 text-sm group-hover:text-green-600 transition-colors">{order.id}</span>
                      </td>
                      
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <img src={order.img} alt="Product" className="w-10 h-10 rounded-lg object-cover border border-slate-100 shadow-sm" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800 line-clamp-1">{order.items[0]}</span>
                            {order.totalItems > 1 && (
                              <span className="text-xs text-slate-500">+ {order.totalItems - 1} other items</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-5 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Calendar size={14} />
                          {order.date}
                        </div>
                      </td>

                      <td className="p-5 hidden sm:table-cell">
                        <span className="text-sm text-slate-600 font-medium">{order.farmer}</span>
                      </td>

                      <td className="p-5">
                        <span className="font-bold text-slate-800">{order.amount}</span>
                      </td>

                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {order.status}
                        </span>
                      </td>

                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-2 text-slate-400 cursor-pointer hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details">
                             <Eye size={18} />
                           </button>
                           <button className="p-2 text-slate-400 cursor-pointer hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors" title="More Options">
                             <MoreHorizontal size={18} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 font-medium">Showing <span className="text-slate-900 font-bold">1-5</span> of <span className="text-slate-900 font-bold">24</span> orders</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50">Previous</button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Orders;