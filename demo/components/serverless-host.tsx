"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import VercelIcon from "./serverless-icons/vercel";
import NetlifyIcon from "./serverless-icons/netlify";
import LambdaIcon from "./serverless-icons/lambda";
import WorkersIcon from "./serverless-icons/workers";

const ICONS = [
  { icon: VercelIcon, name: "Vercel" },
  { icon: NetlifyIcon, name: "Netlify" },
  { icon: LambdaIcon, name: "Lambda" },
  { icon: WorkersIcon, name: "Workers" },
] as const;

const variants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function ServerlessHost() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ICONS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentItem = ICONS[currentIndex];
  const IconComponent = currentItem.icon;

  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-800 p-4 absolute w-[159px] h-[57px] right-0 bottom-0 bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="flex items-center gap-2"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <IconComponent className="size-6" />
          <span className="text-md font-bold">{currentItem.name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
