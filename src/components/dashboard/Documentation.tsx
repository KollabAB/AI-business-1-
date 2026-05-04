import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, MessageSquare, ShieldCheck, Copy, Check } from 'lucide-react';

const endpoints = [
  {
    id: 'lead-hunter',
    name: 'Lead-Hunter API',
    icon: Globe,
    method: 'POST',
    path: '/v1/lead-hunter',
    description: 'Analyze a company domain to fetch size, tech stack, and sales score.',
    params: [
      { name: 'domain', type: 'string', required: true, description: 'The company domain (e.g., apple.com)' },
    ],
    example: `curl -X POST https://api.nexus-modules.ai/v1/lead-hunter \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "domain=stripe.com"`
  },
  {
    id: 'knowledge-os',
    name: 'Knowledge-OS Query',
    icon: MessageSquare,
    method: 'POST',
    path: '/v1/knowledge-os/query',
    description: 'Query your uploaded documents using RAG.',
    params: [
      { name: 'query', type: 'string', required: true, description: 'The question to ask the documents' },
      { name: 'document_id', type: 'string', required: false, description: 'Filter by specific document' },
    ],
    example: `curl -X POST https://api.nexus-modules.ai/v1/knowledge-os/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "query=What is our refund policy?"`
  },
  {
    id: 'sentiment-shield',
    name: 'Sentiment Analysis',
    icon: ShieldCheck,
    method: 'POST',
    path: '/v1/sentiment-shield/analyze',
    description: 'Detect sentiment and generate automated responses for reviews.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'The customer review text' },
    ],
    example: `curl -X POST https://api.nexus-modules.ai/v1/sentiment-shield/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "text=The product was okay but shipping was slow."`
  }
];

export const Documentation = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="border-b border-white/10 pb-8">
        <h2 className="text-3xl font-bold mb-4 text-white">API Documentation</h2>
        <p className="text-gray-400">
          Learn how to integrate Nexus AI modules into your existing workflow. 
          All endpoints require a valid API key passed in the Authorization header.
        </p>
      </div>

      <div className="space-y-16">
        {endpoints.map((endpoint) => (
          <motion.section 
            key={endpoint.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                <endpoint.icon size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">{endpoint.name}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-gray-400">{endpoint.description}</p>
                
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs font-bold rounded uppercase tracking-wider">
                    {endpoint.method}
                  </span>
                  <code className="text-primary font-mono text-sm">{endpoint.path}</code>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Parameters</h4>
                  <div className="space-y-3">
                    {endpoint.params.map((param) => (
                      <div key={param.name} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <code className="text-white text-xs font-bold">{param.name}</code>
                          <span className="text-[10px] text-gray-500 font-mono uppercase">{param.type}</span>
                          {param.required && <span className="text-[10px] text-red-500 font-bold uppercase">Required</span>}
                        </div>
                        <p className="text-xs text-gray-400">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => copyToClipboard(endpoint.example, endpoint.id)}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
                  >
                    {copiedId === endpoint.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-2xl p-6 overflow-x-auto font-mono text-sm h-full flex flex-col">
                  <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Example Request</h4>
                  <pre className="text-gray-300 flex-grow">
                    <code>{endpoint.example}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};
