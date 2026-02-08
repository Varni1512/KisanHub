import React, { useState, useRef, useEffect } from 'react';
import {
  Plus, Edit3, Trash2, X, ImagePlus,
  ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { farmerProductsAPI, uploadAPI } from '../../utils/api';

const Marketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const farmerId = user?._id;
  const isFarmer = user?.role === 'Farmer';

  const [formData, setFormData] = useState({ name: '', category: 'Vegetables', price: '', unit: 'Kg', stock: '', img: '', location: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await farmerProductsAPI.getAll();
      if (res.success && res.products) setProducts(res.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSaving(true);
    try {
      const res = await uploadAPI.image(file);
      if (res.success && res.url) setFormData((prev) => ({ ...prev, img: res.url }));
      else toast.error(res.message || 'Upload failed');
    } catch (err) {
      toast.error('Upload failed');
    }
    setSaving(false);
  };

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.price || formData.stock === '' || formData.stock === undefined) {
      toast.error('Zaroori jankari bharein!');
      return;
    }
    if (!farmerId || !isFarmer) {
      toast.error('Only farmers can add products');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        unit: formData.unit || 'Kg',
        stock: Number(formData.stock),
        img: formData.img || '',
        farmer: farmerId,
        location: formData.location || '',
      };
      if (editingProduct) {
        const res = await farmerProductsAPI.update(editingProduct._id, payload);
        if (res.success) {
          setProducts((prev) => prev.map((p) => (p._id === editingProduct._id ? res.product : p)));
          toast.success('Update ho gaya!');
        } else toast.error(res.message || 'Update failed');
      } else {
        const res = await farmerProductsAPI.create(payload);
        if (res.success) {
          setProducts((prev) => [res.product, ...prev]);
          toast.success('Naya product add ho gaya!');
        } else toast.error(res.message || 'Add failed');
      }
      setShowModal(false);
    } catch (err) {
      toast.error('Something went wrong');
    }
    setSaving(false);
  };

  const handleDelete = async (p) => {
    if (!window.confirm('Delete this product?')) return;
    const res = await farmerProductsAPI.delete(p._id);
    if (res.success) {
      setProducts((prev) => prev.filter((item) => item._id !== p._id));
      toast.success('Deleted');
    } else toast.error(res.message || 'Delete failed');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: 'Vegetables', price: '', unit: 'Kg', stock: '', img: '', location: '' });
    setShowModal(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category || 'Vegetables',
      price: p.price?.toString() || '',
      unit: p.unit || 'Kg',
      stock: p.stock?.toString() || '',
      img: p.img || '',
      location: p.location || '',
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-0">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Marketplace Inventory</h1>
          <p className="text-slate-500 text-xs md:text-sm">Manage your sales unit and pricing.</p>
        </div>
        {isFarmer && (
          <button onClick={openAddModal} className="w-full sm:w-auto bg-[#0f172a] cursor-pointer text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md hover:bg-slate-800 transition-all">
            <Plus size={18} /> Add Product
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-400">
            <tr>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider">Product</th>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider">Category</th>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-center">Price / Unit</th>
              <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider">Stock</th>
              {isFarmer && <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {currentProducts.map((p) => (
              <tr key={p._id} className="hover:bg-slate-50/80 transition-all group">
                <td className="px-5 py-4 flex items-center gap-3 font-bold text-slate-700">
                  <img src={p.img || 'https://via.placeholder.com/100'} alt="" className="w-10 h-10 rounded-lg object-cover" /> {p.name}
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
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${p.stock > 10 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-500'}`}>
                    {p.stock} {p.unit} ({p.stock > 10 ? 'In Stock' : 'Low Stock'})
                  </div>
                </td>
                {isFarmer && (
                  <td className="px-5 py-4 text-right">
                    {p.farmer?._id === farmerId || p.farmer === farmerId ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(p)} className="p-2 cursor-pointer text-slate-400 hover:text-slate-900"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(p)} className="p-2 cursor-pointer text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    ) : null}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <p className="text-center py-8 text-slate-500">No products yet. Add products to get started.</p>
      )}

      <div className="flex items-center justify-between mt-6 px-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Page {currentPage} of {totalPages}</p>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-2 border cursor-pointer rounded-lg disabled:opacity-30"><ChevronLeft size={18} /></button>
          <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-2 cursor-pointer border rounded-lg disabled:opacity-30"><ChevronRight size={18} /></button>
        </div>
      </div>

      {showModal && isFarmer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowModal(false)} className="absolute cursor-pointer top-6 right-6 text-slate-400"><X size={20} /></button>
            <h2 className="text-xl font-bold mb-6 text-slate-900">{editingProduct ? 'Edit Details' : 'Add New Item'}</h2>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Product Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl outline-none" placeholder="e.g. Red Chili" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl outline-none cursor-pointer">
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Spices">Spices</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Seeds">Seeds</option>
                  <option value="Farming Tools">Farming Tools</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Unit Type</label>
                  <select value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl outline-none cursor-pointer">
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

              <div onClick={() => fileInputRef.current?.click()} className="border-2 cursor-pointer border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-400 bg-slate-50 h-32 relative overflow-hidden">
                {formData.img ? <img src={formData.img} alt="" className="w-full h-full object-cover rounded-xl" /> : <><ImagePlus size={24} /><p className="text-[10px] font-bold mt-2">Upload Product Photo</p></>}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>
            </div>

            <button onClick={handleSaveProduct} disabled={saving} className="cursor-pointer w-full mt-8 bg-[#0f172a] text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70">
              {saving ? <Loader2 size={18} className="animate-spin mx-auto" /> : (editingProduct ? 'Save Changes' : 'List in Marketplace')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
