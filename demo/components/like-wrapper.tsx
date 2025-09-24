import LikeButton from "./like-button";
import { incrementLikesAction } from "@/app/actions";
import { getRedis } from "@/lib/redis";
import { connection } from "next/server";

export default async function LikeWrapper() {
  await connection();

  const redis = getRedis();
  const count = await redis.get("demo:likes");
  const initialCount = count ? parseInt(count, 10) : 0;

  return (
    <LikeButton initialCount={initialCount} onLike={incrementLikesAction} />
  );
}
