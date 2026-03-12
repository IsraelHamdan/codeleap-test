import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Post, } from "@/lib/validations/posts.schema";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className=" h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardDescription>
        CreatedBy: @{post.username}
      </CardDescription>
      <CardContent className="spacy-y-2">
        <div className="text-sm font-medium">{post.content}</div>
      </CardContent>
    </Card>
  );

}