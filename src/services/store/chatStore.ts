import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ChatState,
  ApiResponse,
  ChatMessage,
  AnalyzeReq,
  AnalyzeResponse,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_URL + "/chat";
const BASE_URL_2 = import.meta.env.VITE_API_URL + "/cars";

export const useChatStore = create<ChatState>((set) => ({
  message: [],
  isLoading: false,
  error: null,
  data: [],
  // analyze: async
  // http://localhost:3000/api/cars/analyzer

  analyze: async (
    props: AnalyzeReq
  ): Promise<ApiResponse<AnalyzeResponse[]>> => {
    const lang = Cookies.get("i18next") || localStorage.getItem("i18next");

    set({ isLoading: true, error: null });
    try {
      const res = await axios.post<ApiResponse<AnalyzeResponse[]>>(
        `${BASE_URL_2}/analyzer`,
        { ...props, language: lang }
      );
      const { message, data } = res.data;
      set({
        message: [
          {
            content: message,
            type: "text",
            id: Date.now().toLocaleString(),
            isBot: false,
          },
        ],
        data: data || [],
        isLoading: false,
        error: null,
      });
      return {
        data: data || [],
        message: message,
        status: 200,
        error: false,
      };
    } catch (err) {
      const error = (err as Error).message;
      set({ error: error, isLoading: false });
      // throw new Error(error);
      return { data: [], message: "Error", status: 500, error: true };
    }
  },

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
    const lng = Cookies.get("i18next") || localStorage.getItem("i18next");

    try {
      // On attend 1 seul message en retour
      const res = await axios.post<ApiResponse<ChatMessage>>(
        `${BASE_URL}/send-message/${sessionId}`,
        { message: content, language: lng, type }
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
