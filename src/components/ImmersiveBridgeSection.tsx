import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ImmersiveBridgeSection() {
  return (
    <section id="visao" className="kiiro-bridge">
      <h2 data-bridge-line="0">Uma ideia<br /><em>ganha forma.</em></h2>
      <p data-bridge-line="1">Design para transformar o que sua marca é<br className="hidden md:block" /> naquilo que as pessoas lembram.</p>
    </section>
  );
}
