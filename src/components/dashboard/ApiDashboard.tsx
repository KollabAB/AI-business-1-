import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Key, BarChart3, TrendingUp, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '../ui/Button';

const usageData = [
  { name: 'Mon', calls: 450 },
  { name: 'Tue', calls: 620 },
  { name: 'Wed', calls: 890 },
  { name: 'Thu', calls: 540 },
  { name: 'Fri', calls: 1200 },
  { name: 'Sat', calls: 350 },
  { name: 'Sun', calls: 280 },
];

const moduleUsage = [
  { name: 'Lead-Hunter', value: 45 },
  { name: 'Knowledge-OS', value: 30 },
  { name: 'Sentiment-Shield', value: 25 },
];

export const ApiDashboard = () => {
  const [apiKey] = useState('nx_prod_51hG92jKzX2mP90qL18vY3bT7r5w');
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* API Key Card */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Key size={120} />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
              <Zap size={20} />
            </div>
            <h2 className="text-xl font-bold">API Access</h2>
          </div>

          <p className="text-gray-400 mb-6 max-w-2xl">
            Use this secret key to authenticate your requests. Keep it secure and do not share it in client-side code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono text-primary flex items-center justify-between group">
              <span className="truncate">{apiKey}</span>
              <button 
                onClick={copyKey}
                className="ml-4 p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <Button variant="secondary" className="sm:w-32">Rotate Key</Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total API Calls', value: '12,842', change: '+12%', icon: BarChart3 },
          { label: 'Avg. Latency', value: '142ms', change: '-5ms', icon: Zap },
          { label: 'Success Rate', value: '99.9%', change: 'Stable', icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 
                stat.change.startsWith('-') ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold mb-8">API Usage (Last 7 Days)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0070f3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#0070f3' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#0070f3" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCalls)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-lg font-bold mb-8">Usage by Module</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleUsage} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#fff', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#0070f3" 
                  radius={[0, 4, 4, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
