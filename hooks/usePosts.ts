import { api } from "@/lib/api";
import { getDashboardData } from "@/lib/dashboard.service";
import {
  CreatePostDTO,
  Post,
  PostResponseDTO,
  postSchema,
  UpdatePostDTO,
} from "@/lib/validations/posts.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const postsKey = {
  all: ["posts"] as const,
};

async function createPost(post: CreatePostDTO): Promise<Post> {
  const { data } = await api.post("/", post);
  return postSchema.parse(data);
}

async function updatePost(postId: number, post: UpdatePostDTO): Promise<Post> {
  const { data } = await api.patch(`/${postId}/`, post);
  return postSchema.parse(data);
}

async function deletePost(postId: number): Promise<void> {
  await api.delete(`/${postId}/`);
}

export const STALE_TIME = 1000 * 60 * 5;

type MutationSnapshot = {
  previousPosts: PostResponseDTO | null;
};

type CreateMutationSnapshot = MutationSnapshot & {
  optimisticPostId: number;
};

const createPostsCache = (post: Post): PostResponseDTO => ({
  count: 1,
  next: null,
  previous: null,
  results: [post],
});

const replaceCachedPost = (
  posts: PostResponseDTO,
  targetPostId: number,
  nextPost: Post,
): PostResponseDTO => ({
  ...posts,
  results: posts.results.map((post) =>
    post.id === targetPostId ? nextPost : post,
  ),
});

export default function usePosts(postId: number | null = null) {
  const queryClient = useQueryClient();

  const invalidatePosts = async () => {
    await queryClient.invalidateQueries({
      queryKey: postsKey.all,
    });
  };

  const getPostsSnapshot = (): PostResponseDTO | null =>
    queryClient.getQueryData<PostResponseDTO>(postsKey.all) ?? null;

  const restorePostsSnapshot = (snapshot: PostResponseDTO | null) => {
    if (snapshot === null) {
      queryClient.removeQueries({
        queryKey: postsKey.all,
        exact: true,
      });
      return;
    }

    queryClient.setQueryData<PostResponseDTO>(postsKey.all, snapshot);
  };

  const postsQuery = useQuery({
    queryKey: postsKey.all,
    queryFn: () => getDashboardData(api),
    staleTime: STALE_TIME,
  });

  const createMutation = useMutation<
    Post,
    Error,
    CreatePostDTO,
    CreateMutationSnapshot
  >({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: postsKey.all,
      });

      const previousPosts = getPostsSnapshot();
      const optimisticPostId = -Date.now();
      const optimisticPost: Post = {
        id: optimisticPostId,
        username: newPost.username,
        created_datetime: new Date(),
        title: newPost.title,
        content: newPost.content,
      };

      const nextPosts =
        previousPosts === null
          ? createPostsCache(optimisticPost)
          : {
              ...previousPosts,
              count: previousPosts.count + 1,
              results: [optimisticPost, ...previousPosts.results],
            };

      queryClient.setQueryData<PostResponseDTO>(postsKey.all, nextPosts);

      return {
        previousPosts,
        optimisticPostId,
      };
    },
    onError: (_error, _variables, context) => {
      if (!context) {
        return;
      }

      restorePostsSnapshot(context.previousPosts);
    },
    onSuccess: (savedPost, _variables, context) => {
      if (!context) {
        return;
      }

      const currentPosts = getPostsSnapshot();

      if (currentPosts === null) {
        queryClient.setQueryData<PostResponseDTO>(
          postsKey.all,
          createPostsCache(savedPost),
        );
        return;
      }

      const hasOptimisticPost = currentPosts.results.some(
        (post) => post.id === context.optimisticPostId,
      );

      if (hasOptimisticPost) {
        queryClient.setQueryData<PostResponseDTO>(
          postsKey.all,
          replaceCachedPost(currentPosts, context.optimisticPostId, savedPost),
        );
        return;
      }

      const hasSavedPost = currentPosts.results.some(
        (post) => post.id === savedPost.id,
      );

      queryClient.setQueryData<PostResponseDTO>(postsKey.all, {
        ...currentPosts,
        count: hasSavedPost ? currentPosts.count : currentPosts.count + 1,
        results: hasSavedPost
          ? replaceCachedPost(currentPosts, savedPost.id, savedPost).results
          : [savedPost, ...currentPosts.results],
      });
    },

    onSettled: async () => {
      await invalidatePosts();
    },
  });

  const updateMutation = useMutation<
    Post,
    Error,
    UpdatePostDTO,
    MutationSnapshot
  >({
    mutationFn: async (post) => {
      if (postId === null) {
        throw new Error("Post ID is required.");
      }

      return updatePost(postId, post);
    },
    onMutate: async (nextPostData) => {
      if (postId === null) {
        throw new Error("Post ID is required.");
      }

      await queryClient.cancelQueries({
        queryKey: postsKey.all,
      });

      const previousPosts = getPostsSnapshot();

      if (previousPosts !== null) {
        queryClient.setQueryData<PostResponseDTO>(postsKey.all, {
          ...previousPosts,
          results: previousPosts.results.map((post) =>
            post.id === postId ? { ...post, ...nextPostData } : post,
          ),
        });
      }

      return {
        previousPosts,
      };
    },
    onError: (_error, _variables, context) => {
      if (!context) {
        return;
      }

      restorePostsSnapshot(context.previousPosts);
    },
    onSuccess: (savedPost) => {
      const currentPosts = getPostsSnapshot();

      if (currentPosts === null) {
        return;
      }

      queryClient.setQueryData<PostResponseDTO>(
        postsKey.all,
        replaceCachedPost(currentPosts, savedPost.id, savedPost),
      );
    },
    onSettled: async () => {
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
