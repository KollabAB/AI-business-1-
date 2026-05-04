import { motion } from 'framer-motion';
import { Layers, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-white/10"
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Layers className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white font-black">NEXUS <span className="text-primary text-sm uppercase font-black">Modules</span></span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        <a href="#docs" className="hover:text-primary transition-colors">Docs</a>
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <Loader2 className="animate-spin text-primary" size={20} />
        ) : user ? (
          <Link to="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link to="/auth">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Get Started</Button>
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};
