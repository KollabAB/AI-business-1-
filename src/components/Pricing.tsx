import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
import { CheckoutModal } from './dashboard/CheckoutModal';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for exploring our AI capabilities.',
    features: ['100 API calls/mo', 'Basic support', '1 Knowledge base', 'Community access'],
    buttonText: 'Get Started',
    variant: 'secondary' as const,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'Scaling your business with high-end AI.',
    features: ['Unlimited API calls', 'Priority support', '10 Knowledge bases', 'Custom RAG models', 'Analytics dashboard'],
    buttonText: 'Upgrade to Pro',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom solutions for large-scale operations.',
    features: ['Dedicated instance', '24/7 Phone support', 'Unlimited everything', 'On-premise option', 'SLA guarantees'],
    buttonText: 'Contact Sales',
    variant: 'outline' as const,
  }
];

export const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const navigate = useNavigate();

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.price === 'Custom') {
      window.location.href = 'mailto:sales@nexus-modules.ai';
      return;
    }
    setSelectedPlan(plan);
  };

  return (
    <section id="pricing" className="py-24 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Choose the plan that fits your current needs and scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card relative flex flex-col ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-400">/mo</span>}
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-primary" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.variant} 
                className="w-full"
                onClick={() => handlePlanClick(plan)}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <CheckoutModal 
        isOpen={!!selectedPlan} 
        onClose={() => {
          setSelectedPlan(null);
          navigate('/dashboard');
        }}
        planName={selectedPlan?.name || ''}
        planPrice={selectedPlan?.price || ''}
      />
    </section>
  );
};
