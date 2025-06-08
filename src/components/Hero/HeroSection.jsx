import React, { useEffect, useRef } from "react";
import './hero.css';
import { motion, useAnimation, useInView } from "framer-motion";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2 }); 
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 40 });
    }
  }, [isInView, controls]);

  return (
    <section id="hero" className="hero hero-split">
      <div className="hero-img-col">
        <img src="/1N7A1255.jpg" alt="Simon Schnetzer" className="hero-img" />
      </div>
      <div className="hero-text-col">
        <div className="hero-title-block" ref={ref}>
          <motion.div
            className="hero-title-bar"
            animate={controls}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <div className="line" />
          </motion.div>
          <div>
            <motion.h1
              className="hero-title"
              animate={controls}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Simon Schnetzer
            </motion.h1>
            <motion.p
              className="hero-byline"
              animate={controls}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Full-Stack Developer & Designer
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}