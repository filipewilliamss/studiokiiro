import { motion } from "framer-motion";

const projects = [
  {
    title: "Obvious Wallet",
    description: "A crypto wallet that makes sense.",
    color: "#98FF98", // Mint Green
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop",
    tags: ["Crypto", "App Design"]
  },
  {
    title: "Deep Vision",
    description: "AI-powered medical diagnostics.",
    color: "#4B0082", // Deep Purple
    image: "https://images.unsplash.com/photo-1551288049-bb1c004517ae?q=80&w=800&auto=format&fit=crop",
    tags: ["AI", "Health Tech"]
  },
  {
    title: "Neon City",
    description: "The future of urban navigation.",
    color: "#FFCA16", // Yellow accent
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800&auto=format&fit=crop",
    tags: ["Navigation", "Future"]
  }
];

const PortfolioSection = () => {
  return (
    <section id="work" className="bg-white py-12">
      {projects.map((project, index) => (
        <div 
          key={index} 
          className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 sticky top-0"
          style={{ backgroundColor: project.color }}
        >
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1 mb-6 inline-block">
                Project {index + 1}
              </span>
              <h2 className="text-7xl font-display uppercase mb-6 leading-none">
                {project.title}
              </h2>
              <p className="text-xl font-bold uppercase mb-8 opacity-80">
                {project.description}
              </p>
              <div className="flex gap-4">
                {project.tags.map(tag => (
                  <span key={tag} className="border-2 border-black px-4 py-2 text-sm font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              data-cursor="VIEW PROJECT"
              className="relative w-[300px] h-[600px] bg-black rounded-[3rem] p-4 shadow-brutalist-lg overflow-hidden cursor-none"
            >
              {/* iPhone Mockup Frame */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PortfolioSection;
