import { api } from "@/lib/api";
import { getDashboardData } from "@/lib/dashboard.service";
import {
  CreatePostDTO,
  Post,
  UpdatePostDTO,
} from "@/lib/validations/posts.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const postsKey = {
  all: ["posts"] as const,
};

async function createPost(post: CreatePostDTO): Promise<Post> {
  const { data } = await api.post<Post>("/", post);
  return data;
}

async function updatePost(postId: number, post: UpdatePostDTO): Promise<void> {
  await api.patch(`/${postId}/`, post);
}

async function deletePost(postId: number): Promise<void> {
  await api.delete(`/${postId}/`);
}

export default function usePosts(postId: number | null = null) {
  const queryClient = useQueryClient();

  const invalidatePosts = async () => {
    await queryClient.invalidateQueries({
      queryKey: postsKey.all,
    });
  };

  const postsQuery = useQuery({
    queryKey: postsKey.all,
    queryFn: () => getDashboardData(api),
  });

  const createMutation = useMutation<Post, Error, CreatePostDTO>({
    mutationFn: createPost,

    onSuccess: async () => {
      await invalidatePosts();
    },
  });

  const updateMutation = useMutation<void, Error, UpdatePostDTO>({
    mutationFn: async (post) => {
      if (postId === null) {
        throw new Error("Post ID is required.");
      }

      await updatePost(postId, post);
    },
    onSuccess: async () => {
      await invalidatePosts();
    },
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deletePost,
    onSuccess: async () => {
      await invalidatePosts();
    },
  });

  return {
    posts: postsQuery.data,
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
  };
}
