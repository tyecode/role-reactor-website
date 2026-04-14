import type { CorePackage, PricingData } from "@/types/pricing";
import {
  SiBitcoin,
  SiEthereum,
  SiTether,
  SiDogecoin,
  SiSolana,
  SiLitecoin,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type { CorePackage, PricingData };

/**
 * Supported cryptocurrencies - matched with Plisio supported currencies
 */
export const supportedCryptos: Array<{
  id: string;
  name: string;
  icon: IconType;
  color: string;
}> = [
  { id: "BTC", name: "Bitcoin", icon: SiBitcoin, color: "#F7931A" },
  { id: "ETH", name: "Ethereum", icon: SiEthereum, color: "#627EEA" },
  { id: "USDT_TRX", name: "USDT (TRC20)", icon: SiTether, color: "#26A17B" },
  { id: "USDT_BSC", name: "USDT (BEP20)", icon: SiTether, color: "#26A17B" },
  { id: "USDT", name: "USDT (ERC20)", icon: SiTether, color: "#26A17B" },
  { id: "USDC", name: "USDC (ERC20)", icon: SiTether, color: "#2775CA" },
  { id: "DOGE", name: "Dogecoin", icon: SiDogecoin, color: "#C2A633" },
  { id: "LTC", name: "Litecoin", icon: SiLitecoin, color: "#345D9D" },
  { id: "SOL", name: "Solana", icon: SiSolana, color: "#9945FF" },
];
