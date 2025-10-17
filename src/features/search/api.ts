import { api } from "@/lib/axios";

export const searchMovies = async (keyword: string) => {
  const { data } = await api.get(`/v1/api/tim-kiem?keyword=${keyword}`);
  return data;
};
