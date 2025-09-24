"use client";

import { useEffect, useState } from "react";
import { getInitialLikes, incrementLikesAction } from "@/app/actions";
import LikeButton from "./like-button";

export default function LikeWrapper() {
  const [initialCount, setInitialCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchInitialLikes = async () => {
      try {
        const count = await getInitialLikes();
        setInitialCount(count);
      } catch (error) {
        console.error("Failed to fetch initial likes:", error);
        setInitialCount(0);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchInitialLikes();
  }, []);

  if (!isLoaded) {
    return (
      <LikeButton initialCount={0} onLike={incrementLikesAction} />
    );
  }

  return (
    <LikeButton initialCount={initialCount} onLike={incrementLikesAction} />
  );
}
