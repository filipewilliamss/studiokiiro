import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-12 relative overflow-hidden bg-white">
      <div className="w-full max-w-[1800px] mx-auto">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-giant font-display uppercase text-center w-full tracking-tighter"
        >
          DITCHING FORM <br /> IS AN OFFENSE
        </motion.h1>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end w-full border-t-4 border-black pt-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-md"
          >
            <p className="text-xl font-bold uppercase leading-tight">
              A design studio that prioritizes impact over aesthetics. 
              We create products that break the mold and challenge the status quo.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 md:mt-0 text-right"
          >
            <span className="block text-sm font-bold uppercase tracking-widest text-gray-500">Location</span>
            <span className="text-2xl font-display uppercase">BASED IN BANGALORE</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/5 -z-10" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-black/5 -z-10" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-black/5 -z-10" />
    </section>
  );
};

export default HeroSection;
