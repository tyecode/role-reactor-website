import type { CorePackage, PricingData } from "@/types/pricing";
import {
  SiBitcoin,
  SiEthereum,
  SiTether,
  SiXrp,
  SiSolana,
  SiBinance,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type { CorePackage, PricingData };

/**
 * Supported cryptocurrencies - Top 6 by market cap and popularity
 */

export const supportedCryptos: Array<{
  id: string;
  name: string;
  icon: IconType;
  color: string;
}> = [
  { id: "BTC", name: "Bitcoin", icon: SiBitcoin, color: "#F7931A" },
  { id: "ETH", name: "Ethereum", icon: SiEthereum, color: "#627EEA" },
  { id: "USDT", name: "Tether", icon: SiTether, color: "#26A17B" },
  { id: "XRP", name: "XRP", icon: SiXrp, color: "#23292F" },
  { id: "SOL", name: "Solana", icon: SiSolana, color: "#14F195" },
  { id: "BNB", name: "BNB", icon: SiBinance, color: "#F3BA2F" },
];
