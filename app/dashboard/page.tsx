'use client';

import usePosts from "@/hooks/usePosts";
import { toast } from "sonner";
import PostCard from "./_components/PostCard";

export default function DashboardPage() {

  const { posts, isLoading } = usePosts();
  console.log("🚀 ~ DashboardPage ~ posts:", posts);

  if (isLoading) {
    toast.info("loading data...");
  }

  const orderedPosts =
    posts?.results
      ?.slice()
      .sort(
        (a, b) =>
          b.created_datetime.getTime() -
          a.created_datetime.getTime()
      ) ?? [];


  return (
    <div className="space-y-6">
      {orderedPosts.length === 0 ? (
        <div className="text-xl text-accent-foreground">Ainda não há posts Criados</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );


}