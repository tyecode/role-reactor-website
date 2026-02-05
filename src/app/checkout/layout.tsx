import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Role Reactor",
  description: "Complete your purchase securely with PayPal",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
