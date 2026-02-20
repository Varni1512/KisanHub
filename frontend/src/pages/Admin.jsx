import React, { useState } from 'react';
import UserLogins from '../components/Admin/UserLogins';
import ManageSchemes from '../components/Admin/ManageSchemes';
import AdminSidebar from '../components/Admin/AdminSidebar';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('logins');

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
