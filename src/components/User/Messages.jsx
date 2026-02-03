import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Smile, 
  CheckCheck,
  ArrowLeft
} from 'lucide-react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null); // Start with null for mobile view
  const [inputMsg, setInputMsg] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle Resize to auto-select chat on desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && activeChat === null) {
        setActiveChat(0); // Desktop par pehla chat select karein
      }
    };
    
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeChat]);

  // Dummy Contacts Data
  const contacts = [
    { id: 0, name: 'Ram Singh (Farmer)', msg: 'Haan ji, main 5 baje tak bhej dunga.', time: '10:30 AM', unread: 0, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80', online: true },
    { id: 1, name: 'Sita Devi', msg: 'The potatoes are fresh, madam.', time: 'Yesterday', unread: 2, img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=100&q=80', online: false },
    { id: 2, name: 'Green Valley Organic', msg: 'Bill sent ✅', time: 'Yesterday', unread: 0, img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=100&q=80', online: false },
    { id: 3, name: 'Ravi Kumar', msg: 'Payment received?', time: 'Tue', unread: 0, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', online: true },
    { id: 4, name: 'Fresh Fruits Co.', msg: 'New stock available!', time: 'Mon', unread: 5, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', online: false },
  ];

  // Dummy Chat History
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Your order of fresh carrots is being packed.", sender: 'them', time: "10:05 AM", status: 'read' },
    { id: 2, text: "It will be delivered by 5 PM today.", sender: 'them', time: "10:06 AM", status: 'read' },
    { id: 3, text: "Great, thank you! Please make sure they are washed properly.", sender: 'me', time: "10:10 AM", status: 'read' },
    { id: 4, text: "Haan ji, main 5 baje tak bhej dunga bilkul saaf karke.", sender: 'them', time: "10:30 AM", status: 'read' },
  ]);

  const handleSend = () => {
    if (inputMsg.trim() === '') return;
    const newMsg = {
        id: Date.now(),
        text: inputMsg,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
    };
    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  // Determine currently active contact data
  const currentContact = contacts.find(c => c.id === activeChat) || contacts[0];

  return (
    <div className="flex h-[90vh] md:h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200 font-sans relative">
      
      {/* LEFT SIDEBAR (Contact List) 
          Logic: 
          - Mobile par: Agar activeChat 'null' hai toh dikhao, warna chupao (hidden).
          - Desktop par: Hamesha dikhao (md:flex).
      */}
      <div className={`w-full md:w-[350px] bg-white border-r border-slate-200 flex-col ${activeChat !== null ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Sidebar Header */}
        <div className="h-16 bg-slate-100 flex items-center justify-between px-4 border-b border-slate-200 flex-shrink-0">
           <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="My Profile" className="w-full h-full object-cover" />
           </div>
           <div className="flex gap-4 text-slate-600">
             <MoreVertical size={20} className="cursor-pointer" />
           </div>
        </div>

        {/* Search Bar */}
        <div className="p-2 border-b border-slate-100 bg-white">
          <div className="bg-slate-100 flex items-center px-3 py-2 rounded-lg">
             <Search size={18} className="text-slate-500" />
             <input className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder-slate-500" placeholder="Search or start new chat" />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div 
                key={contact.id} 
                onClick={() => setActiveChat(contact.id)}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-50 ${activeChat === contact.id ? 'bg-slate-100' : ''}`}
            >
              <div className="relative">
                <img src={contact.img} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium text-slate-800 truncate">{contact.name}</h4>
                  <span className={`text-xs ${contact.unread > 0 ? 'text-green-600 font-bold' : 'text-slate-400'}`}>{contact.time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-slate-500 truncate">{contact.msg}</p>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (Chat Window) 
          Logic:
          - Mobile par: Agar activeChat 'null' nahi hai (koi chat selected hai), tabhi dikhao.
          - Desktop par: Hamesha dikhao (md:flex).
      */}
      <div className={`flex-1 flex-col bg-[#efeae2] relative ${activeChat === null ? 'hidden md:flex' : 'flex'} w-full`}>
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]"></div>

        {/* Chat Header */}
        <div className="h-16 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-4 z-10 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            {/* Back Button for Mobile */}
            <button className="md:hidden cursor-pointer text-slate-600 p-1 -ml-2 rounded-full active:bg-slate-200" onClick={() => setActiveChat(null)}>
                <ArrowLeft size={24} />
            </button>
            
            <img src={currentContact.img} alt="User" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col ml-1 cursor-pointer">
              <h4 className="font-semibold text-slate-800 text-sm leading-tight">{currentContact.name}</h4>
              <p className="text-xs text-slate-500">{currentContact.online ? 'Online' : 'Last seen today at 10:00 AM'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 text-slate-600">
             {/* <Video size={20} className="cursor-pointer hidden sm:block hover:text-green-600" />
             <Phone size={20} className="cursor-pointer hover:text-green-600" />
             <Search size={20} className="cursor-pointer hidden sm:block" /> */}
             <MoreVertical size={20} className="cursor-pointer" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 z-10 scrollbar-thin scrollbar-thumb-slate-300">
           {/* Date Separator */}
           <div className="flex justify-center my-4 sticky top-0 z-20">
             <span className="bg-white/90 backdrop-blur-sm text-slate-600 text-xs px-3 py-1 rounded-lg shadow-sm border border-slate-100">Today</span>
           </div>

           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
               <div 
                 className={`relative max-w-[85%] sm:max-w-[60%] px-3 py-2 text-sm rounded-lg shadow-sm 
                 ${msg.sender === 'me' ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'}`}
               >
                 <p className="text-slate-800 leading-relaxed pr-6 break-words">{msg.text}</p>
                 <div className="flex items-center justify-end gap-1 mt-1 select-none float-right -mb-1">
                    <span className="text-[10px] text-slate-500 leading-none">{msg.time}</span>
                    {msg.sender === 'me' && (
                        <CheckCheck size={14} className="text-blue-500" />
                    )}
                 </div>
               </div>
             </div>
           ))}
        </div>

        {/* Input Area */}
        <div className="bg-slate-100 px-2 sm:px-4 py-2 flex items-center gap-2 z-10 flex-shrink-0">
           <button className="text-slate-500 hover:text-slate-700 p-2 hidden sm:block">
             <Smile size={24} />
           </button>
           <button className="text-slate-500 hover:text-slate-700 p-2">
             <Paperclip size={24} />
           </button>
           
           <div className="flex-1 bg-white rounded-full sm:rounded-lg flex items-center px-4 py-2 border border-white focus-within:border-white shadow-sm">
             <input 
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-500" 
                placeholder="Type a message" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
           </div>

           {inputMsg.trim() ? (
               <button onClick={handleSend} className="bg-green-600 cursor-pointer text-white p-2.5 rounded-full hover:bg-green-700 transition-colors shadow-sm">
                  <Send size={20} />
               </button>
           ) : (
               <button className="bg-green-600 cursor-pointer text-white p-2.5 rounded-full hover:bg-green-700 transition-colors shadow-sm">
                  <Mic size={20} />
               </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default Messages;