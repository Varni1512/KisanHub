import React, { useState, useEffect } from 'react';
import { Package, Calendar, CheckCircle2, Clock, Loader2, MapPin } from 'lucide-react';
import { ordersAPI, marketplaceOrdersAPI } from '../../utils/api';

const FarmerOrders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const farmerId = user?._id;

  const [medicineOrders, setMedicineOrders] = useState([]);
  const [marketplaceOrders, setMarketplaceOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' | 'medicine'

  useEffect(() => {
    if (!farmerId) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      setLoading(true);
      try {
        const [medRes, mpRes] = await Promise.all([
          ordersAPI.getByFarmer(farmerId),
          marketplaceOrdersAPI.getBySeller(farmerId),
        ]);
        if (medRes.success) setMedicineOrders(medRes.orders || []);
        if (mpRes.success) setMarketplaceOrders(mpRes.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [farmerId]);

  const formatDate = (d) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getPaymentBadge = (order) => {
    if (order.paymentStatus === 'Paid') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
          <CheckCircle2 size={12} /> Paid
        </span>
      );
    }
    if (order.paymentMethod === 'Online') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
          <Clock size={12} /> Payment Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
        Cash on Delivery
      </span>
    );
  };

  const OrderCard = ({ order, type }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-green-200 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-bold text-slate-800">{order.orderId || order._id}</span>
            <span className="text-slate-400">•</span>
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <Calendar size={14} /> {formatDate(order.createdAt)}
            </span>
          </div>
          {type === 'marketplace' && (
            <p className="text-xs text-slate-600 mb-1">Buyer: {order.buyer?.name || 'Customer'}</p>
          )}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
              {order.status}
            </span>
            {getPaymentBadge(order)}
          </div>
          <div className="space-y-1 text-sm text-slate-600">
            {(order.items || []).map((it, i) => (
              <div key={i} className="flex justify-between">
                <span>{it.name} x {it.qty} {it.unit}</span>
                <span className="font-semibold">₹{(it.price || 0) * (it.qty || 1)}</span>
              </div>
            ))}
          </div>
          {order.shippingAddress && (
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <MapPin size={12} /> {order.shippingAddress}
            </p>
          )}
        </div>
        <div className="text-left md:text-right">
          <p className="text-2xl font-black text-slate-900">₹{order.total}</p>
          <p className="text-xs text-slate-500">{order.paymentMethod}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  const hasMarketplace = marketplaceOrders.length > 0;
  const hasMedicine = medicineOrders.length > 0;

  return (
    <div className="p-0 space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl font-bold text-slate-900">My Orders</h1>
        <p className="text-slate-500 text-sm">Marketplace orders from buyers & your medicine shop orders.</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer transition-all ${activeTab === 'marketplace' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Marketplace ({marketplaceOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('medicine')}
          className={`px-4 py-2 rounded-lg font-bold text-sm cursor-pointer transition-all ${activeTab === 'medicine' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Medicine ({medicineOrders.length})
        </button>
      </div>

      {activeTab === 'marketplace' && (
        marketplaceOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No marketplace orders yet. Users will see your products in Browse Products.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {marketplaceOrders.map((order) => (
              <OrderCard key={order._id} order={order} type="marketplace" />
            ))}
          </div>
        )
      )}

      {activeTab === 'medicine' && (
        medicineOrders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No medicine orders yet. Order from Agro Medicine to see them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {medicineOrders.map((order) => (
              <OrderCard key={order._id} order={order} type="medicine" />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default FarmerOrders;
