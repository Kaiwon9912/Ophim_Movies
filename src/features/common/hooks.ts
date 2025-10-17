import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "https://ophim1.com/v1/api";

export const useOphimList = (type: "the-loai" | "quoc-gia" | "nam-phat-hanh") => {
  return useQuery({
    queryKey: [type],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${type}`);
      return data.data || [];
    },
  });
};
