import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Spline Background only for Hero */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <iframe 
          src="https://my.spline.design/untitled-Okn4OvV3B9lyrWP0c2qMReAx-2Hi/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
          style={{ border: 'none' }}
          title="Spline 3D Background"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container-editorial text-center py-20 pointer-events-none">
...
        </motion.div>
      </div>

      {/* Watermark cover for Spline - only in Hero, below WhatsApp button */}
      <div className="absolute bottom-0 right-0 w-[170px] h-[70px] bg-[#070807] z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
