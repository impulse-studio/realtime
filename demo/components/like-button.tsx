"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimate, AnimatePresence } from "motion/react";
import { getClientRealtime } from "../lib/realtime/client";
import { HeartIcon } from "lucide-react";

interface FloatingHeart {
  id: string;
  left: number;
}

interface LikeButtonProps {
  initialCount: number;
  onLike: () => Promise<void>;
}

export default function LikeButton({ initialCount, onLike }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [scope, animate] = useAnimate();
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());

  const spawnFloatingHeart = useCallback(() => {
    const id = `heart-${Date.now()}-${Math.random()}`;
    const left = Math.random() * 100;

    setFloatingHearts((prev) => [...prev, { id, left }]);

    const timeout = setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((heart) => heart.id !== id));
      timeoutsRef.current.delete(timeout);
    }, 2500);

    timeoutsRef.current.add(timeout);
  }, []);

  useEffect(() => {
    const client = getClientRealtime();

    const unsubscribe = client.subscribe("demo:likes:updated", (event) => {
      spawnFloatingHeart();
      setCount((prev) => Math.max(prev, event.payload.count));
    });

    return unsubscribe;
  }, [spawnFloatingHeart]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, []);

  const handleOptimisticLike = useCallback(async () => {
    setCount((prev) => prev + 1);
    await onLike();
  }, [count, onLike]);

  return (
    <div className="relative mt-8 border rounded-2xl w-80 h-48 mx-4 flex items-center justify-center border-gray-800 bg-gray-950 bg-[linear-gradient(rgba(75,85,99,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(75,85,99,0.3)_1px,transparent_1px)] bg-[size:24px_24px] bg-center overflow-hidden">
      <div className="absolute right-4 bottom-2 flex">
        <svg
          width="34"
          height="36"
          viewBox="0 0 34 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.9998 33.2789C33.0114 33.2789 32.3948 33.2789 29.0535 33.6744C14.5993 35.3849 -5.55362 30.6173 4.88757 13.1487C5.9699 11.3379 9.62335 2.3696 12.705 3.34349C15.4306 4.20486 16.0375 9.83965 16.0717 9.54727C16.2422 8.08941 14.2035 5.02032 12.9765 3.43145C12.2498 2.49042 11.3097 2.14163 10.7399 2C7.76896 2.0406 5.07383 3.46657 2.53437 4.82648"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-white text-sm -rotate-6 mb-3 ml-2">
          Test it by liking <br />
          on{" "}
          <a
            href="/"
            className="text-amber-600 hover:underline"
            target="_blank"
          >
            another window
          </a>
          !
        </p>
      </div>

      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none"
            style={{
              left: `${heart.left}%`,
              bottom: "-24px",
            }}
            initial={{
              opacity: 0.8,
              scale: 1.2,
              y: 0,
              x: 0,
            }}
            animate={{
              opacity: 0,
              scale: 0.8,
              y: -200 - Math.random() * 100,
              x: (Math.random() - 0.5) * 40,
            }}
            exit={{
              opacity: 0,
              scale: 0.3,
            }}
            transition={{
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <HeartIcon fill="currentColor" className="w-6 h-6 text-amber-500" />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        ref={scope}
        type="button"
        onClick={handleOptimisticLike}
        className="bg-gradient-to-t from-amber-700 to-amber-600 text-white rounded-2xl px-4 py-2 flex items-center gap-2 relative hover:from-amber-600 hover:to-amber-500 cursor-pointer"
        whileTap={{ scale: 0.95 }}
        onTapStart={() => {
          const dx = (Math.random() - 0.5) * 8;
          const dy = (Math.random() - 0.5) * 8;
          const dr = (Math.random() - 0.5) * 10;
          animate(
            scope.current,
            {
              x: [0, dx, -dx, 0],
              y: [0, dy, -dy, 0],
              rotate: [0, dr, -dr, 0],
            },
            {
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }
          );
        }}
      >
        <div className="absolute left-0.5 right-0.5 bottom-0.5 rounded-b-2xl bg-gradient-to-t pointer-events-none h-4 from-white to-transparent opacity-30" />
        <HeartIcon fill="currentColor" className="w-4 h-4" />
        {count}
      </motion.button>
    </div>
  );
}
