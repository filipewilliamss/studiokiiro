import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-giant font-display uppercase leading-none mb-24 whitespace-nowrap overflow-hidden"
        >
          LET'S TAAA <br /> AAAAKKKK!
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t-2 border-white/20 pt-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-white/40 mb-4 block">Navigation</span>
            <ul className="space-y-2">
              {["Home", "Work", "About", "Contact"].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-xl font-bold uppercase hover:text-mint transition-colors italic">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-white/40 mb-4 block">Socials</span>
            <ul className="space-y-2">
              {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map(link => (
                <li key={link}>
                  <a href="#" className="text-xl font-bold uppercase hover:text-mint transition-colors italic">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-between items-end">
            <div className="text-right">
              <span className="text-xs uppercase font-bold tracking-widest text-white/40 mb-4 block">Office</span>
              <p className="text-xl font-bold uppercase italic">Bangalore, IN<br />Indiranagar, 560038</p>
            </div>
            
            <div className="mt-12 text-right">
              <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/20">
                © 2024 NEO-BRUTALIST STUDIO. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
