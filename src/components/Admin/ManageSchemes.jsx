import React, { useState } from 'react';
import { Plus, X, ExternalLink, FileText, AlertCircle, CheckCircle2, Trash2, Edit3 } from 'lucide-react';

const ManageSchemes = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Initial Data
  const [schemes, setSchemes] = useState([
    {
      name: "PM-Kisan Samman Nidhi",
      category: "FINANCIAL",
      status: "ONGOING",
      detail: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
      apply: "Online Portal / CSC",
      link: "https://pmkisan.gov.in",
      docs: ["Aadhar Card", "Land Records", "Bank Account"],
    },
    {
      name: "PM Krishi Sinchai Yojana",
      category: "INFRASTRUCTURE",
      status: "DEC 31, 2026",
      detail: "Focuses on 'Har Khet Ko Pani' and 'Per Drop More Crop' to improve water use efficiency.",
      apply: "District Agri Office",
      link: "https://pmksy.gov.in",
      docs: ["Identity Proof", "Land Ownership", "Photo"],
    }
  ]);

  const [formData, setFormData] = useState({
    name: "", category: "FINANCIAL", detail: "", apply: "", link: "", docs: "", status: "ONGOING"
  });

  // Open Modal for Add
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ name: "", category: "FINANCIAL", detail: "", apply: "", link: "", docs: "", status: "ONGOING" });
    setShowModal(true);
  };

  // Open Modal for Edit
  const openEditModal = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    const schemeToEdit = schemes[index];
    setFormData({
      ...schemeToEdit,
      docs: schemeToEdit.docs.join(", ") // Convert array back to string for input
    });
    setShowModal(true);
  };

  // Delete Function
  const deleteScheme = (index) => {
    const updatedSchemes = schemes.filter((_, i) => i !== index);
    setSchemes(updatedSchemes);
  };

  // Save or Update Function
  const handleSave = () => {
    const formattedDocs = typeof formData.docs === 'string' 
      ? formData.docs.split(',').map(d => d.trim()) 
      : formData.docs;

    const finalData = { ...formData, docs: formattedDocs };

    if (isEditing) {
      const updatedSchemes = [...schemes];
      updatedSchemes[currentIndex] = finalData;
      setSchemes(updatedSchemes);
    } else {
      setSchemes([...schemes, finalData]);
    }
    setShowModal(false);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {schemes.map((s, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm relative group transition-hover hover:shadow-md">
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
                {s.docs.map((doc, i) => (
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
                <button onClick={() => openEditModal(idx)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                  <Edit3 size={18}/>
                </button>
                {/* Delete Button Fixed */}
                <button onClick={() => deleteScheme(idx)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
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

            <button onClick={handleSave} className="w-full mt-8 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-100 uppercase tracking-tighter">
              {isEditing ? 'Update Scheme' : 'Publish Scheme'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchemes;