import { motion } from 'framer-motion';
import { Target, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 'lead-hunter',
    name: 'Lead-Hunter',
    description: 'B2B Lead Scoring AI that analyzes domain names to fetch company size, tech stack, and sales potential.',
    icon: Target,
    color: 'bg-blue-500',
  },
  {
    id: 'knowledge-os',
    name: 'Knowledge-OS',
    description: 'Internal RAG system. Upload PDFs/TXTs and chat with your documents using enterprise-grade LLMs.',
    icon: MessageSquare,
    color: 'bg-indigo-500',
  },
  {
    id: 'sentiment-shield',
    name: 'Sentiment-Shield',
    description: 'Reputation manager that detects sentiment in reviews and generates the perfect automated response.',
    icon: ShieldCheck,
    color: 'bg-cyan-500',
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful AI Modules</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Each module is designed for rapid integration and enterprise scalability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card flex flex-col group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.name}</h3>
              <p className="text-gray-400 mb-8 flex-grow">
                {feature.description}
              </p>
              <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
