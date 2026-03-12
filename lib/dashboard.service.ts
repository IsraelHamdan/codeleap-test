import { AxiosInstance } from "axios";
import {
  PostResponseDTO,
  postsResponseSchema,
} from "./validations/posts.schema";

export const getDashboardData = async (api: AxiosInstance) => {
  const { data } = await api.get<PostResponseDTO>("/");
  return postsResponseSchema.parse(data);
};
