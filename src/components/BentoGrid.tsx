import { motion } from "framer-motion";

const BentoGrid = () => {
  const items = [
    {
      title: "Typography",
      content: "ARCHIVO BLACK",
      className: "col-span-12 md:col-span-8 bg-black text-white p-12",
      textClass: "text-giant"
    },
    {
      title: "Palette",
      content: ["#FFFFFF", "#000000", "#98FF98", "#4B0082"],
      className: "col-span-12 md:col-span-4 bg-mint p-12",
      isPalette: true
    },
    {
      title: "Branding",
      content: "NEO-BRUTALISM",
      className: "col-span-12 md:col-span-4 bg-purple text-white p-12",
      textClass: "text-4xl font-bold"
    },
    {
      title: "Strategy",
      content: "DITCHING FORM IS AN OFFENSE",
      className: "col-span-12 md:col-span-8 border-4 border-black p-12",
      textClass: "text-6xl font-bold"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 uppercase"
      >
        Design Details
      </motion.h2>
      <div className="grid grid-cols-12 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${item.className} flex flex-col justify-between min-h-[300px] shadow-brutalist`}
          >
            <span className="text-xs uppercase font-bold tracking-widest">{item.title}</span>
            {item.isPalette ? (
              <div className="flex gap-2 mt-4">
                {(item.content as string[]).map((color) => (
                  <div 
                    key={color} 
                    className="w-12 h-12 border-2 border-black" 
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            ) : (
              <h3 className={`${item.textClass} mt-4`}>{item.content}</h3>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
