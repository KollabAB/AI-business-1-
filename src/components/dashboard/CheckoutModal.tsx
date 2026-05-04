import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
}

export const CheckoutModal = ({ isOpen, onClose, planName, planPrice }: CheckoutModalProps) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md glass border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 pb-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg tracking-tight">Checkout</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <ShieldCheck size={12} className="text-green-500/70" />
                  Secure Transaction
                </div>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-8">
            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Plan Summary Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-indigo-500/30 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-white/5 rounded-[1.5rem] p-5 flex justify-between items-center border border-white/10 backdrop-blur-xl">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Selected Plan</span>
                      </div>
                      <p className="font-bold text-white text-xl">{planName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-white tracking-tight">{planPrice}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">per month</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Card Details</label>
                    <div className="relative group">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-mono placeholder:text-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Expiry</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-mono placeholder:text-gray-600 text-center"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">CVC</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                          type="text" 
                          placeholder="•••"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-6 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-mono placeholder:text-gray-600 text-center"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full py-7 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                      Complete Payment
                    </Button>
                  </div>
                </form>

                <p className="text-center text-[10px] text-gray-500 leading-relaxed px-4">
                  By clicking "Complete Payment", you agree to our <span className="text-white hover:underline cursor-pointer">Terms of Service</span> and <span className="text-white hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
              </motion.div>
            )}

            {step === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <Loader2 className="text-primary animate-spin relative" size={64} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-2">Processing...</h4>
                  <p className="text-gray-500 text-sm max-w-[200px] mx-auto">Connecting to the bank network to verify your details.</p>
                </div>
              </div>
            )}

            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                  >
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                  </motion.div>
                  {/* Decorative particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.5], x: (i%2?1:-1)*Math.random()*60, y: (i<3?1:-1)*Math.random()*60 }}
                      transition={{ delay: 0.4, duration: 1 }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
                <div className="space-y-3 mb-10">
                  <h4 className="text-3xl font-black text-white tracking-tight">Success!</h4>
                  <p className="text-gray-400">Your account has been upgraded to <span className="text-primary font-bold">{planName}</span>. Welcome aboard.</p>
                </div>
                <Button onClick={onClose} variant="secondary" className="w-full py-6 rounded-2xl bg-white/10 hover:bg-white/20 border-white/10">
                  Enter Dashboard
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
