import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-8xl font-display uppercase leading-none mb-12"
          >
            LET'S <br /> WORK <br /> TOGETHER
          </motion.h2>
          <div className="space-y-6">
            <p className="text-xl font-bold uppercase">hello@neobrutalist.com</p>
            <p className="text-xl font-bold uppercase">+91 98765 43210</p>
            <div className="flex gap-8 mt-12">
              {["Twitter", "Dribbble", "Instagram", "Behance"].map(social => (
                <a key={social} href="#" className="font-bold uppercase border-b-2 border-black hover:bg-black hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-12 border-4 border-black shadow-brutalist-lg">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    placeholder="YOUR NAME" 
                    className="w-full bg-transparent border-b-4 border-black p-4 text-xl font-bold uppercase focus:outline-none placeholder:text-gray-300"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    required 
                    placeholder="YOUR EMAIL" 
                    className="w-full bg-transparent border-b-4 border-black p-4 text-xl font-bold uppercase focus:outline-none placeholder:text-gray-300"
                  />
                </div>
                <div className="relative">
                  <textarea 
                    rows={4} 
                    required 
                    placeholder="TELL US ABOUT THE PROJECT" 
                    className="w-full bg-transparent border-b-4 border-black p-4 text-xl font-bold uppercase focus:outline-none placeholder:text-gray-300 resize-none"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full bg-black text-white p-8 text-2xl font-display uppercase flex items-center justify-center gap-4 hover:bg-mint hover:text-black transition-colors group overflow-hidden relative"
                >
                  <span className="relative z-10">{isSending ? "SENDING..." : "SHOOT"}</span>
                  {!isSending && (
                    <motion.div
                      animate={isSending ? { x: 100, y: -100 } : { x: 0, y: 0 }}
                      className="relative z-10"
                    >
                      <Send size={32} />
                    </motion.div>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <CheckCircle2 size={120} className="mb-8 text-mint" />
                <h3 className="text-4xl font-display uppercase mb-4">Message Sent!</h3>
                <p className="text-xl font-bold uppercase">We'll get back to you in 24 hours.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-12 font-bold uppercase border-b-4 border-black"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
