import React, { useState } from 'react';
import { 
  Trash2, 
  ChevronRight, 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShoppingBag, 
  Ticket,
  ShieldCheck
} from 'lucide-react';

const Cart = () => {
  // Realistic Cart State
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Fresh Broccoli', farmer: 'Green Valley', price: 60, unit: 'pc', qty: 2, img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Red Tomatoes', farmer: 'Sunil Singh', price: 40, unit: 'kg', qty: 1, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Organic Honey', farmer: 'Bee Farms', price: 350, unit: '500g', qty: 1, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=150&q=80' },
  ]);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryThreshold = 500;
  const deliveryFee = subtotal >= deliveryThreshold ? 0 : 40;
  const total = subtotal + deliveryFee;
  const progress = Math.min((subtotal / deliveryThreshold) * 100, 100);

  // Handlers (Visual only for demo)
  const updateQty = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-1 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
            
            <h1 className="text-2xl font-extrabold text-slate-900">Shopping Cart <span className="text-slate-400 font-medium text-lg">({cartItems.length} items)</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Free Delivery Progress Bar */}
            <div className="bg-green-50 border border-green-100 p-2 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-green-100 text-green-700 rounded-full">
                    <ShoppingBag size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-green-800">
                            {subtotal >= deliveryThreshold 
                                ? "You've unlocked FREE Delivery!" 
                                : `Add ₹${deliveryThreshold - subtotal} more for FREE Delivery`
                            }
                        </span>
                        <span className="font-bold text-green-700">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Cart List */}
            <div className="space-y-4">
                {cartItems.map((item) => (
                <div key={item.id} className="group flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all">
                    
                    {/* Image */}
                    <div className="w-full sm:w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full text-center sm:text-left">
                        <h4 className="font-bold text-slate-800 text-lg">{item.name}</h4>
                        <p className="text-sm text-slate-500 mb-2">Farmer: {item.farmer} • <span className="text-slate-400">{item.unit} pack</span></p>
                        <p className="font-black text-green-600 text-lg block sm:hidden">₹{item.price * item.qty}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                        {/* Quantity */}
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
                            <button onClick={() => updateQty(item.id, -1)} className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-800 cursor-pointer">
                                <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-500 hover:text-slate-800 cursor-pointer">
                                <Plus size={14} />
                            </button>
                        </div>

                        {/* Price (Desktop) */}
                        <div className="text-right hidden sm:block w-20">
                            <span className="font-black text-slate-900 text-lg">₹{item.price * item.qty}</span>
                        </div>

                        {/* Remove */}
                        <button className="p-2 text-slate-300 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm sticky top-6">
                <h3 className="font-extrabold text-xl text-slate-900 mb-6">Order Summary</h3>
                
                {/* Stats */}
                <div className="space-y-3 text-sm border-b border-slate-100 pb-6 mb-6">
                    <div className="flex justify-between text-slate-500">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-900">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                        <span>Delivery Fee</span>
                        {deliveryFee === 0 ? (
                            <span className="font-bold text-green-600">FREE</span>
                        ) : (
                            <span className="font-bold text-slate-900">₹{deliveryFee}</span>
                        )}
                    </div>
                    <div className="flex justify-between text-slate-500">
                        <span>Tax (5%)</span>
                        <span className="font-bold text-slate-900">₹{Math.round(subtotal * 0.05)}</span>
                    </div>
                </div>

                {/* Promo Code Input */}
                <div className="flex gap-2 mb-6">
                    <div className="relative flex-1">
                        <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500/20" placeholder="Promo Code" />
                    </div>
                    <button className="px-4 py-2 bg-slate-900 cursor-pointer text-white rounded-xl text-sm font-bold hover:bg-slate-800">Apply</button>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-500 font-medium">Total Amount</span>
                    <span className="text-xl font-black text-slate-900">₹{total + Math.round(subtotal * 0.05)}</span>
                </div>

                {/* Checkout Button */}
                <button className="w-full cursor-pointer bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all active:scale-95 group">
                    Checkout Now 
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck size={14} />
                    <span>Secure Checkout • 100% Fresh Guarantee</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;