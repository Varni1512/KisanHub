import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  X, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { productsAPI, uploadAPI } from '../../utils/api';

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=100&q=80';

const ShopProducts = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const shopkeeperId = user?._id;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [uploading, setUploading] = useState(false);
  
  const initialFormState = { id: null, name: '', category: '', price: '', stock: '', unit: 'Bag', img: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!shopkeeperId) return;
    const fetchProducts = async () => {
      try {
        const res = await productsAPI.getByShopkeeper(shopkeeperId);
        if (res.success) setProducts(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [shopkeeperId]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadAPI.image(file);
      if (res.success) setFormData({ ...formData, img: res.url });
      else alert(res.message || 'Upload failed');
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const openAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({
      id: product._id,
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      unit: product.unit || 'Bag',
      img: product.img || '',
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !shopkeeperId) {
      alert("Please fill all required fields!");
      return;
    }
    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      unit: formData.unit,
      img: formData.img || DEFAULT_IMG,
      shopkeeper: shopkeeperId,
    };
    try {
      if (isEditing) {
        const res = await productsAPI.update(formData.id, payload);
        if (res.success) {
          setProducts(products.map((p) => (p._id === formData.id ? res.product : p)));
          setIsModalOpen(false);
        } else alert(res.message || 'Update failed');
      } else {
        const res = await productsAPI.create(payload);
        if (res.success) {
          setProducts([res.product, ...products]);
          setIsModalOpen(false);
        } else alert(res.message || 'Add failed');
      }
    } catch (err) {
      alert(err.message || 'Something went wrong');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await productsAPI.delete(id);
      if (res.success) setProducts(products.filter((p) => p._id !== id));
      else alert(res.message || 'Delete failed');
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans text-slate-800">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Inventory</h2>
          <p className="text-slate-500 text-sm">Manage your products, pricing and stock availability.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-slate-900 cursor-pointer hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 flex items-center gap-2 transition-all active:scale-95"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-48">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
                <select 
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 cursor-pointer appearance-none hover:bg-slate-50 transition-all"
                >
                    <option value="All">All Categories</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Pesticide">Pesticide</option>
                    <option value="Tools">Tools</option>
                </select>
            </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Status</th>
                  <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                          <img src={item.img || DEFAULT_IMG} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-slate-100" />
                          <div>
                              <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                              <p className="text-xs text-slate-400">ID: #{item._id?.slice(-6)}</p>
                          </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          {item.category}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="font-bold text-slate-800">₹{item.price}</span>
                      <span className="text-xs text-slate-400 font-medium"> / {item.unit}</span>
                    </td>
                    <td className="p-5">
                      {item.stock < 10 ? (
                          <div className="flex items-center gap-1.5 text-red-600 bg-red-50 w-fit px-3 py-1 rounded-full text-xs font-bold border border-red-100">
                              <AlertCircle size={14} /> Low Stock ({item.stock})
                          </div>
                      ) : (
                          <div className="flex items-center gap-1.5 text-green-700 bg-green-50 w-fit px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                              <CheckCircle size={14} /> In Stock ({item.stock})
                          </div>
                      )}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(item)}
                            className="p-2 cursor-pointer text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                              <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(item._id)}
                            className="p-2 cursor-pointer text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                              <Trash2 size={18} />
                          </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-slate-500">
                <p>No products found matching your search.</p>
                <button 
                    onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
                    className="mt-2 text-green-600 font-bold hover:underline"
                >
                    Clear Filters
                </button>
            </div>
          )}
        </div>
      </div>

      {/* --- ADD/EDIT PRODUCT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button 
                        onClick={() => setIsModalOpen(false)} 
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSaveProduct} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Product Image</label>
                        <label className="block border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-green-500 hover:bg-green-50/30 transition-all cursor-pointer group">
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                            {formData.img ? (
                              <img src={formData.img} alt="Preview" className="w-24 h-24 rounded-lg object-cover mb-2" />
                            ) : (
                              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                                <UploadCloud size={24} className="text-slate-400 group-hover:text-green-600" />
                              </div>
                            )}
                            <p className="text-sm font-bold text-slate-700">{uploading ? 'Uploading...' : 'Click to upload (Cloudinary)'}</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP (max 5MB)</p>
                        </label>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Product Name <span className="text-red-500">*</span></label>
                            <input 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                type="text" 
                                placeholder="Ex: Urea Gold Fertilizer" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Category <span className="text-red-500">*</span></label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all cursor-pointer appearance-none"
                            >
                                <option value="">Select Category</option>
                                <option value="Fertilizer">Fertilizer</option>
                                <option value="Seeds">Seeds</option>
                                <option value="Pesticide">Pesticide</option>
                                <option value="Tools">Tools</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Price (₹) <span className="text-red-500">*</span></label>
                            <input 
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                type="number" 
                                placeholder="0.00" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Stock Quantity <span className="text-red-500">*</span></label>
                            <input 
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                type="number" 
                                placeholder="Available units" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Unit Type</label>
                            <select 
                                name="unit"
                                value={formData.unit}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all cursor-pointer appearance-none"
                            >
                                <option value="Bag">Per Bag</option>
                                <option value="Kg">Per Kg</option>
                                <option value="Pkt">Per Packet</option>
                                <option value="Bottle">Per Bottle</option>
                                <option value="Pc">Per Piece</option>
                            </select>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="pt-4 flex gap-4 justify-end border-t border-slate-100">
                        <button 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-white hover:border-slate-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-green-600 transition-all shadow-lg shadow-slate-200"
                        >
                            {isEditing ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
      )}

    </div>
  );
};

export default ShopProducts;