import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Button } from './ui/Button';

import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-white/10"
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <Layers className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Nexus <span className="text-primary">Modules</span></span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Features</a>
        <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Pricing</a>
        <a href="#docs" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Docs</a>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">Login</Button>
        </Link>
        <Link to="/dashboard">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </motion.nav>
  );
};
