import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Send, Bot, User, Check, Copy, X, Database, Info } from 'lucide-react';
import { Button } from '../ui/Button';

export const KnowledgeOS = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      setMessages([
        { role: 'assistant', content: `I've successfully indexed **${file.name}**. You can now query your data using natural language.` }
      ]);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Simulate AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Based on the internal documentation provided, "${userMessage}" is handled by our core automation layer. The system ensures 99.9% uptime by utilizing distributed consensus protocols and automated failover mechanisms.` 
      }]);
    }, 1000);
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(`<script src="https://cdn.nexus-modules.ai/widget.js" data-id="NK-412"></script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card w-full max-w-5xl mx-auto p-4 md:p-8 overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10"
        >
          <Database size={24} />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Knowledge-OS</h2>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest text-[10px]">Enterprise RAG & Contextual AI</p>
        </div>
      </div>

      {!isUploaded ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div 
            className="relative border-2 border-dashed border-white/10 rounded-[2rem] p-12 flex flex-col items-center justify-center hover:bg-white/[0.02] hover:border-primary/50 transition-all cursor-pointer group bg-white/[0.01]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.onchange = (e: any) => setFile(e.target.files[0]);
              input.click();
            }}
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.9rem]" />
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors border border-white/5 relative z-10"
            >
              <Upload className="text-gray-400 group-hover:text-primary transition-colors" size={32} />
            </motion.div>
            {file ? (
              <div className="flex items-center gap-3 text-primary font-bold bg-primary/10 px-4 py-2 rounded-xl relative z-10">
                <FileText size={20} />
                {file.name}
                <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center relative z-10 px-6">
                <p className="text-xl font-bold text-white mb-2 tracking-tight">Drop documents to begin</p>
                <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">
                  Support for PDF, TXT, and Markdown. Our AI will automatically chunk and index your data.
                </p>
              </div>
            )}
          </div>
          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading} 
            className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/10"
          >
            {isUploading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Indexing Knowledge Base...
              </div>
            ) : 'Initialize Context Engine'}
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 min-h-[550px]">
          <div className="xl:col-span-3 flex flex-col glass rounded-[2rem] overflow-hidden border border-white/10 bg-black/20">
            <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                  <Bot size={18} />
                </div>
                <div>
                  <span className="font-bold text-sm block leading-none mb-1">Nexus AI Assistant</span>
                  <span className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-grow p-6 overflow-y-auto space-y-6 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    msg.role === 'user' ? 'bg-primary shadow-primary/20' : 'bg-white/10 border border-white/10'
                  }`}>
                    {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-primary" />}
                  </div>
                  <div className={`p-5 rounded-[1.5rem] text-sm max-w-[85%] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  placeholder="Ask a question about the indexed context..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-600 shadow-inner"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-[2rem] p-6 border border-white/10 bg-white/[0.02]"
            >
              <h3 className="text-[10px] font-black mb-6 uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <Info size={12} />
                Intelligence Meta
              </h3>
              <div className="space-y-5">
                <div className="group">
                  <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1 group-hover:text-primary transition-colors text-xs">Filename</p>
                  <p className="text-xs font-bold truncate text-gray-300">{file?.name}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1 text-xs">Vector Chunks</p>
                  <p className="text-xs font-bold text-gray-300 tracking-tighter">1,248 segments indexed</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1 text-xs">Embedding Engine</p>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-tighter">Nexus-v2-Pro</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-[2rem] p-6 border border-indigo-500/30 bg-indigo-500/[0.03] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest">Embed Widget</h3>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={copyEmbedCode} 
                  className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg text-indigo-400 transition-colors border border-indigo-500/10"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </motion.button>
              </div>
              <p className="text-[10px] font-medium text-gray-500 mb-4 leading-relaxed">Instantly deploy this knowledge base to your company's internal portal.</p>
              <div className="bg-black/60 p-4 rounded-2xl border border-white/5 shadow-inner">
                <code className="text-[10px] text-indigo-300/80 font-mono break-all leading-relaxed">
                  {`<script src="nexus.js" id="NK-412"></script>`}
                </code>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
