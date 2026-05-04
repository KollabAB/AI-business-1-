import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary"
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Social Proof / Stats Section */}
        <section className="py-20 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Users', value: '10k+' },
              { label: 'API Requests', value: '500M+' },
              { label: 'Average Score', value: '98%' },
              { label: 'Global Clients', value: '500+' },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <Pricing />

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent -z-10" />
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to automate your business?</h2>
            <p className="text-gray-400 mb-10 text-lg">
              Join hundreds of companies using Nexus Modules to scale their AI operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <button className="bg-primary hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-primary/20 active:scale-95">
                  Get Started for Free
                </button>
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl transition-all border border-white/10 active:scale-95">
                Talk to an Expert
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Nexus <span className="text-primary">Modules</span></span>
          </div>
          <div className="flex gap-8 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Nexus Modules AI. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};
