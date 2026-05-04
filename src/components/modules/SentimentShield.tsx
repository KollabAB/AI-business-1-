import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Smile, Frown, Sparkles, 
  ToggleLeft, ToggleRight, Check, Copy, Activity, Target, Bot, ThumbsUp 
} from 'lucide-react';
import { Button } from '../ui/Button';

export const SentimentShield = () => {
  const [review, setReview] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [toggles, setToggles] = useState({
    google: true,
    trustpilot: false,
    yelp: true
  });
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (!review.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    // Simulate AI Analysis
    setTimeout(() => {
      setAnalysis({
        sentiment: 'negative',
        score: 24,
        painPoints: ['Shipping Latency', 'Packaging Durability', 'Support Continuity'],
        response: "Dear Valued Customer, I'm truly sorry to hear about your experience with our shipping and packaging. We pride ourselves on quality service, and it's clear we fell short this time. I've already shared your feedback with our logistics team. Please check your email for a 20% discount on your next order as a token of our apology."
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(analysis.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
        >
          <ShieldAlert size={24} />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sentiment-Shield</h2>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest text-[10px]">Automated Reputation Guard</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 block px-1">Source Feedback / Review</label>
          <textarea
            placeholder="Paste customer review or social mention here..."
            className="w-full h-40 bg-white/5 border border-white/10 rounded-[1.5rem] p-6 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none shadow-inner placeholder:text-gray-600 leading-relaxed"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <Button onClick={handleAnalyze} disabled={isAnalyzing || !review.trim()} className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-primary/10">
          {isAnalyzing ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Parsing Intent...
            </div>
          ) : 'Analyze Sentiment & Draft Response'}
        </Button>

        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              <div className="lg:col-span-1 space-y-6">
                <div className="glass rounded-[2rem] p-8 border border-white/10 flex flex-col items-center text-center bg-white/[0.01]">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Polarity</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-4 ${
                      analysis.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {analysis.sentiment === 'negative' ? <Frown size={40} /> : <Smile size={40} />}
                  </motion.div>
                  <p className={`text-2xl font-black ${
                    analysis.sentiment === 'negative' ? 'text-red-400' : 'text-green-400'
                  } capitalize tracking-tight`}>
                    {analysis.sentiment}
                  </p>
                  <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    <Activity size={12} className="text-gray-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confidence: {analysis.score}%</span>
                  </div>
                </div>

                <div className="glass rounded-[2rem] p-6 border border-white/10 bg-white/[0.01]">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 px-2">Sync Integrations</p>
                  <div className="space-y-2">
                    {Object.entries(toggles).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
                        <span className="text-xs font-bold capitalize text-gray-300">{key} Portal</span>
                        <button 
                          onClick={() => setToggles(prev => ({ ...prev, [key]: !value }))}
                          className={`transition-all ${value ? 'text-primary' : 'text-gray-600'}`}
                        >
                          {value ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="glass rounded-[2rem] p-6 border border-white/10 bg-white/[0.01]">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2 px-2">
                    <Target size={14} className="text-red-400" />
                    Structural Pain Points
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.painPoints.map((point: string, idx: number) => (
                      <motion.span 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="px-4 py-2 bg-red-400/10 border border-red-400/20 text-red-300 text-[10px] font-black uppercase tracking-widest rounded-xl"
                      >
                        {point}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-[2rem] p-8 border border-cyan-500/30 bg-cyan-500/[0.03] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 flex gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyResponse} 
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/5 shadow-lg"
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </motion.button>
                  </div>
                  <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Sparkles size={14} className="fill-cyan-400" />
                    AI Drafted Response
                  </p>
                  <div className="bg-black/60 p-6 rounded-2xl border border-white/5 text-sm text-gray-300 leading-relaxed italic shadow-inner">
                    "{analysis.response}"
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <Bot size={14} />
                      Nexus-Response-v1
                    </div>
                    <Button size="sm" className="w-full sm:w-auto h-10 px-8 rounded-xl flex items-center gap-2">
                      <ThumbsUp size={16} />
                      Approve & Post
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
