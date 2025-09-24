"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";

const DOCKER_IMAGE = "ghcr.io/impulse-studio/realtime-service";

const variants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

interface CommandProps {
  displayText: string;
  copyText: string;
  icon: React.ReactNode;
}

export default function Command({ displayText, copyText, icon }: CommandProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsCopied(true);
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-center flex-1">
      <div className="bg-gray-900 p-4 rounded-2xl overflow-x-auto border border-gray-700 flex items-center gap-4">
        {icon}

        <code className="bg-none p-0 font-normal flex-1">{displayText}</code>

        <motion.button
          className="bg-gray-800 text-white rounded-xl size-10 flex items-center justify-center relative -m-2 cursor-pointer hover:bg-gray-700"
          onClick={handleCopy}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isCopied ? "check" : "copy"}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center justify-center"
            >
              {isCopied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
