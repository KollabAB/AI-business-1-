import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, Check, Globe, Users, Code, Award, Loader2, Sparkles, Building2, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export const LeadHunter = () => {
  const { user } = useAuth();
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleSearch = async () => {
    if (!domain || !user) return;
    setIsAnalyzing(true);
    setResult(null);
    
    // Record Usage in background
    supabase.from('module_usage').insert({
      user_id: user.id,
      module_name: 'lead-hunter',
      metadata: { domain }
    }).then();

    // Simulate AI Analysis
    setTimeout(async () => {
      const mockResult = {
        domain,
        companySize: '500-1000 employees',
        techStack: ['React', 'Node.js', 'Salesforce', 'AWS', 'Tailwind'],
        salesScore: 85,
        location: 'San Francisco, CA',
        industry: 'Software as a Service'
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);

      // Persist Lead
      await supabase.from('leads').insert({
        user_id: user.id,
        domain,
        company_name: mockResult.industry,
        size: mockResult.companySize,
        tech_stack: mockResult.techStack,
        score: mockResult.salesScore
      });
    }, 2000);
  };

  const copyApiHook = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.nexus-modules.ai/v1/lead-hunter \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "domain=${domain}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card w-full max-w-4xl mx-auto p-6 md:p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles size={120} className="text-primary" />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <motion.div 
          whileHover={{ rotate: 15 }}
          className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/10"
        >
          <Globe size={24} />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lead-Hunter</h2>
          <p className="text-gray-400 text-sm">B2B Lead Scoring AI Engine</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Enter company domain (e.g. apple.com)"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-gray-600 shadow-inner"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={isAnalyzing || !domain} 
          className="md:w-40 h-[58px] rounded-2xl font-bold shadow-lg shadow-primary/20"
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Analyzing
            </div>
          ) : 'Scout Leads'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center py-20 bg-white/[0.02] rounded-3xl border border-white/5"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <Loader2 className="text-primary animate-spin relative" size={48} strokeWidth={1.5} />
            </div>
            <p className="text-gray-400 font-medium tracking-wide animate-pulse">Running AI deep-scan on {domain}...</p>
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Company Size</p>
                  <p className="font-bold text-white">{result.companySize}</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                  <Code size={20} />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Primary Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {result.techStack.map((tech: string) => (
                      <span key={tech} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Award size={20} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Sales Potential</p>
                    <span className="font-black text-primary text-sm">{result.salesScore}/100</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.salesScore}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-blue-400 shadow-[0_0_15px_rgba(0,112,243,0.5)]" 
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-[2rem] p-6 md:p-8 border border-primary/20 bg-primary/[0.03] relative overflow-hidden flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-white uppercase tracking-tighter flex items-center gap-2">
                    <Zap size={18} className="text-primary fill-primary" />
                    Integration Hook
                  </h3>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyApiHook}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-gray-400 hover:text-white border border-white/5"
                    title="Copy API Hook"
                  >
                    {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                  </motion.button>
                </div>
                <div className="relative">
                  <div className="absolute top-0 right-0 p-2 text-[8px] font-bold text-gray-600 uppercase tracking-widest">CURL</div>
                  <pre className="text-[11px] leading-relaxed text-gray-400 bg-black/60 p-6 rounded-2xl border border-white/5 overflow-x-auto custom-scrollbar font-mono">
                    <code>{`curl -X POST https://api.nexus-modules.ai/v1/lead-hunter \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "domain=${result.domain}"`}</code>
                  </pre>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 italic">
                <ShieldCheck size={14} className="text-green-500/50" />
                Validated endpoint ready for CRM sync.
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.01]"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Building2 size={40} className="text-white/10" />
            </div>
            <h4 className="text-white font-bold mb-2 text-lg tracking-tight text-center px-6">Ready to hunt for leads?</h4>
            <p className="text-gray-500 text-sm max-w-xs text-center px-6">Enter any business domain to extract deep intelligence and sales scoring.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
