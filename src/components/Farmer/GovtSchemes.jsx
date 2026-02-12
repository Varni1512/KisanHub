import React, { useState } from 'react';
import { 
  ClipboardCheck, Link as LinkIcon, AlertCircle, 
  FileText, Search, Filter, ArrowUpRight
} from 'lucide-react';

const GovtSchemes = () => {
  const [filter, setFilter] = useState('All');

  // 10 Sample Data Entries
  const schemes = [
    {
      name: "PM-Kisan Samman Nidhi",
      category: "Financial",
      detail: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
      apply: "Online Portal / CSC",
      link: "https://pmkisan.gov.in",
      docs: ["Aadhar Card", "Land Records", "Bank Account"],
      deadline: "Ongoing"
    },
    {
      name: "PM Fasal Bima Yojana",
      category: "Insurance",
      detail: "Comprehensive insurance cover against failure of the crop, helping in stabilizing the income of farmers.",
      apply: "Bank / Online",
      link: "https://pmfby.gov.in",
      docs: ["Land Possession", "Sowing Certificate", "ID Proof"],
      deadline: "Aug 15, 2026"
    },
    {
      name: "Kisan Credit Card (KCC)",
      category: "Financial",
      detail: "Provides adequate and timely credit support from the banking system for cultivation and other needs.",
      apply: "Commercial Banks",
      link: "https://www.myscheme.gov.in",
      docs: ["Land Doc", "Passport Photo", "Aadhar"],
      deadline: "No Deadline"
    },
    {
      name: "PM Krishi Sinchai Yojana",
      category: "Infrastructure",
      detail: "Focuses on 'Har Khet Ko Pani' and 'Per Drop More Crop' to improve water use efficiency.",
      apply: "District Agri Office",
      link: "https://pmksy.gov.in",
      docs: ["Identity Proof", "Land Ownership", "Photo"],
      deadline: "Dec 31, 2026"
    },
    {
      name: "Soil Health Card Scheme",
      category: "Infrastructure",
      detail: "Provides information to farmers on nutrient status of their soil along with recommendations.",
      apply: "Soil Testing Labs",
      link: "https://soilhealth.dac.gov.in",
      docs: ["Soil Sample", "Aadhar Card"],
      deadline: "Open"
    },
    {
      name: "E-NAM Portal",
      category: "Infrastructure",
      detail: "A pan-India electronic trading portal which networks existing APMC mandis for a unified market.",
      apply: "Online Registration",
      link: "https://enam.gov.in",
      docs: ["Bank Details", "ID Proof"],
      deadline: "No Deadline"
    },
    {
      name: "Paramparagat Krishi Vikas",
      category: "Financial",
      detail: "Promotes organic farming through a cluster approach and PGS India certification.",
      apply: "State Govt",
      link: "https://pgsindia-ncof.gov.in",
      docs: ["Cluster Member ID", "ID Proof"],
      deadline: "Sept 30, 2026"
    },
    {
      name: "Livestock Insurance Scheme",
      category: "Insurance",
      detail: "Provides protection mechanism to the farmers against loss of their animals due to death.",
      apply: "Veterinary Officer",
      link: "https://dahd.nic.in",
      docs: ["Health Certificate", "Ear Tag", "Photo"],
      deadline: "Open"
    },
    {
      name: "PM Kusum Scheme",
      category: "Infrastructure",
      detail: "Provides solar pumps and other renewable energy plants to farmers for irrigation.",
      apply: "DISCOM / Online",
      link: "https://mnre.gov.in",
      docs: ["Land Papers", "Aadhar Card", "Photo"],
      deadline: "Nov 30, 2026"
    },
    {
      name: "National Bamboo Mission",
      category: "Infrastructure",
      detail: "Increase the area under bamboo plantation in non-forest Government and private lands.",
      apply: "State Mission",
      link: "https://nbm.nic.in",
      docs: ["Land Records", "Bank Passbook"],
      deadline: "Dec 15, 2026"
    }
  ];

  const filteredSchemes = filter === 'All' ? schemes : schemes.filter(s => s.category === filter);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchemes.map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm hover:border-blue-400 transition-all group">
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                {s.category}
              </span>
              
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold border uppercase ${
                s.deadline === 'Ongoing' || s.deadline === 'Open' || s.deadline === 'No Deadline'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                <AlertCircle size={12} /> {s.deadline}
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
                {s.docs.map(doc => (
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
        ))}
      </div>
    </div>
  );
};

export default GovtSchemes;