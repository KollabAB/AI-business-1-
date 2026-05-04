import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Key, BarChart3, TrendingUp, Zap, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export const ApiDashboard = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [usageStats, setUsageStats] = useState<any[]>([]);
  const [moduleDistribution, setModuleDistribution] = useState<any[]>([]);
  const [totalCalls, setTotalCalls] = useState(0);

  const copyKey = () => {
    if (profile?.api_key) {
      navigator.clipboard.writeText(profile.api_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rotateKey = async () => {
    if (!user) return;
    setIsRotating(true);
    const newKey = 'nk_' + Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('');
    
    const { error } = await supabase
      .from('profiles')
      .update({ api_key: newKey })
      .eq('id', user.id);

    if (!error) {
      await refreshProfile();
    }
    setIsRotating(false);
  };

  useEffect(() => {
    const fetchUsageData = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('module_usage')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (data && !error) {
        setTotalCalls(data.length);

        // Process Daily Usage (Last 7 days)
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return {
            name: days[d.getDay()],
            fullDate: d.toISOString().split('T')[0],
            calls: 0
          };
        });

        data.forEach(item => {
          const itemDate = new Date(item.created_at).toISOString().split('T')[0];
          const dayEntry = last7Days.find(d => d.fullDate === itemDate);
          if (dayEntry) {
            dayEntry.calls++;
          }
        });
        setUsageStats(last7Days);

        // Process Module Distribution
        const distribution = [
          { name: 'Lead-Hunter', value: 0 },
          { name: 'Knowledge-OS', value: 0 },
          { name: 'Sentiment-Shield', value: 0 },
        ];

        data.forEach(item => {
          const mod = distribution.find(m => m.name.toLowerCase() === item.module_name.toLowerCase());
          if (mod) mod.value++;
        });
        setModuleDistribution(distribution);
      }
    };

    fetchUsageData();
  }, [user]);

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
              <span className="truncate">{profile?.api_key || 'Loading API Key...'}</span>
              <button 
                onClick={copyKey}
                disabled={!profile?.api_key}
                className="ml-4 p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white disabled:opacity-50"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
            <Button 
              variant="secondary" 
              className="sm:w-32" 
              onClick={rotateKey}
              disabled={isRotating}
            >
              {isRotating ? <RefreshCw className="animate-spin mr-2" size={16} /> : 'Rotate Key'}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total API Calls', value: totalCalls.toLocaleString(), change: '+0%', icon: BarChart3 },
          { label: 'Avg. Latency', value: '142ms', change: 'Stable', icon: Zap },
          { label: 'Success Rate', value: '100%', change: 'Stable', icon: TrendingUp },
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
              <AreaChart data={usageStats}>
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
              <BarChart data={moduleDistribution} layout="vertical" margin={{ left: 40 }}>
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
