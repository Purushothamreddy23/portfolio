
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactFormProps {
  recipientEmail: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ recipientEmail }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Constructing the mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(formData.subject || 'New Portfolio Inquiry')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Simulate a brief delay for a "premium" feel
    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success');
      
      // Reset after a while
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <CheckCircle2 className="text-indigo-500 mb-6" size={64} />
            <h3 className="heading-font text-3xl font-bold uppercase mb-4">Message Prepared</h3>
            <p className="text-secondary max-w-sm mb-8">
              Your message as been recived with me , will get in contact soon.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mono-font text-[10px] uppercase font-bold tracking-widest border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <label className="mono-font text-[10px] uppercase font-bold text-white/40 mb-2 block group-focus-within:text-white transition-colors">
                  01 // Full Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Purushotham Reddy"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-lg mono-font focus:border-white focus:outline-none transition-all placeholder:text-white/5"
                />
              </div>
              <div className="relative group">
                <label className="mono-font text-[10px] uppercase font-bold text-white/40 mb-2 block group-focus-within:text-white transition-colors">
                  02 // Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@gmail.com"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-lg mono-font focus:border-white focus:outline-none transition-all placeholder:text-white/5"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="mono-font text-[10px] uppercase font-bold text-white/40 mb-2 block group-focus-within:text-white transition-colors">
                03 // Subject
              </label>
              <input
                required
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter Detail Subject"
                className="w-full bg-transparent border-b border-white/10 py-3 text-lg mono-font focus:border-white focus:outline-none transition-all placeholder:text-white/5"
              />
            </div>

            <div className="relative group">
              <label className="mono-font text-[10px] uppercase font-bold text-white/40 mb-2 block group-focus-within:text-white transition-colors">
                04 // Message
              </label>
              <textarea
                required
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Text your message here"
                className="w-full bg-transparent border-b border-white/10 py-3 text-lg mono-font focus:border-white focus:outline-none transition-all resize-none placeholder:text-white/5"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-6 flex items-center justify-center gap-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs transition-all ${status === 'sending' ? 'opacity-50' : 'hover:bg-indigo-500 hover:text-white'}`}
            >
              {status === 'sending' ? 'Connecting...' : (
                <>
                  Send Message <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
