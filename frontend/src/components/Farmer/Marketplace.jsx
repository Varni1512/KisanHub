import React, { useState, useRef } from 'react';
import {
  Plus, Search, Edit3, Trash2,
  CheckCircle2, AlertCircle, X, ImagePlus,
  ChevronLeft, ChevronRight, Scale
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/index.css';

const Marketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      category: 'Vegetables',
      price: '40',
      unit: 'Kg',
      stock: 50,
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1592841608277-73d353630744?auto=format&fit=crop&w=100'
    },
    {
      id: 2,
      name: 'Alphonso Mangoes',
      category: 'Fruits',
      price: '1200',
      unit: 'Dozen',
      stock: 10,
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=100'
    },
    {
      id: 3,
      name: 'Organic Turmeric Powder',
      category: 'Spices',
      price: '150',
      unit: 'Gram',
      stock: 500,
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=100'
    },
    {
      id: 4,
      name: 'Premium NPK Fertilizer',
      category: 'Farming Tools',
      price: '850',
      unit: 'Bag',
      stock: 3,
      status: 'Low Stock',
      img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=100'
    },
    {
      id: 5,
      name: 'Fresh Green Chili',
      category: 'Vegetables',
      price: '20',
      unit: 'Gram',
      stock: 1000,
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1588252390732-006b6cc74012?auto=format&fit=crop&w=100'
    },
    {
      id: 6,
      name: 'Red Gala Apples',
      category: 'Fruits',
      price: '180',
      unit: 'Kg',
      stock: 25,
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1560806887-1e4707f394b2?auto=format&fit=crop&w=100'
    },
    {
      id: 7,
      name: 'Hybrid Carrot Seeds',
      category: 'Seeds',
      price: '250',
      unit: 'Pkt',
      stock: 15,
      status: 'In Stock',
      img: 'https://images.unsplash.com/photo-1590865104672-520330926710?auto=format&fit=crop&w=100'
    },
    {
      id: 8,
      name: 'Manual Hand Sprayer',
      category: 'Farming Tools',
      price: '450',
      unit: 'Piece',
      stock: 2,
      status: 'Low Stock',
      img: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&w=100'
    }
  ]);

  const [formData, setFormData] = useState({ name: '', category: 'Vegetables', price: '', unit: 'select', stock: '', img: '' });

  // --- Pagination Logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // --- Functions ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, img: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error("Zaroori jankari bharein!");
      return;
    }
    const status = parseInt(formData.stock) > 10 ? 'In Stock' : 'Low Stock';
    const finalData = { ...formData, status, img: formData.img || 'https://via.placeholder.com/100' };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...finalData, id: p.id } : p));
      toast.info("Update ho gaya! ✅");
    } else {
      setProducts([...products, { ...finalData, id: Date.now() }]);
      toast.success("Naya product add ho gaya! 🚀");
    }
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-0 ">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Marketplace Inventory</h1>
          <p className="text-slate-500 text-xs md:text-sm">Manage your sales unit and pricing.</p>
        </div>
        <button onClick={() => { setEditingProduct(null); setFormData({ name: '', category: 'Vegetables', price: '', unit: 'select', stock: '', img: '' }); setShowModal(true); }}
          className="w-full sm:w-auto bg-[#0f172a] cursor-pointer text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md hover:bg-slate-800 transition-all">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-400">
            <tr>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider">Product</th>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider">Category</th>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-center">Price / Unit</th>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider">Stock</th>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {currentProducts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-all group">
                <td className="px-5 py-4 flex items-center gap-3 font-bold text-slate-700">
                  <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover" /> {p.name}
                </td>
                <td className="px-5 py-4">
                  <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full text-[10px] font-bold">{p.category}</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg inline-block font-black">
                    ₹{p.price} <span className="text-[10px] font-medium opacity-70">/ {p.unit}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${p.status === 'In Stock' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-500'}`}>
                    {p.stock} {p.unit} ({p.status})
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setEditingProduct(p); setFormData(p); setShowModal(true); }} className="p-2 cursor-pointer text-slate-400 hover:text-slate-900"><Edit3 size={16} /></button>
                    <button onClick={() => { if (window.confirm("Delete?")) setProducts(products.filter(item => item.id !== p.id)) }} className="p-2 cursor-pointer text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6 px-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Page {currentPage} of {totalPages}</p>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-2 border cursor-pointer rounded-lg disabled:opacity-30"><ChevronLeft size={18} /></button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-2 cursor-pointer border rounded-lg disabled:opacity-30"><ChevronRight size={18} /></button>
        </div>
      </div>

      {/* Modal with Gram/Kg Options */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute cursor-pointer top-6 right-6 text-slate-400"><X size={20} /></button>
            <h2 className="text-xl font-bold mb-6 text-slate-900">{editingProduct ? 'Edit Details' : 'Add New Item'}</h2>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Product Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl outline-none" placeholder="e.g. Red Chili" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">
                    Unit Type
                  </label>

                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl outline-none cursor-pointer appearance-none"
                  >
                    <option value="select" disabled>Select unit</option>
                    <option value="Kg">Kilogram (Kg)</option>
                    <option value="Gram">Gram (g)</option>
                    <option value="Quintal">Quintal</option>
                    <option value="Dozen">Dozen</option>
                    <option value="Piece">Piece</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Stock ({formData.unit})</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl outline-none" placeholder="e.g. 50" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Price per {formData.unit} (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full pl-8 pr-4 py-3 bg-slate-50 border rounded-xl outline-none" placeholder="0.00" />
                </div>
              </div>

              <div onClick={() => fileInputRef.current.click()} className="border-2 cursor-pointer border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-400 bg-slate-50 h-32 relative overflow-hidden">
                {formData.img ? <img src={formData.img} alt="" className="w-full h-full object-cover rounded-xl" /> : <><ImagePlus size={24} /><p className="text-[10px] font-bold mt-2">Upload Product Photo</p></>}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>
            </div>

            <button onClick={handleSaveProduct} className="cursor-pointer w-full mt-8 bg-[#0f172a] text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all active:scale-95">
              {editingProduct ? 'Save Changes' : 'List in Marketplace'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;