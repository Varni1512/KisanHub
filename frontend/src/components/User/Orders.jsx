import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Filter, Eye, Package, Truck, CheckCircle,
  Clock, Calendar, XCircle, Loader2
} from 'lucide-react';
import { marketplaceOrdersAPI } from '../../utils/api';

const Orders = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const buyerId = user?._id;

  const itemsPerPage = 5;

  useEffect(() => {
    if (!buyerId) {
      setLoading(false);
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      const res = await marketplaceOrdersAPI.getByBuyer(buyerId);
      if (res.success && res.orders) setOrders(res.orders);
      setLoading(false);
    };
    fetchOrders();
  }, [buyerId]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = filter === 'All' || order.status === filter;
      const orderIdMatch = (order.orderId || order._id || '').toLowerCase().includes(searchTerm.toLowerCase());
      const sellerMatch = (order.seller?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && (orderIdMatch || sellerMatch);
    });
  }, [orders, filter, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Completed': return { color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle size={14} /> };
      case 'Pending': return { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Clock size={14} /> };
      case 'Cancelled': return { color: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle size={14} /> };
      default: return { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <Package size={14} /> };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-1 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
            <p className="text-slate-500 mt-1">Manage and track your farm-fresh orders.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              placeholder="Search Order ID or Farmer..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
              className="w-full md:w-48 pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium appearance-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Order ID</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Product</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">Farmer</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Total</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Payment</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const itemsList = order.items || [];
                  const mainItem = itemsList[0] || {};
                  return (
                    <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-5 font-bold text-slate-700 text-sm">{order.orderId || order._id}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <img src={mainItem?.img || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80'} className="w-10 h-10 rounded-lg object-cover" alt="" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-800">{mainItem?.name || 'Item'}</span>
                            {itemsList.length > 1 && <span className="text-xs text-slate-500">+{itemsList.length - 1} items</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-5 hidden md:table-cell text-sm text-slate-600">{order.seller?.name || 'Farmer'}</td>
                      <td className="p-5 font-bold text-slate-800">₹{order.total}</td>
                      <td className="p-5 text-xs">
                        <span className={order.paymentMethod === 'Online' ? 'text-blue-600 font-medium' : 'text-slate-500'}>
                          {order.paymentMethod === 'Online' ? (order.paymentStatus === 'Paid' ? 'UPI (Paid)' : 'UPI (Pending)') : 'COD'}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color}`}>
                          {statusConfig.icon} {order.status}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-slate-400 cursor-pointer hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No orders yet. Browse products and place your first order!</p>
            </div>
          )}

          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{filteredOrders.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> of <span className="text-slate-900 font-bold">{filteredOrders.length}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-slate-200 cursor-pointer rounded-lg text-xs font-bold text-slate-600 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 bg-white border border-slate-200 cursor-pointer rounded-lg text-xs font-bold text-slate-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-slate-900">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <img src={selectedOrder.items?.[0]?.img || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80'} className="w-16 h-16 rounded-lg object-cover" alt="" />
                <div>
                  <p className="font-bold text-slate-900">{selectedOrder.orderId || selectedOrder._id}</p>
                  <p className="text-sm text-slate-500">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Farmer</label>
                  <p className="text-sm font-semibold">{selectedOrder.seller?.name || 'Farmer'}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Amount</label>
                  <p className="text-sm font-bold text-green-600">₹{selectedOrder.total}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Payment</label>
                <p className="text-sm">{selectedOrder.paymentMethod} {selectedOrder.paymentStatus === 'Paid' ? '(Paid)' : ''}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Products</label>
                <ul className="text-sm list-disc list-inside text-slate-600">
                  {(selectedOrder.items || []).map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.qty} {item.unit}
                    </li>
                  ))}
                </ul>
              </div>
              {selectedOrder.shippingAddress && (
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Address</label>
                  <p className="text-sm text-slate-600">{selectedOrder.shippingAddress}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-6 bg-slate-900 text-white py-3 cursor-pointer rounded-xl font-bold hover:bg-slate-800 transition-colors"
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
