import React, { useState } from 'react';
import {
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Calendar,
  User,
  MapPin,
  Phone,
  Printer,
  X,
  Package
} from 'lucide-react';

const ShopOrders = () => {
  // --- STATE ---
  const [orders, setOrders] = useState([
    {
      id: "#ORD-998",
      customer: "Ramesh Farmer",
      phone: "+91 98765 43210",
      address: "Village Kothri, Near Temple",
      items: [{ name: "Urea Fertilizer", qty: "2 Bags", price: "266" }],
      total: "532",
      status: "Pending",
      date: "22 Oct, 2025",
      img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "#ORD-997",
      customer: "Suresh Patel",
      phone: "+91 88990 00112",
      address: "Sector 4, Market Yard",
      items: [{ name: "Tomato Seeds", qty: "5 Pkt", price: "450" }],
      total: "2,250",
      status: "Completed",
      date: "21 Oct, 2025",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: "#ORD-996",
      customer: "Anita Devi",
      phone: "+91 77788 99900",
      address: "Farm House No. 12, Green Valley",
      items: [{ name: "Pesticide Spray", qty: "1L", price: "450" }],
      total: "450",
      status: "Cancelled",
      date: "20 Oct, 2025",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null); // For Modal

  // --- HELPERS ---
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  // --- HANDLERS ---
  const handleStatusChange = (id, newStatus) => {
    if (window.confirm(`Are you sure you want to mark this order as ${newStatus}?`)) {
      setOrders(orders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      ));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans text-slate-800">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Orders Received</h2>
          <p className="text-slate-500 text-sm">Manage and track your customer orders here.</p>
        </div>

        {/* Quick Stats (Optional) */}
        <div className="flex">
          <div className="bg-white px-4 py-4 rounded-xl border border-slate-200 shadow-sm">

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 uppercase font-bold">
                Pending
              </span>

              <p className="text-xs font-black text-orange-500 leading-none">
                {orders.filter(o => o.status === 'Pending').length}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID or Farmer Name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
        </div>

        <div className="relative w-full md:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 cursor-pointer appearance-none hover:bg-slate-50 transition-all"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Farmer</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-5 font-bold text-slate-700 text-sm">{order.id}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <img src={order.img} alt="User" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <span className="text-sm font-semibold text-slate-800">{order.customer}</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-500 flex items-center gap-2">
                    <Calendar size={14} /> {order.date}
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)} flex items-center gap-1 w-fit`}>
                      {order.status === 'Completed' && <CheckCircle size={12} />}
                      {order.status === 'Cancelled' && <XCircle size={12} />}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-5 font-bold text-slate-800">₹{order.total}</td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      {/* Only show Accept/Reject for Pending Orders */}
                      {order.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(order.id, 'Completed')}
                            title="Accept Order"
                            className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(order.id, 'Cancelled')}
                            title="Reject Order"
                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}

                      {/* View Details Button (Always Visible) */}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        title="View Details"
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ORDER DETAILS MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Order Details</h3>
                <p className="text-xs text-slate-500">{selectedOrder.id} • {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">

              {/* Customer Info Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <img src={selectedOrder.img} alt="User" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-slate-800">{selectedOrder.customer}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getStatusStyle(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" /> {selectedOrder.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400" /> {selectedOrder.address}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:border-green-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                          <Package size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="font-medium text-slate-500">Total Amount</span>
                <span className="text-xl font-black text-slate-900">₹{selectedOrder.total}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-white transition-all">
                <Printer size={18} /> Print Invoice
              </button>
              {selectedOrder.status === 'Pending' && (
                <button
                  onClick={() => { handleStatusChange(selectedOrder.id, 'Completed'); setSelectedOrder(null); }}
                  className="flex-1 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
                >
                  Accept Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShopOrders;