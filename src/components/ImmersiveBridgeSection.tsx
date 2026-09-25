import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ImmersiveBridgeSection() {
  return (
    <section id="visao" className="kiiro-bridge">
      <h2 data-bridge-line="0">Uma ideia<br /><em>ganha forma.</em></h2>
      <div className="kiiro-bridge-divider" aria-hidden="true" />
      <p data-bridge-line="1">Design para transformar o que sua marca é<br />naquilo que as pessoas lembram.</p>
    </section>
  );
}
