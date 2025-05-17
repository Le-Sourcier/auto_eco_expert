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
  isLoading: false,
  error: null,

  sendMessage: async ({
    ...props
  }: CarRequestType): Promise<WebhookResponse<RecommendationsOutput>> => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.post<WebhookResponse<RecommendationsOutput>>(
        `https://mgd.app.n8n.cloud/webhook/9c3cc1ab-7796-480d-905b-6878b07ba15b`,
        {
          ...props,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MDk0YjhkLTI0ODgtNDkwZS1hNTgxLWI0NzJiNzU4MzFiNCIsImVtYWlsIjoiaGRoQGdtYWlsLmNvbSIsImlhdCI6MTc0NzQyNDUwMSwiZXhwIjoxNzUwMDE2NTAxfQ.CQ55_GidhdTGB0gMUOuOpC2ODK_rTtfPrztTnIkaaw0`,
          },
        }
      );
      const { jsonData, ...rest } = res.data;
      let data: RecommendationsOutput | null = null;
      if (
        Array.isArray(jsonData) &&
        jsonData.length > 0 &&
        jsonData[0]?.output
      ) {
        data = jsonData[0].output as RecommendationsOutput;
      } else if (
        jsonData &&
        typeof jsonData === "object" &&
        "collection_find_count" in jsonData
      ) {
        data = jsonData as unknown as RecommendationsOutput;
      }
      set({ data, isLoading: false });
      return { ...rest, jsonData };
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));
