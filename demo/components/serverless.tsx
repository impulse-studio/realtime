"use client";

import { AppWindow, Database } from "lucide-react";
import ServerlessHost from "./serverless-host";

export default function Serverless() {
  return (
    <div className="flex-1 p-4 hidden sm:block">
      <div className="relative h-[115px] w-[541px]">
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-800 p-4 absolute w-[159px] h-[57px] left-0 bottom-0 bg-gray-900">
          <AppWindow className="size-6" />
          <span className="text-md font-bold">Client</span>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-800 p-4 absolute w-[159px] h-[57px] left-1/2 -translate-x-1/2 top-0 bg-gray-900">
          <Database className="size-6" />
          <span className="text-md font-bold">Realtime</span>
        </div>

        <ServerlessHost />

        {/* SVG for connecting lines and paths */}
        <svg
          width="541"
          height="115"
          viewBox="0 0 541 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 -z-10"
        >
          <defs>
            <filter id="amberGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feGaussianBlur stdDeviation="6" result="outerGlow" />
              <feMerge>
                <feMergeNode in="outerGlow" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="amberFlicker"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur result="coloredBlur">
                <animate
                  attributeName="stdDeviation"
                  values="2.8;3.5;2.2;3.1;2.6;3.4;2.4;3.0;2.5;3.2;2.7;3.3;2.8"
                  keyTimes="0;0.09;0.18;0.31;0.42;0.53;0.64;0.73;0.81;0.89;0.94;0.97;1"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </feGaussianBlur>
              <feGaussianBlur stdDeviation="6" result="outerGlow" />
              <feMerge>
                <feMergeNode in="outerGlow" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="cursorGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feGaussianBlur stdDeviation="4" result="outerGlow" />
              <feMerge>
                <feMergeNode in="outerGlow" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Faint background tracks */}
          <g>
            <path
              d="M 351 29 L 462 29 C 471 29 478 36 478 45 V 58"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
            <path
              d="M 160 86 L 381 86"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.3"
            />
          </g>

          {/* Animated cursors */}
          <g filter="url(#cursorGlow)">
            <path
              id="anim-serverless-to-realtime"
              d="M 351 29 L 462 29 C 471 29 478 36 478 45 V 58"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="12 88"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;100"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
            <path
              id="anim-client-to-serverless"
              d="M 160 86 L 381 86"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="6 94"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="-100;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          <g filter="url(#amberFlicker)">
            <path
              id="anim-client-to-realtime"
              d="M 191 29 L 80 29 C 71 29 64 36 64 45 V 58"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="strokeOpacity"
                values="1;0.72;0.93;0.58;0.88;0.64;1;0.7;0.9;0.5;0.85;0.6;1"
                keyTimes="0;0.08;0.17;0.29;0.37;0.5;0.58;0.65;0.73;0.82;0.9;0.96;1"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          <g>
            <rect
              width="221"
              height="1"
              transform="translate(160 86)"
              fill="#fff4"
              id="serverless-to-client"
            />
            <g>
              <path
                d="M63 45C63 35.6112 70.6112 28 80 28H191V30H80C71.7157 30 65 36.7157 65 45H63ZM191 58H64H191ZM63 58V45C63 35.6112 70.6112 28 80 28V30C71.7157 30 65 36.7157 65 45V58H63ZM191 29V58V29Z"
                fill="#fff4"
                id="client-to-realtime"
              />
              <path
                d="M351 28H462C471.389 28 479 35.6112 479 45H477C477 36.7157 470.284 30 462 30H351V28ZM478 58H351H478ZM351 58V29V58ZM462 28C471.389 28 479 35.6112 479 45V58H477V45C477 36.7157 470.284 30 462 30V28Z"
                fill="#fff4"
                id="serverless-to-realtime"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
