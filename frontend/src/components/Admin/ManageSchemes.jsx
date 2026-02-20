import React, { useState, useEffect } from 'react';
import { Plus, X, ExternalLink, FileText, AlertCircle, CheckCircle2, Trash2, Edit3, Loader2 } from 'lucide-react';
import { schemesAPI } from '../../utils/api';

const ManageSchemes = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [schemes, setSchemes] = useState([]);

  const [formData, setFormData] = useState({
    name: "", category: "FINANCIAL", detail: "", apply: "", link: "", docs: "", status: "ONGOING"
  });

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await schemesAPI.getAll();
        if (res.success) setSchemes(res.schemes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  // Open Modal for Add
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: "", category: "FINANCIAL", detail: "", apply: "", link: "", docs: "", status: "ONGOING" });
    setShowModal(true);
  };

  // Open Modal for Edit
  const openEditModal = (scheme) => {
    setIsEditing(true);
    setCurrentId(scheme._id);
    setFormData({
      ...scheme,
      docs: Array.isArray(scheme.docs) ? scheme.docs.join(", ") : scheme.docs
    });
    setShowModal(true);
  };

  // Delete Function
  const deleteScheme = async (id) => {
    if (!confirm('Are you sure you want to delete this scheme?')) return;
    try {
      const res = await schemesAPI.delete(id);
      if (res.success) setSchemes(schemes.filter((s) => s._id !== id));
      else alert(res.message || 'Failed to delete');
    } catch (err) {
      alert(err.message || 'Failed to delete');
    }
  };

  // Save or Update Function
  const handleSave = async () => {
    const formattedDocs = typeof formData.docs === 'string'
      ? formData.docs.split(',').map(d => d.trim()).filter(Boolean)
      : formData.docs;

    const payload = {
      name: formData.name,
      category: formData.category,
      status: formData.status,
      detail: formData.detail,
      apply: formData.apply,
      link: formData.link,
      docs: formattedDocs,
    };

    setSaving(true);
    try {
      if (isEditing) {
        const res = await schemesAPI.update(currentId, payload);
        if (res.success) {
          setSchemes(schemes.map((s) => (s._id === currentId ? res.scheme : s)));
          setShowModal(false);
        } else alert(res.message || 'Failed to update');
      } else {
        const res = await schemesAPI.create(payload);
        if (res.success) {
          setSchemes([res.scheme, ...schemes]);
          setShowModal(false);
        } else alert(res.message || 'Failed to add');
      }
    } catch (err) {
      alert(err.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-1 animate-in fade-in">
      <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Schemes</h2>
          <p className="text-slate-500 text-sm">Update or remove government welfare programs.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Plus size={20} /> New Scheme
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-10 h-10 animate-spin text-green-600" />
        </div>
      ) : schemes.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center text-slate-500">
          No schemes yet. Click "New Scheme" to add one.
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {schemes.map((s) => (
          <div key={s._id} className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm relative group transition-hover hover:shadow-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase">{s.category}</span>
              <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md ${s.status === 'ONGOING' ? 'text-green-600 bg-green-50' : 'text-pink-600 bg-pink-50'}`}>
                {s.status === 'ONGOING' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} {s.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">{s.name}</h3>
            <p className="text-slate-500 text-[14px] leading-relaxed mb-8">{s.detail}</p>

            <div className="bg-slate-50 rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                <FileText size={14} /> Required Documents
              </div>
              <div className="flex flex-wrap gap-2">
                {(s.docs || []).map((doc, i) => (
                  <span key={i} className="bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">{doc}</span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-end border-t pt-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-sans">Apply Via</p>
                <p className="text-[13px] font-bold text-slate-800">{s.apply}</p>
              </div>
              <div className="flex gap-2">
                {/* Edit Button */}
                <button onClick={() => openEditModal(s)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                  <Edit3 size={18}/>
                </button>
                {/* Delete Button Fixed */}
                <button onClick={() => deleteScheme(s._id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                  <Trash2 size={18}/>
                </button>
                <a href={s.link} target="_blank" className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold ml-2">
                  Portal <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* --- ADD/EDIT MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl p-8 shadow-2xl relative animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X /></button>
            <h3 className="text-2xl font-bold mb-8 text-slate-800 border-b pb-4">{isEditing ? 'Edit Scheme' : 'Add New Scheme'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">Scheme Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none font-medium text-sm" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none font-bold text-sm">
                  <option value="FINANCIAL">Financial</option>
                  <option value="INSURANCE">Insurance</option>
                  <option value="INFRASTRUCTURE">Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Status / Date</label>
                <input type="text" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none font-bold text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Details</label>
                <textarea rows="3" value={formData.detail} onChange={(e) => setFormData({...formData, detail: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none font-medium text-sm"></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Documents (Comma Separated)</label>
                <input type="text" value={formData.docs} onChange={(e) => setFormData({...formData, docs: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none font-medium text-sm" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Apply Via</label>
                <input type="text" value={formData.apply} onChange={(e) => setFormData({...formData, apply: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none font-medium text-sm" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-widest">Portal Link</label>
                <input type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full bg-slate-50 border-none rounded-xl p-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 outline-none font-medium text-sm" />
              </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="w-full mt-8 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-100 uppercase tracking-tighter disabled:opacity-70 disabled:cursor-not-allowed">
              {saving ? 'Saving...' : (isEditing ? 'Update Scheme' : 'Publish Scheme')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchemes;