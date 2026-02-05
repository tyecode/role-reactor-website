"use client";

import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface PayPalButtonProps {
  amount: number;
  packageId: string;
  userId: string;
  onSuccess: (details: unknown) => void;
  onError: (error: Error | unknown) => void;
}

export function PayPalButton({
  amount,
  packageId,
  userId,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);

  const API_BASE =
    process.env.NEXT_PUBLIC_BOT_API_URL || "https://api.rolereactor.app";

  const createOrder = async () => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/payments/paypal/create`,
        {
          amount,
          packageId,
          discordId: userId,
        },
      );

      const order = response.data;
      if (order.status === "success" && order.data?.id) {
        return order.data.id;
      }
      throw new Error(order.message || "Failed to create order");
    } catch (err: unknown) {
      console.error("PayPal createOrder error:", err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = err as any; // Cast for accessing response data
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Failed to initialize payment. Please try again.";
      setError(errorMessage);
      throw err;
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/payments/paypal/capture`,
        {
          orderID: data.orderID,
        },
      );

      const captureData = response.data;
      if (captureData.status === "success") {
        onSuccess(captureData.data);
      } else {
        throw new Error(captureData.message || "Capture failed");
      }
    } catch (err: unknown) {
      console.error("PayPal onApprove error:", err);
      onError(err);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-sm p-4 text-center rounded-xl bg-red-500/10 border border-red-500/20">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full relative isolate bg-card overflow-hidden min-h-[150px]">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-card/50">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}
      <div
        className="w-full relative z-10"
        style={{
          filter: "invert(1) hue-rotate(180deg)",
          mixBlendMode: "lighten",
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "white",
            shape: "rect",
            label: "pay",
            height: 55,
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => {
            console.error("PayPal SDK Error:", err);
            setError("PayPal system is temporarily unavailable.");
            onError(err);
          }}
        />
      </div>
    </div>
  );
}
