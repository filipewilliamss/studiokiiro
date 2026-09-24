import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.webp";

const About = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#070807] text-white">
      <SEO title="Sobre o Studio Kiiro" description="A forma de pensar e criar do Studio Kiiro." />
      <Navbar />
      <main>
        <section className="relative min-h-[78svh] overflow-hidden border-b border-white/10 pt-36">
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between px-6 pb-20 sm:px-10 md:min-h-[58svh] lg:px-16">
            <Link to="/" className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-[#FFCA16]"><ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Voltar para a experiência</Link>
            <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_0.45fr] lg:items-end">
              <motion.h1 initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.9 }} className="max-w-5xl text-[clamp(4rem,11vw,11rem)] font-black leading-[0.78] tracking-[-0.09em]">
                O que existe
                <br />
                <span className="font-light italic text-[#FFCA16]">por trás da forma.</span>
              </motion.h1>
              <div className="border-t border-white/20 pt-5 lg:mb-2">
                <img src={logo} alt="Studio Kiiro" className="mb-6 h-10 w-auto object-contain object-left" />
                <p className="text-base leading-relaxed text-white/60 md:text-lg">O Studio Kiiro é um estúdio de design que transforma posicionamento em identidade, e identidade em presença.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-16 px-6 py-32 sm:px-10 md:py-44 lg:grid-cols-[0.75fr_1.25fr] lg:px-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFCA16]">Uma prática em movimento</p>
          <div className="space-y-8 text-xl leading-relaxed text-white/70 md:text-3xl md:leading-snug">
            <p>Marcas fortes não começam com uma estética. Começam com uma leitura precisa do que precisa ser dito, sentido e lembrado.</p>
            <p className="text-white">A gente trabalha entre estratégia, direção de arte e sistemas visuais para construir algo que continue funcionando depois da primeira impressão.</p>
            <a href="https://wa.me/5511991076096?text=Ol%C3%A1%20Studio%20Kiiro%2C%20quero%20conhecer%20melhor%20o%20trabalho%20do%20est%C3%BAdio." target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFCA16] transition-colors hover:text-white">Conversar com o estúdio <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
