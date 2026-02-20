import React, { useState, useEffect } from 'react';
import { AlertCircle, FileText, ArrowUpRight, Loader2 } from 'lucide-react';
import { schemesAPI } from '../../utils/api';

const categoryDisplay = {
  FINANCIAL: 'Financial',
  INSURANCE: 'Insurance',
  INFRASTRUCTURE: 'Infrastructure',
};

const GovtSchemes = () => {
  const [filter, setFilter] = useState('All');
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredSchemes = filter === 'All'
    ? schemes
    : schemes.filter(s => categoryDisplay[s.category] === filter);

  return (
    <div className="p-0 space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Government Schemes</h1>
          <p className="text-slate-500 text-sm">Policy support and welfare programs for farmers.</p>
        </div>
        
        {/* Category Filter */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['All', 'Financial', 'Insurance', 'Infrastructure'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-10 h-10 animate-spin text-green-600" />
        </div>
      ) : filteredSchemes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
          No government schemes available at the moment.
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchemes.map((s) => {
          const deadline = s.status === 'ONGOING' ? 'Ongoing' : s.status;
          const isOpen = deadline === 'Ongoing' || deadline === 'Open' || deadline === 'No Deadline';

          return (
          <div key={s._id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm hover:border-blue-400 transition-all group">
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                {categoryDisplay[s.category] || s.category}
              </span>
              
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold border uppercase ${
                isOpen ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                <AlertCircle size={12} /> {deadline}
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2">{s.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              {s.detail}
            </p>

            {/* Document Checklist Area */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                <FileText size={12}/> Required Documents
              </p>
              <div className="flex flex-wrap gap-2">
                {(s.docs || []).map(doc => (
                  <span key={doc} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-[11px] font-medium text-slate-600 shadow-sm">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Apply Via</p>
                <p className="text-xs font-bold text-slate-700">{s.apply}</p>
              </div>
              
              <a 
                href={s.link} 
                target="_blank" 
                rel="noreferrer"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-xs hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                Official Portal <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default GovtSchemes;
