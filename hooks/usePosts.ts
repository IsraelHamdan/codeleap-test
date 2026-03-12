import { api } from "@/lib/api";
import { getDashboardData } from "@/lib/dashboard.service";
import { CreatePostDTO, Post } from "@/lib/validations/posts.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const postsKey = {
  all: ["posts"] as const,
};

async function createPost(post: CreatePostDTO): Promise<Post> {
  const { data } = await api.post<Post>("/", post);
  return data;
}

export default function usePosts(postId?: string) {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: postsKey.all,
    queryFn: () => getDashboardData(api),
  });

  const createMutation = useMutation<Post, Error, CreatePostDTO>({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKey.all,
      });
    },
  });

  return {
    posts: postsQuery.data,
    createPost: createMutation.mutate,

    isCreating: createMutation.isPending,
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
  };
}
