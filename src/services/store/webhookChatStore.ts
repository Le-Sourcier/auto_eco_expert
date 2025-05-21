import { create } from "zustand";
import axios from "axios";
import {
  CarRequestType,
  RecommendationsOutput,
  WebhookResponse,
  WebHookState,
} from "../types";

export const useWebHook = create<WebHookState>((set) => ({
  data: {} as RecommendationsOutput | null,
  loading: false,
  error: null,

  sendMessage: async ({
    ...props
  }: CarRequestType): Promise<WebhookResponse<RecommendationsOutput>> => {
    try {
      set({ loading: true, error: null });
      
      const response = await axios.post<WebhookResponse<RecommendationsOutput>>(
        `https://mgd.app.n8n.cloud/webhook/9c3cc1ab-7796-480d-905b-6878b07ba15b`,
        {
          ...props,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MDk0YjhkLTI0ODgtNDkwZS1hNTgxLWI0NzJiNzU4MzFiNCIsImVtYWlsIjoiaGRoQGdtYWlsLmNvbSIsImlhdCI6MTc0NzQyNDUwMSwiZXhwIjoxNzUwMDE2NTAxfQ.CQ55_GidhdTGB0gMUOuOpC2ODK_rTtfPrztTnIkaaw0`,
          },
          timeout: 10000, // 10 second timeout
        }
      );

      if (!response.data || !response.data.jsonData || response.data.jsonData.length === 0) {
        const error = new Error("Invalid response from server");
        set({ loading: false, error: error.message });
        return {
          jsonData: [{
            output: {
              full_collections: [],
              highest_recommandation_selections: [],
              highest_recommandation_selections_view: ["Sorry, we couldn't process your request at this time. Please try again later."]
            }
          }]
        };
      }

      set({ data: response.data.jsonData[0].output, loading: false, error: null });
      return response.data;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      set({ error: errorMessage, loading: false });
      
      // Return a fallback response instead of throwing
      return {
        jsonData: [{
          output: {
            full_collections: [],
            highest_recommandation_selections: [],
            highest_recommandation_selections_view: ["Sorry, we couldn't connect to our recommendation service. Please try again later."]
          }
        }]
      };
    }
  },
}));