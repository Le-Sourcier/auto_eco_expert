export interface ApiResponse<T> {
  error: boolean;
  status: number;
  message: string;
  data: T;
}

// ***************************** LEADS ***************************//
export interface Lead {
  id: string;
  first_name: string;
  email: string;
  phone: string;
  budget: string;
  car_type: string;
  financing_type: string;
  car_brand_id?: string;
  car_model_id?: string;
  source?: string;
  language?: string;
}

export interface LeadRegistration {
  first_name: string;
  email: string;
  phone: string;
  budget: string;
  car_type: string;
  financing_type: string;
  car_brand_id?: string;
  car_model_id?: string;
  source?: string;
  language?: string;
}

export interface LeadWithToken extends Lead {
  accessToken: string;
  refreshToken: string;
}

export interface LeadsState {
  lead: Lead | null;
  loading: boolean;
  accessToken: string | null;
  createLead: ({
    first_name,
    email,
    phone,
    budget,
    car_type,
    financing_type,
    car_brand_id,
    car_model_id,
    source,
    language,
  }: LeadRegistration) => Promise<{ error: Error | null; data: Lead | null }>;
}

// ***************************** CHAT***************************//
export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  options?: string[];
  type?: "text" | "buttons" | "input";
}
export interface ChatState {
  message: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  getMessage: (id: string) => Promise<ChatMessage[]>;
  sendMessage: ({ content, type }: ChatMessage) => Promise<ChatMessage[]>;
}
