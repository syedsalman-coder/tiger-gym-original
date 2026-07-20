"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/shared/Logo";

export default function HomeLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = reduceMotion ? 160 : 900;
    let frame = 0;
    const update = (time: number) => {
      const value = Math.min(100, Math.round(((time - start) / duration) * 100));
      setProgress(value);
      if (value < 100) frame = window.requestAnimationFrame(update);
      else window.setTimeout(() => setVisible(false), reduceMotion ? 30 : 100);
    };
    frame = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="home-loader"
          role="status"
          aria-label="Loading Tiger Gym"
          exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduceMotion ? 0.12 : 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="home-loader__grid" aria-hidden="true" />
          <div className="home-loader__brand">
            <Logo priority />
            <p>Tiger Gym <span>Fitness Center</span></p>
          </div>
          <div className="home-loader__claws" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <motion.span
                key={item}
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.38, delay: reduceMotion ? 0 : item * 0.08 }}
              />
            ))}
          </div>
          <div className="home-loader__progress">
            <span>Preparing the floor</span><strong>{progress.toString().padStart(3, "0")}</strong>
          </div>
          <div className="home-loader__line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
