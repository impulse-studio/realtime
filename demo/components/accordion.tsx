"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center justify-between p-2 px-4 m-2 cursor-pointer min-h-12"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <h3 className="text-md font-mono text-gray-300">{title}</h3>
        <ChevronDown
          className={`size-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        <div className="p-4 flex flex-col gap-2">{children}</div>
      </motion.div>
    </div>
  );
}
