import { incrementLikesAction } from "@/app/actions";
import LikeButton from "./like-button";
import { getRedis } from "@/lib/redis";

export default async function LikeWrapper() {
  const initialCount = Number(await getRedis().get("demo:likes")) || 0;
  return (
    <LikeButton initialCount={initialCount} onLike={incrementLikesAction} />
  );
}
