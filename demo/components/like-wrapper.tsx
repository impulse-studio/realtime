"use client";

import { useEffect, useState } from "react";
import LikeButton from "./like-button";

export default function LikeWrapper() {
  const [initialCount, setInitialCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchInitialLikes = async () => {
      try {
        const response = await fetch('/api/likes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { count } = await response.json();
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

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to increment likes:", error);
    }
  };

  if (!isLoaded) {
    return (
      <LikeButton initialCount={0} onLike={handleLike} />
    );
  }

  return (
    <LikeButton initialCount={initialCount} onLike={handleLike} />
  );
}
