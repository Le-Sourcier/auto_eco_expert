import { create } from "zustand";

import axios from "axios";
import { ChatState, ApiResponse, ChatMessage } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL + "/auth";

export const useChatStore = create<ChatState>((set) => ({
  message: [],
  isLoading: false,
  error: null,

  getMessage: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.get<ApiResponse<ChatMessage[]>>(
        `${BASE_URL}/chat/${id}`
      );
      const { data } = res.data;

      set({ message: data || [], isLoading: false });
      return data || [];
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return [];
    }
  },
  sendMessage: async ({ content, type }: ChatMessage) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.post<ApiResponse<ChatMessage[]>>(
        `${BASE_URL}/chat`,
        {
          content: content,
          isBot: false,
          type: type,
        }
      );
      const { data } = res.data;

      set({ message: data || [], isLoading: false });
      return data || [];
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return [];
    }
  },
  getBotResponse: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.get<ApiResponse<ChatMessage[]>>(
        `${BASE_URL}/chat/${id}`
      );
      const { data } = res.data;
      set({ message: data || [], isLoading: false });
      return data || [];
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return [];
    }
  },
}));
