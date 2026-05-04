import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Key, Save, Loader2, UserCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export const ProfileSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [success, setSuccess] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Nav & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-[2rem] p-8 border border-white/10 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-indigo-600 border-4 border-white/10 flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-background border border-white/10 rounded-xl flex items-center justify-center text-primary shadow-lg">
                <Shield size={16} />
              </div>
            </div>
            <h3 className="font-bold text-xl text-white">{fullName || 'User'}</h3>
            <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
              Pro Account
            </div>
          </div>

          <div className="glass rounded-[2rem] p-4 border border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white font-medium transition-all">
              <User size={18} className="text-primary" />
              General Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all font-medium">
              <Bell size={18} />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all font-medium">
              <Key size={18} />
              Security
            </button>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <UserCircle className="text-primary" size={24} />
              <h2 className="text-xl font-bold text-white tracking-tight">Profile Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Email Address</label>
                <div className="relative opacity-60">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-400 cursor-not-allowed font-medium"
                  />
                </div>
                <p className="text-[10px] text-gray-600 italic px-1 italic">Email cannot be changed for Pro accounts.</p>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 h-14 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Changes
                </Button>
                {success && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-green-500 text-sm font-bold flex items-center gap-1"
                  >
                    <Shield size={16} />
                    Profile Updated
                  </motion.span>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/10 bg-red-500/5 border-red-500/10"
          >
            <h2 className="text-xl font-bold text-white mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-500 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 rounded-2xl h-12 px-6">
              Delete Account
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
