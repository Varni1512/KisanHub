import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { authAPI } from '../utils/api';
import { getLanguageFromState } from '../utils/stateToLanguage';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [state, setState] = useState('');

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const roles = [
    { name: "Farmer", route: "/farmer" },
    { name: "User", route: "/user" },
    { name: "Seller", route: "/seller" },
    { name: "Medicine Shopkeeper", route: "/medicine" }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login({ email: loginEmail, password: loginPassword });
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.user));
        // Store default language from state (login state or user's registered state)
        const stateForLang = res.user.state;
        const langCode = getLanguageFromState(stateForLang);
        if (langCode) {
          localStorage.setItem('preferredLang', langCode);
          document.cookie = `googtrans=/en/${langCode};path=/;max-age=31536000`;
        }
        navigate(res.user.route);
      } else {
        alert(res.message || 'Login failed');
      }
    } catch (err) {
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert('Please select your role to continue!');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.signup({
        name,
        email: signupEmail,
        password: signupPassword,
        role: selectedRole,
        state,
      });
      if (res.success) {
        localStorage.setItem('user', JSON.stringify(res.user));
        // Store default language from user's state
        const langCode = getLanguageFromState(state);
        if (langCode) {
          localStorage.setItem('preferredLang', langCode);
          document.cookie = `googtrans=/en/${langCode};path=/;max-age=31536000`;
        }
        navigate(res.user.route);
      } else {
        alert(res.message || 'Signup failed');
      }
    } catch (err) {
      alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -20 : 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? 20 : -20 }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center p-4 md:p-4 font-sans min-h-screen overflow-hidden">

      <motion.div 
        layout
        className="max-w-xl w-full bg-white rounded-xl shadow-2xl shadow-slate-200 border border-slate-100 lg:max-h-[90vh] overflow-hidden"
      >
        <div className="p-8 md:p-8">
          
          <div className="text-center mb-10">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="inline-block p-4 bg-green-50 rounded-2xl mb-4">
              <img src="logo.png" alt="KisanHub" className="h-20 w-auto object-contain" />
            </motion.div>
            <h2 className="text-3xl font-black text-slate-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              /* --- LOGIN FORM (No Role Selection) --- */
              <motion.form key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input required type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="example@mail.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-green-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input required type={showPass ? "text" : "password"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-green-500 outline-none transition-all" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full cursor-pointer bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-2 group">
                  Login <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              /* --- SIGNUP FORM (Includes Role Selection) --- */
              <motion.form key="signup" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4" onSubmit={handleSignup}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="Email" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Select Role</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <select 
                        required 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none appearance-none cursor-pointer"
                      >
                        <option value="">Choose Role</option>
                        {roles.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">State</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <select required value={state} onChange={(e) => setState(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none appearance-none cursor-pointer">
                        <option value="">Select State</option>
                        {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input required type={showPass ? "text" : "password"} value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Create Password" minLength={6} className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                <button type="submit" disabled={loading} className="w-full cursor-pointer bg-green-600 text-white py-4 rounded-2xl font-bold text-lg mt-2 hover:bg-green-700 shadow-xl transition-all">
                  Register
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              {isLogin ? "Need an account?" : "Already registered?"}
              <button onClick={() => setIsLogin(!isLogin)} className="ml-2 cursor-pointer text-green-600 font-black hover:underline uppercase tracking-wider text-xs">
                {isLogin ? "Create One" : "Login Now"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;