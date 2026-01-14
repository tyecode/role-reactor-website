import type { CorePackage, PricingData } from "@/types/pricing";

export type { CorePackage, PricingData };

/**
 * Default packages when API is unavailable
 */
export const defaultPackages: CorePackage[] = [
  {
    id: "$5",
    name: "Starter",
    price: 5,
    currency: "USD",
    baseCores: 75,
    bonusCores: 5,
    totalCores: 80,
    valuePerDollar: "16.0 Cores/$1",
    description: "Perfect for trying AI features",
    estimatedUsage: "~8,000 chat messages or 38 images",
    popular: false,
    features: [],
  },
  {
    id: "$10",
    name: "Basic",
    price: 10,
    currency: "USD",
    baseCores: 150,
    bonusCores: 15,
    totalCores: 165,
    valuePerDollar: "16.5 Cores/$1",
    description: "Most popular choice for regular users",
    estimatedUsage: "~16,500 chat messages or 78 images",
    popular: true,
    features: [],
  },
  {
    id: "$25",
    name: "Pro",
    price: 25,
    currency: "USD",
    baseCores: 375,
    bonusCores: 50,
    totalCores: 425,
    valuePerDollar: "17.0 Cores/$1",
    description: "Best value for power users",
    estimatedUsage: "~42,500 chat messages or 202 images",
    popular: false,
    features: [],
  },
  {
    id: "$50",
    name: "Ultimate",
    price: 50,
    currency: "USD",
    baseCores: 750,
    bonusCores: 125,
    totalCores: 875,
    valuePerDollar: "17.5 Cores/$1",
    description: "Maximum value for heavy usage",
    estimatedUsage: "~87,500 chat messages or 416 images",
    popular: false,
    features: ["Priority processing", "Dedicated support"],
  },
];

// Legacy export for backwards compatibility
export interface DonationOption {
  amount: string;
  cores: number;
  coresPerDollar: number;
}

export const donationOptions: DonationOption[] = defaultPackages.map((pkg) => ({
  amount: `$${pkg.price}`,
  cores: pkg.totalCores,
  coresPerDollar: pkg.totalCores / pkg.price,
}));
