import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, MapPin, Loader2, Calendar } from 'lucide-react';
import { usersAPI } from '../../utils/api';

const UserLogins = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await usersAPI.getAll();
        if (res.success) {
          setUsers(res.users);
        } else {
          setError(res.message || 'Failed to load users');
        }
      } catch (err) {
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="p-2 flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Login Activity</h2>
        <p className="text-slate-500 mt-1">All registered users ka data yaha dekhein</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          {error}
        </div>
      )}

      {users.length === 0 && !error ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-slate-500">
          No users registered yet.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">State</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-green-100 group-hover:text-green-600 transition-colors">
                        <User size={20} />
                      </div>
                      <span className="font-semibold text-slate-700">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold w-fit">
                      <Briefcase size={14} />
                      {user.role}
                    </div>
                  </td>
                  <td className="p-5 text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      {user.state}
                    </div>
                  </td>
                  <td className="p-5 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserLogins;
