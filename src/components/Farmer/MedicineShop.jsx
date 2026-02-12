import React, { useState } from 'react';
import { 
  ShoppingCart, Search, ShieldCheck, 
  Star, Info, X, Package, 
  Tag, AlertCircle, CreditCard, Truck, MapPin, CheckCircle2
} from 'lucide-react';

const MedicineShop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [orderForm, setOrderForm] = useState({
    qty: 1,
    address: '',
    paymentMethod: 'COD'
  });

  const medicines = [
    { id: 1, name: 'Urea Fertilizer Gold Edition', price: 450, category: 'Fertilizer', stock: 58, rating: 4.8, brand: 'Kisan Shakti', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800' },
    { id: 2, name: 'Premium Neem Oil Pesticide', price: 320, category: 'Pesticide', stock: 15, rating: 4.5, brand: 'BioGuard', img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800' },
    { id: 3, name: 'Hybrid Tomato F1 Seeds', price: 250, category: 'Seeds', stock: 5, rating: 4.9, brand: 'SeedPro', img: 'https://images.unsplash.com/photo-1592841608277-73d353630744?auto=format&fit=crop&w=800' },
    { id: 4, name: 'NPK 19-19-19 Soluble', price: 850, category: 'Fertilizer', stock: 120, rating: 4.7, brand: 'NutriGrow', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800' }
  ];

  const handlePlaceOrder = () => {
    if(!orderForm.address) return alert("Please enter delivery address");
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedProduct(null);
      setOrderForm({ qty: 1, address: '', paymentMethod: 'COD' });
    }, 3000);
  };

  const filtered = medicines.filter(m => 
    (category === "All" || m.category === category) &&
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-0 space-y-8 text-slate-900 bg-slate-50/20 min-h-screen relative overflow-hidden">
      
      {/* Admin Store Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">KisanHub Official Store</h1>
          <p className="text-sm font-medium text-slate-500">Official catalog for verified agricultural inputs.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search verified products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-all text-sm font-medium shadow-sm"
          />
        </div>
      </div>

      {/* Main Grid - 3 Cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <div key={m.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 transition-all duration-300 group flex flex-col shadow-sm">
            <div className="h-64 bg-slate-100 relative overflow-hidden">
              <img src={m.img} className="w-full h-full object-cover " alt={m.name} />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm">
                {m.category}
              </span>
              <div className="absolute top-4 right-4 bg-slate-900 text-white px-4 py-1.5 rounded-xl font-black text-sm shadow-2xl">
                ₹{m.price}
              </div>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{m.brand}</p>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xs"><Star size={14} fill="currentColor" /> {m.rating}</div>
                </div>
                <h3 className="font-bold text-sm text-slate-800 leading-tight">{m.name}</h3>
              </div>

              <div className="flex items-center gap-2 py-3 border-y border-slate-50 text-xs font-bold text-slate-500">
                <Package size={14} /> Stock: <span className={m.stock < 10 ? 'text-rose-500' : 'text-emerald-500'}>{m.stock} Units</span>
              </div>

              <button 
                onClick={() => setSelectedProduct(m)}
                className="w-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 py-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2  transition-all shadow-sm  cursor-pointer mt-auto"
              >
                <ShoppingCart size={16} /> Order Product Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- ORDER / CHECKOUT SIDEBAR --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800">Review Your Order</h2>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer"><X size={20}/></button>
            </div>

            {orderSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-in zoom-in">
                <div className="bg-emerald-100 text-emerald-600 p-6 rounded-full"><CheckCircle2 size={60} /></div>
                <h3 className="text-2xl font-black text-slate-800">Order Placed!</h3>
                <p className="text-slate-500 font-medium">Your order for {selectedProduct.name} has been successfully registered.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Product Summary */}
                <div className="flex gap-4 bg-slate-50 p-4 rounded-xl">
                  <img src={selectedProduct.img} className="w-20 h-20 rounded-lg object-cover" alt="product" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{selectedProduct.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{selectedProduct.brand}</p>
                    <p className="text-blue-600 font-black mt-1">₹{selectedProduct.price}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2"><MapPin size={12}/> Delivery Address</label>
                    <textarea 
                      placeholder="Enter your full village address, district and pincode..." 
                      rows="3"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Quantity</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={orderForm.qty}
                        onChange={(e) => setOrderForm({...orderForm, qty: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none font-bold" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Est. Delivery</label>
                      <div className="w-full bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs font-bold text-blue-600 flex items-center gap-2">
                        <Truck size={14}/> 2-3 Days
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[12px] font-black text-slate-400 uppercase flex items-center gap-2"><CreditCard size={12}/> Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['COD', 'Online'].map(method => (
                        <button 
                          key={method}
                          onClick={() => setOrderForm({...orderForm, paymentMethod: method})}
                          className={`py-3 rounded-lg border text-xs font-black transition-all cursor-pointer ${
                            orderForm.paymentMethod === method 
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 shadow-sm' 
                            : 'bg-white text-slate-400 border-blue-100 hover:border-slate-300'
                          }`}
                        >
                          {method === 'COD' ? 'Cash on Delivery' : 'Pay Online (UPI)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Total Summary */}
                <div className="pt-6 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-slate-500 text-xs font-medium">
                    <span>Subtotal</span>
                    <span>₹{selectedProduct.price * orderForm.qty}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-xs font-medium">
                    <span>Delivery Fee</span>
                    <span className="text-emerald-500">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-lg pt-2">
                    <span>Grand Total</span>
                    <span>₹{selectedProduct.price * orderForm.qty}</span>
                  </div>
                </div>
              </div>
            )}

            {!orderSuccess && (
              <div className="p-6 border-t">
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 py-4 rounded-xl font-semibold text-sm shadow-xl hover:bg-blue-600 transition-all active:scale-95 cursor-pointer"
                >
                  Confirm and Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineShop;