export interface DonationOption {
  amount: string;
  cores: number;
  coresPerDollar: number;
}

export const donationOptions: DonationOption[] = [
  { amount: "$10", cores: 100, coresPerDollar: 10 },
  { amount: "$25", cores: 250, coresPerDollar: 10 },
  { amount: "$50", cores: 500, coresPerDollar: 10 },
];

