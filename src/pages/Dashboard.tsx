import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Target, MessageSquare, ShieldCheck, 
  Settings, LogOut, Bell, Search, Zap, FileCode, Menu 
} from 'lucide-react';
import { LeadHunter } from '../components/modules/LeadHunter';
import { KnowledgeOS } from '../components/modules/KnowledgeOS';
import { SentimentShield } from '../components/modules/SentimentShield';
import { ApiDashboard } from '../components/dashboard/ApiDashboard';
import { Documentation } from '../components/dashboard/Documentation';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('lead-hunter');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const menuItems = [
    { id: 'lead-hunter', name: 'Lead-Hunter', icon: Target, category: 'Modules' },
    { id: 'knowledge-os', name: 'Knowledge-OS', icon: MessageSquare, category: 'Modules' },
    { id: 'sentiment-shield', name: 'Sentiment-Shield', icon: ShieldCheck, category: 'Modules' },
    { id: 'api-dashboard', name: 'API Usage', icon: Zap, category: 'System' },
    { id: 'documentation', name: 'Docs', icon: FileCode, category: 'System' },
  ];

  const modules = menuItems.filter(i => i.category === 'Modules');
  const systemItems = menuItems.filter(i => i.category === 'System');

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Nexus <span className="text-primary text-sm uppercase">Modules</span></span>
        </div>
      </div>

      <nav className="flex-grow p-4 space-y-6 overflow-y-auto custom-scrollbar">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase px-2 mb-4 tracking-widest">Modules</p>
          <div className="space-y-1">
            {modules.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase px-2 mb-4 tracking-widest">System</p>
          <div className="space-y-1">
            {systemItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
            <motion.button 
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <motion.button 
          whileHover={{ backgroundColor: 'rgba(248, 113, 113, 0.1)' }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-white flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-white/10 flex-col bg-black/40 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-white/10 flex flex-col lg:hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-4 md:px-8 bg-black/20 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block w-64 xl:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search modules, docs..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-primary border-2 border-background rounded-full" />
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-4 md:pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold truncate max-w-[120px]">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Pro Account</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 border border-white/20 shadow-lg shadow-primary/20 cursor-pointer flex items-center justify-center font-bold text-white uppercase"
              >
                {user?.email?.charAt(0) || 'U'}
              </motion.div>
            </div>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8 md:mb-10">
                  <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                    {menuItems.find(i => i.id === activeTab)?.name}
                  </h1>
                  <p className="text-gray-400 text-sm md:text-base">Manage and interact with your AI-powered components.</p>
                </div>

                <div className="relative">
                  {activeTab === 'lead-hunter' && <LeadHunter />}
                  {activeTab === 'knowledge-os' && <KnowledgeOS />}
                  {activeTab === 'sentiment-shield' && <SentimentShield />}
                  {activeTab === 'api-dashboard' && <ApiDashboard />}
                  {activeTab === 'documentation' && <Documentation />}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};
