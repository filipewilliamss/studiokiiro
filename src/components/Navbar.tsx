import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  forceBlack?: boolean;
}

const Navbar = ({ forceBlack }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuLinks = [
    { label: "HOME", href: "#" },
    { label: "WORK", href: "#work" },
    { label: "ABOUT ME", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center mix-blend-difference text-white">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm tracking-widest">{time}</span>
          <span className="w-8 h-[1px] bg-white hidden md:block" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] hidden md:block">Bangalore, IN</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              document.documentElement.classList.toggle('invert');
            }}
            className="p-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
            title="Toggle Contrast"
          >
            <Sun size={20} className="hidden dark:block" />
            <Moon size={20} className="block dark:hidden" />
          </button>

          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-4 group"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] group-hover:bg-white group-hover:text-black px-4 py-2 transition-all border-2 border-white">LET'S TALK</span>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-black text-white flex flex-col p-6 md:p-24"
          >
            <div className="flex justify-between items-center w-full mb-24">
              <span className="text-xl font-display uppercase">NEO-BRUTALIST STUDIO</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform p-4"
              >
                <X size={48} />
              </button>
            </div>

            <div className="flex flex-col gap-8 flex-grow">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-8xl md:text-[12rem] font-display leading-[0.8] hover:italic hover:text-mint transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-end border-t-2 border-white/20 pt-12">
              <div className="space-y-2">
                <span className="block text-xs uppercase font-bold text-white/40">Socials</span>
                <div className="flex gap-8">
                  {["Instagram", "Twitter", "LinkedIn"].map(s => (
                    <a key={s} href="#" className="font-bold uppercase border-b-2 border-white hover:text-mint transition-colors">{s}</a>
                  ))}
                </div>
              </div>
              <div className="mt-8 md:mt-0 text-right">
                <p className="text-xl font-bold uppercase italic">Ready to break the form?</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
