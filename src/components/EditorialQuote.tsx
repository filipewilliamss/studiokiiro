import { motion } from "framer-motion";

interface EditorialQuoteProps {
  eyebrow?: string;
  quote: React.ReactNode;
  attribution?: string;
}

const EditorialQuote = ({ eyebrow = "Manifesto", quote, attribution }: EditorialQuoteProps) => {
  return (
    <section className="relative bg-[#070807] py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.15] pointer-events-none" />
      

      <div className="container-editorial relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-[#FFCA16] text-[10px] font-bold uppercase tracking-[0.4em]">
              {eyebrow}
            </span>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display font-[300] text-white leading-[1.05] tracking-[-0.03em] text-balance"
            style={{ fontSize: "clamp(34px, 5.2vw, 76px)" }}
          >
            <span className="text-[#FFCA16]">“</span>
            {quote}
            <span className="text-[#FFCA16]">”</span>
          </motion.blockquote>

          {attribution && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex items-center gap-4"
            >
              <span className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">
                {attribution}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditorialQuote;