import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Filter, Eye, Package, Truck, CheckCircle, 
  Clock, Calendar, XCircle, MoreHorizontal, Edit, Trash2, Download
} from 'lucide-react';

const Orders = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which menu is open
  const [selectedOrder, setSelectedOrder] = useState(null); // For View Modal
  
  const itemsPerPage = 5;

  const orders = [
    { id: '#ORD-9921', date: 'Oct 24, 2025', items: ['Fresh Red Tomatoes', 'Onions'], totalItems: 3, farmer: 'Ram Singh', amount: '₹120.00', status: 'Delivered', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9945', date: 'Oct 23, 2025', items: ['Organic Pumpkin'], totalItems: 1, farmer: 'Sita Devi', amount: '₹45.00', status: 'Pending', img: 'https://images.unsplash.com/photo-1570586437263-160f0d1e813d?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9948', date: 'Oct 22, 2025', items: ['Fresh Milk (1L)', 'Farm Eggs'], totalItems: 2, farmer: 'Desi Dairy', amount: '₹240.00', status: 'Out for delivery', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9800', date: 'Oct 20, 2025', items: ['Basmati Rice (5kg)'], totalItems: 1, farmer: 'Punjab Fields', amount: '₹550.00', status: 'Cancelled', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9755', date: 'Oct 18, 2025', items: ['Green Chillies', 'Coriander'], totalItems: 4, farmer: 'Suresh Farm', amount: '₹85.00', status: 'Delivered', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9700', date: 'Oct 15, 2025', items: ['Potatoes'], totalItems: 1, farmer: 'Ram Singh', amount: '₹60.00', status: 'Delivered', img: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9921', date: 'Oct 24, 2025', items: ['Fresh Red Tomatoes', 'Onions'], totalItems: 3, farmer: 'Ram Singh', amount: '₹120.00', status: 'Delivered', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9945', date: 'Oct 23, 2025', items: ['Organic Pumpkin'], totalItems: 1, farmer: 'Sita Devi', amount: '₹45.00', status: 'Pending', img: 'https://images.unsplash.com/photo-1570586437263-160f0d1e813d?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9948', date: 'Oct 22, 2025', items: ['Fresh Milk (1L)', 'Farm Eggs'], totalItems: 2, farmer: 'Desi Dairy', amount: '₹240.00', status: 'Out for delivery', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9800', date: 'Oct 20, 2025', items: ['Basmati Rice (5kg)'], totalItems: 1, farmer: 'Punjab Fields', amount: '₹550.00', status: 'Cancelled', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9755', date: 'Oct 18, 2025', items: ['Green Chillies', 'Coriander'], totalItems: 4, farmer: 'Suresh Farm', amount: '₹85.00', status: 'Delivered', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=100&q=80' },
    { id: '#ORD-9700', date: 'Oct 15, 2025', items: ['Potatoes'], totalItems: 1, farmer: 'Ram Singh', amount: '₹60.00', status: 'Delivered', img: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&w=100&q=80' },
  ];

  // Logic: Search & Filter
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = filter === 'All' || order.status === filter;
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            order.farmer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filter, searchTerm]);

  // Logic: Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Delivered': return { color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={14} /> };
      case 'Pending': return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Clock size={14} /> };
      case 'Out for delivery': return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Truck size={14} /> };
      case 'Cancelled': return { color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle size={14} /> };
      default: return { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <Package size={14} /> };
    }
  };

  return (
    <div className="p-4 md:p-1 bg-slate-50  font-sans" onClick={() => setOpenDropdown(null)}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
            <p className="text-slate-500 mt-1">Manage and track your farm-fresh orders.</p>
          </div>
          <button className="bg-white border cursor-pointer border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Download size={16} /> Download Report
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              placeholder="Search Order ID or Farmer..." 
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                value={filter}
                onChange={(e) => {setFilter(e.target.value); setCurrentPage(1);}}
                className="w-full md:w-48 pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium appearance-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Order ID</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Product</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">Farmer</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Total</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-5 font-bold text-slate-700 text-sm">{order.id}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <img src={order.img} className="w-10 h-10 rounded-lg object-cover" alt="" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800">{order.items[0]}</span>
                            {order.totalItems > 1 && <span className="text-xs text-slate-500">+{order.totalItems - 1} items</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-5 hidden md:table-cell text-sm text-slate-600">{order.farmer}</td>
                      <td className="p-5 font-bold text-slate-800">{order.amount}</td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                          {statusConfig.icon} {order.status}
                        </span>
                      </td>
                      <td className="p-5 text-right relative">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                            className="p-2 text-slate-400 cursor-pointer hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                          
                          {/* Dropdown Menu Toggle */}
                          <div className="relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(openDropdown === order.id ? null : order.id);
                              }}
                              className="p-2 text-slate-400 cursor-pointer hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              <MoreHorizontal size={18} />
                            </button>

                            {openDropdown === order.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                                <button className="w-full text-left px-4 py-2 cursor-pointer text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <Edit size={14} /> Edit Order
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm cursor-pointer text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                  <CheckCircle size={14} /> Mark as Paid
                                </button>
                                <hr className="my-1 border-slate-100" />
                                <button className="w-full text-left px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                                  <Trash2 size={14} /> Cancel Order
                                </button>
                              </div>
                            )}
                          </div>
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
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{filteredOrders.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> of <span className="text-slate-900 font-bold">{filteredOrders.length}</span>
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-slate-200 cursor-pointer rounded-lg text-xs font-bold text-slate-600 disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 bg-white border border-slate-200 cursor-pointer rounded-lg text-xs font-bold text-slate-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Modal for "Eye" Button Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-slate-900">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                 <img src={selectedOrder.img} className="w-16 h-16 rounded-lg object-cover" alt="" />
                 <div>
                   <p className="font-bold text-slate-900">{selectedOrder.id}</p>
                   <p className="text-sm text-slate-500">{selectedOrder.date}</p>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase">Farmer</label>
                   <p className="text-sm font-semibold">{selectedOrder.farmer}</p>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase">Amount</label>
                   <p className="text-sm font-bold text-green-600">{selectedOrder.amount}</p>
                 </div>
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Products</label>
                  <ul className="text-sm list-disc list-inside text-slate-600">
                    {selectedOrder.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
               </div>
            </div>
            <button 
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-6 bg-slate-900 text-white py-3  cursor-pointer rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;