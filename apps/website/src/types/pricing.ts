/**
 * Core credit package from the API
 */
export interface CorePackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  baseCores: number;
  bonusCores: number;
  totalCores: number;
  valuePerDollar: string;
  description: string;
  estimatedUsage: string;
  popular: boolean;
  features: string[];
}

/**
 * Promotion/bonus offer
 */
export interface Promotion {
  name: string;
  type: "first_purchase" | "weekend" | "holiday" | "referral" | string;
  bonus: string;
  maxBonus?: number;
  description: string;
  active?: boolean;
}

/**
 * Referral system configuration
 */
export interface ReferralSystem {
  enabled: boolean;
  referrerBonus: string;
  refereeBonus: string;
  minimumPurchase: number;
}

/**
 * User-specific pricing info (when authenticated)
 */
export interface UserPricingInfo {
  userId: string;
  isFirstPurchase: boolean;
  currentCredits: number;
  eligibleForFirstPurchaseBonus: boolean;
  hasActivePro?: boolean;
}

/**
 * Complete pricing response from API
 */
export interface PricingData {
  packages: CorePackage[];
  minimumPayment: number;
  currency: string;
  paymentMethods: {
    crypto: boolean;
    knotengine?: boolean;
    plisio?: boolean;
  };
  promotions: Promotion[];
  referralSystem: ReferralSystem;
  user?: UserPricingInfo;
}
