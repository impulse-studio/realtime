"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  RemixiconComponentType,
  RiAngularjsLine,
  RiJavascriptLine,
  RiNextjsLine,
  RiReactjsLine,
  RiSvelteLine,
  RiVuejsLine,
} from "@remixicon/react";

const ICONS = [
  RiAngularjsLine,
  RiVuejsLine,
  RiNextjsLine,
  RiSvelteLine,
  RiJavascriptLine,
  RiReactjsLine,
];
const BASE_ROTATION_PER_SECOND = 10;
const ACCELERATION_FACTOR = 0.5;
const MAX_SPEED_BOOST = 200;
const DECAY_FACTOR = 0.95;

export default function RoundCarousel() {
  const icons = [...ICONS, ...ICONS];
  const [rotation, setRotation] = useState(0);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const speedBoostRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;

      speedBoostRef.current += deltaY * ACCELERATION_FACTOR;
      speedBoostRef.current = Math.max(
        -MAX_SPEED_BOOST,
        Math.min(MAX_SPEED_BOOST, speedBoostRef.current)
      );

      lastScrollYRef.current = currentScrollY;
    };

    const animate = (currentTime: number) => {
      if (lastTimeRef.current !== 0) {
        const deltaTime = currentTime - lastTimeRef.current;

        if (!isHoveredRef.current) {
          const effectiveRotationPerSecond =
            BASE_ROTATION_PER_SECOND + speedBoostRef.current;
          const deltaRotation = (effectiveRotationPerSecond * deltaTime) / 1000;
          setRotation((prev) => prev + deltaRotation);
        }

        speedBoostRef.current *= DECAY_FACTOR;
      }
      lastTimeRef.current = currentTime;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-start flex-1 relative -mx-4 -mb-4 justify-center overflow-hidden bg-[radial-gradient(circle_8rem_at_bottom_center,#f99c0040,transparent)] min-h-32">
      <div
        className="size-80 absolute flex items-center justify-center"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {icons.map((icon, index) => (
          <Item
            key={index}
            rotation={rotation + index * (360 / icons.length)}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}

function Item({
  rotation,
  icon,
}: {
  icon: RemixiconComponentType;
  rotation: number;
}) {
  const position = useMemo(() => {
    return {
      x: Math.cos(rotation * (Math.PI / 180)) * 120,
      y: Math.sin(rotation * (Math.PI / 180)) * 120,
    };
  }, [rotation]);

  const Icon = icon;

  return (
    <div
      className="size-16 absolute grid place-items-center"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      suppressHydrationWarning
    >
      <Icon className="size-10" />
    </div>
  );
}
