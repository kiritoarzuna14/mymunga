"use client";

import { useEffect, useState } from "react";
import { readFollows, subscribe, toggleFollow } from "@/lib/library";

export function FollowButton({ slug }: { slug: string }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    function sync() {
      setFollowing(readFollows().includes(slug));
    }
    sync();
    return subscribe(sync);
  }, [slug]);

  return (
    <button
      type="button"
      className={following ? "follow active" : "follow"}
      aria-pressed={following}
      onClick={() => toggleFollow(slug)}
    >
      {following ? "ติดตามอยู่" : "+ ติดตาม"}
    </button>
  );
}
