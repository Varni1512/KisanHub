import React, { useState } from 'react';
import { Trash2, ChevronRight, Minus, Plus, ShoppingBag, Ticket, ShieldCheck } from 'lucide-react';
import { marketplaceOrdersAPI, razorpayAPI } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';

const CART_KEY = 'kisanhub_marketplace_cart';

const Cart = ({ cartItems = [], updateCartQty, removeFromCart, clearCart, setActiveTab }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?._id;

  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    shippingAddress: '',
    phone: user?.name ? '' : '',
    paymentMethod: 'COD',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0);
  const deliveryThreshold = 500;
  const deliveryFee = subtotal >= deliveryThreshold ? 0 : 40;
  const total = subtotal + deliveryFee;
  const progress = Math.min((subtotal / deliveryThreshold) * 100, 100);

  const handleCheckout = async () => {
    if (!userId) {
      toast.error('Please login to place order');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    if (!checkoutForm.shippingAddress.trim()) {
      toast.error('Enter shipping address');
      return;
    }
    const uniqueSellers = new Set(cartItems.map((i) => i.farmerId).filter(Boolean));
    if (checkoutForm.paymentMethod === 'Online' && uniqueSellers.size > 1) {
      toast.error('For online payment, please order from one farmer at a time.');
      return;
    }

    setLoading(true);
    try {
      const items = cartItems.map((item) => ({
        product: item._id,
        seller: item.farmerId,
        qty: item.qty || 1,
      }));

      const orderPayload = {
        buyer: userId,
        items,
        shippingAddress: checkoutForm.shippingAddress,
        phone: checkoutForm.phone,
        paymentMethod: checkoutForm.paymentMethod,
      };

      const res = await marketplaceOrdersAPI.create(orderPayload);
      if (!res.success) {
        toast.error(res.message || 'Order failed');
        setLoading(false);
        return;
      }

      const orders = res.orders || [];
      if (orders.length === 0) {
        toast.error('Could not create order');
        setLoading(false);
        return;
      }

      if (checkoutForm.paymentMethod === 'Online') {
        const orderToPay = orders[0];
        const rzRes = await razorpayAPI.createOrder(orderToPay._id, 'marketplace');
        if (!rzRes.success || !rzRes.razorpayOrderId) {
          toast.error(rzRes.message || 'Payment init failed');
          setLoading(false);
          return;
        }
        const options = {
          key: rzRes.keyId,
          amount: rzRes.amount * 100,
          currency: 'INR',
          name: 'KisanHub',
          description: 'Marketplace Order',
          order_id: rzRes.razorpayOrderId,
          handler: async (response) => {
            const verifyRes = await razorpayAPI.verifyPayment({
              orderId: orderToPay._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              type: 'marketplace',
            });
            if (verifyRes.success) {
              clearCart?.();
              setShowCheckout(false);
              setActiveTab?.('My Orders');
              toast.success('Order placed & payment successful!');
            } else {
              toast.error(verifyRes.message || 'Payment verification failed');
            }
            setLoading(false);
          },
        };
        const razorpay = window.Razorpay;
        if (!razorpay) {
          toast.error('Razorpay script not loaded');
          setLoading(false);
          return;
        }
        new razorpay(options).open();
        return;
      }

      clearCart?.();
      setShowCheckout(false);
      setActiveTab?.('My Orders');
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err.message || 'Order failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-1 font-sans">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900">Shopping Cart <span className="text-slate-400 font-medium text-lg">({cartItems.length} items)</span></h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-slate-500 border border-slate-200">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm mt-1">Browse products and add items to your cart</p>
            {setActiveTab && (
              <button onClick={() => setActiveTab('Browse Products')} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-green-700">
                Browse Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-green-50 border border-green-100 p-2 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-green-100 text-green-700 rounded-full"><ShoppingBag size={20} /></div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-green-800">
                      {subtotal >= deliveryThreshold ? "You've unlocked FREE Delivery!" : `Add ₹${deliveryThreshold - subtotal} more for FREE Delivery`}
                    </span>
                    <span className="font-bold text-green-700">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="group flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="w-full sm:w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                      <img src={item.img || 'https://via.placeholder.com/100'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 w-full text-center sm:text-left">
                      <h4 className="font-bold text-slate-800 text-lg">{item.name}</h4>
                      <p className="text-sm text-slate-500 mb-2">Farmer: {item.farmer || '-'} • <span className="text-slate-400">{item.unit} pack</span></p>
                      <p className="font-black text-green-600 text-lg block sm:hidden">₹{(item.price || 0) * (item.qty || 1)}</p>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
                        <button onClick={() => updateCartQty?.(item._id, -1)} className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-800 cursor-pointer"><Minus size={14} /></button>
                        <span className="w-8 text-center font-bold text-sm">{item.qty || 1}</span>
                        <button onClick={() => updateCartQty?.(item._id, 1)} className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-800 cursor-pointer"><Plus size={14} /></button>
                      </div>
                      <div className="text-right hidden sm:block w-20">
                        <span className="font-black text-slate-900 text-lg">₹{(item.price || 0) * (item.qty || 1)}</span>
                      </div>
                      <button onClick={() => removeFromCart?.(item._id)} className="p-2 text-slate-300 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm sticky top-6">
                <h3 className="text-extrabold text-xl text-slate-900 mb-6">Order Summary</h3>
                <div className="space-y-3 text-sm border-b border-slate-100 pb-6 mb-6">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-bold text-slate-900">₹{subtotal}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Delivery Fee</span>{deliveryFee === 0 ? <span className="font-bold text-green-600">FREE</span> : <span className="font-bold text-slate-900">₹{deliveryFee}</span>}</div>
                </div>
                <div className="flex justify-between items-end mb-6">
                  <span className="text-slate-500 font-medium">Total Amount</span>
                  <span className="text-xl font-black text-slate-900">₹{total}</span>
                </div>

                {!showCheckout ? (
                  <button onClick={() => setShowCheckout(true)} className="w-full cursor-pointer bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg hover:shadow-green-200 transition-all active:scale-95 group">
                    Checkout Now <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Shipping Address</label>
                      <textarea value={checkoutForm.shippingAddress} onChange={(e) => setCheckoutForm({ ...checkoutForm, shippingAddress: e.target.value })} placeholder="Full address" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm" rows={2} required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Phone</label>
                      <input type="tel" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} placeholder="+91" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Payment Method</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="pm" checked={checkoutForm.paymentMethod === 'COD'} onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'COD' })} />
                          <span>Cash on Delivery</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="pm" checked={checkoutForm.paymentMethod === 'Online'} onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'Online' })} />
                          <span>UPI (Razorpay)</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowCheckout(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 cursor-pointer hover:bg-slate-50">Back</button>
                      <button onClick={handleCheckout} disabled={loading} className="flex-1 cursor-pointer bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-70">
                        {loading ? 'Processing...' : 'Place Order'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} /><span>Secure Checkout • 100% Fresh Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
