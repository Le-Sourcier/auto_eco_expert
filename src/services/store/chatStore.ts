import { create } from "zustand";
import axios from "axios";
import { ChatState, ApiResponse, ChatMessage } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL + "/chat";

export const useChatStore = create<ChatState>((set) => ({
  message: [],
  isLoading: false,
  error: null,

  getMessage: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get<ApiResponse<ChatMessage[]>>(
        `${BASE_URL}/message/${id}`
      );
      set({ message: res.data.data || [], isLoading: false });
      return res.data.data || [];
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return [];
    }
  },

  sendMessage: async ({ id: sessionId, content, type }: ChatMessage) => {
    set({ isLoading: true, error: null });
    try {
      // On attend 1 seul message en retour
      const res = await axios.post<ApiResponse<ChatMessage>>(
        `${BASE_URL}/send-message/${sessionId}`,
        { message: content, type }
      );

      const newMsg = res.data.data;
      // On ajoute ce message à la liste existante

      set((state) => ({
        message: [...state.message, newMsg],
        isLoading: false,
      }));

      return newMsg;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      throw err;
    }
  },

  // si tu gardes getBotResponse, même principe
  getBotResponse: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get<ApiResponse<ChatMessage[]>>(
        `${BASE_URL}/chat/${id}`
      );
      set({ message: res.data.data || [], isLoading: false });
      return res.data.data || [];
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return [];
    }
  },
}));
