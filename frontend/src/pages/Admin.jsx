import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLogins from '../components/Admin/UserLogins';
import ManageSchemes from '../components/Admin/ManageSchemes';
import AdminSidebar from '../components/Admin/AdminSidebar';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('logins');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user?._id) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.role !== 'Admin') {
      const routes = { Farmer: '/farmer', User: '/user', Seller: '/user', 'Medicine Shopkeeper': '/medicine' };
      navigate(routes[user.role] || '/user', { replace: true });
    }
  }, [user?._id, user?.role, navigate]);

  const renderAdminContent = () => {
    switch (activeTab) {
      case 'logins': 
        return <UserLogins />;
      case 'schemes': 
        return <ManageSchemes />;
      default: 
        return <UserLogins />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-10">
        {/* <header className="mb-10 flex justify-between items-center">
          <div>
            <p className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
              System Control
            </p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              {activeTab === 'logins' ? 'User Activity' : 'Scheme Manager'}
            </h1>
          </div>
        </header> */}

        <div className="max-w-7xl">
          {renderAdminContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
