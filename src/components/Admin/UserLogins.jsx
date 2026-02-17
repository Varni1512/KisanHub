import React from 'react';
import { User, Mail, Briefcase, MapPin } from 'lucide-react';

const UserLogins = () => {
  const users = [
    { id: 1, name: 'Rajesh Patel', email: 'rajesh@example.com', role: 'Farmer', state: 'Madhya Pradesh' },
    { id: 2, name: 'Amit Kumar', email: 'amit@example.com', role: 'Seller', state: 'Uttar Pradesh' },
    { id: 3, name: 'Suresh Singh', email: 'suresh@example.com', role: 'Farmer', state: 'Punjab' },
  ];

  return (
    <div className="p-2">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Login Activity</h2>
        <p className="text-slate-500 mt-1">Sare registered users ka data yaha dekhein</p>
      </div>

      {/* Desktop Table Design */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</th>
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Select Role</th>
              <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                {/* Name */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                      <User size={20} />
                    </div>
                    <span className="font-semibold text-slate-700">{user.name}</span>
                  </div>
                </td>
                {/* Email */}
                <td className="p-5 text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" />
                    {user.email}
                  </div>
                </td>
                {/* Role */}
                <td className="p-5">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold w-fit">
                    <Briefcase size={14} />
                    {user.role}
                  </div>
                </td>
                {/* State */}
                <td className="p-5 text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    {user.state}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLogins;