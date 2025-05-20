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
  // const [lead, setLead] = useState<Lead | null>(null);

  loading: false,
  error: null,

  sendMessage: async ({
    ...props
  }: CarRequestType): Promise<WebhookResponse<RecommendationsOutput>> => {
    try {
      set({ loading: true, error: null });
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

      if (res.data.jsonData.length === 0) {
        set({ loading: false, error: "Error occured!" });
      }
      //  const {jsonData} =   res.data
      // set({ data, loading: false, error: null });
      // return { ...rest, jsonData };
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },
}));
