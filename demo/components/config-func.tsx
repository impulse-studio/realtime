"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

export default function ConfigFunc() {
  const [hovered, setHovered] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, hovered ? 1 : 0, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [hovered, progress]);

  const subscribeX = useTransform(progress, (p) => -40 + p * 80);
  const subscribeY = useTransform(progress, (p) => -8 - Math.sin(p * Math.PI) * 16);
  
  const pushX = useTransform(progress, (p) => 40 - p * 80);
  const pushY = useTransform(progress, (p) => 8 + Math.sin(p * Math.PI) * 16);

  return (
    <motion.div 
      className="flex-1 min-h-24 w-full relative flex items-center justify-center"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 min-w-32 rounded-2xl border border-gray-800 bg-gray-900 -z-0"
        style={{ x: subscribeX, y: subscribeY }}
      >
        <p className="text-sm font-bold text-center">subscribe()</p>
      </motion.div>
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 min-w-32 rounded-2xl border border-gray-800 bg-gray-900 -z-10"
        style={{ x: pushX, y: pushY }}
      >
        <p className="text-sm font-bold text-center">push()</p>
      </motion.div>
    </motion.div>
  );
}
