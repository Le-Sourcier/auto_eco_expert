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
  source?: string;
  language?: string | null;
}

export interface LeadWithToken extends Lead {
  accessToken: string;
  refreshToken: string;
}

export interface LeadsState {
  lead: Lead | null;
  loading: boolean;
  accessToken: string | null;
  message?: string | null;
  createLead: ({
    first_name,
    email,
    phone,
    budget,
    car_type,
    financing_type,
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
  type?:
    | "text"
    | "buttons"
    | "input"
    | "success"
    | "error"
    | "contact"
    | "recovery";
}
export interface AnalyzeReq {
  car_type: string;
  financing_type: string;
  budget: string;
}
export interface AnalyzeResponse {
  id: string;
  make: string;
  model: string;
  motor: string;
  year: string;
  km: string;
  fuel: string;
  gearbox: string;
  discountPct: string;
  priceCash: string;
  priceFrom: string;
  img: string;
  age: string;
}
export interface ChatState {
  message: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  data: AnalyzeResponse[];
  getMessage: (id: string) => Promise<ChatMessage[]>;
  // Avant : sendMessage: ({ content, type }: ChatMessage) => Promise<ChatMessage[]>;
  sendMessage: (msg: ChatMessage) => Promise<ChatMessage>;
  analyze: (req: AnalyzeReq) => Promise<ApiResponse<AnalyzeResponse[]>>;
}

// ***************************** WEBHOOk RESPONSE ***************************//

export interface WebHookState {
  data: RecommendationsOutput | null;
  loading: boolean;
  error: string | null;
  sendMessage: ({
    ...props
  }: CarRequestType) => Promise<WebhookResponse<RecommendationsOutput>>;
}

// Chat message types
export interface CarRequestType {
  car_type: string; // ex. "new"
  budget: string; // ex. "19990"
  financing_type: string; // ex. "100% cash"
  language: string; // ex. "fr"
}

// Représente une seule sélection de véhicule
export interface CarRecommendation {
  budget: string; // ex. "19990"
  car_type: string; // ou plus de valeurs si nécessaire
  car_brand_id: string; // ex. "26"
  car_model_id: string; // ex. "376"
  source: string; // ex. "ClaraDB + Dacia"
  img_url?: string; // URL de l’image (vide si non fourni)
  note: string; // justification et détails
  percentage_rate: string; // taux d’économie, ex. "60%"
}

// Modèle complet de la partie "output" par client
export interface RecommendationsOutput {
  collection_find_count: number; // ex. 8
  highest_recommandations: number; // ex. 3
  full_collections: CarRecommendation[]; // toutes les suggestions
  highest_recommandation_selections: CarRecommendation[]; // top N
  highest_recommandation_selections_view: string[]; // top N
}

// Enveloppe générale du webhook
export interface WebhookResponse<T> {
  jsonData: Array<{
    output: T;
  }>;
}
