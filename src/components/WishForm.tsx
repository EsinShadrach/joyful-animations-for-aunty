
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WishForm: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill out all fields",
        description: "Both name and message are required.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending a birthday wish
    setTimeout(() => {
      toast({
        title: "Birthday wish sent!",
        description: "Your message has been delivered to Aunty Ify.",
      });
      
      // Reset form
      setName('');
      setMessage('');
      setIsSending(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">Send a Birthday Wish</h2>
          <p className="text-muted-foreground">
            Add your personal birthday message for Aunty Ify.
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-xl p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                Your Birthday Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all min-h-[120px] resize-y"
                placeholder="Write your birthday wish here..."
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-md px-4 py-3 font-medium transition-all hover:shadow-md disabled:opacity-70"
              >
                {isSending ? (
                  <>
                    <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Sending Wish...</span>
                  </>
                ) : (
                  <>
                    <SendHorizontal size={18} />
                    <span>Send Birthday Wish</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default WishForm;
