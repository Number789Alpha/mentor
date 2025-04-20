
export type PlanType = "monthly" | "quarterly" | "annual";

export interface PlanDetails {
  price: number;
  discountedPrice: number;
  sessions: number;
  term: string;
  savings: string;
}

export const planData: Record<PlanType, PlanDetails> = {
  monthly: {
    price: 1500,
    discountedPrice: 1500,
    sessions: 4,
    term: "monthly",
    savings: "0%"
  },
  quarterly: {
    price: 3000,
    discountedPrice: 2700,
    sessions: 12,
    term: "quarterly",
    savings: "10%"
  },
  annual: {
    price: 12000,
    discountedPrice: 9000,
    sessions: 48,
    term: "annual",
    savings: "25%"
  }
};
