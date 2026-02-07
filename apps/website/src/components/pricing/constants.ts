import type {
  CorePackage,
  PricingData,
} from "@role-reactor/core/types/pricing";

export type { CorePackage, PricingData };

/**
 * Supported cryptocurrencies
 */

export const supportedCryptos = [
  { id: "BTC", name: "Bitcoin", icon: "BTC", color: "#F7931A" },
  { id: "ETH", name: "Ethereum", icon: "ETH", color: "#627EEA" },
  { id: "USDT_BSC", name: "USDT (BEP20)", icon: "USDT", color: "#26A17B" },
  { id: "USDT_TRX", name: "USDT (TRC20)", icon: "USDT", color: "#26A17B" },
];
