"use client";

import { AlertTriangle, CheckCircle2, XCircle, Shield, Zap, Lock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface PaymentInfoProps {
  paymentStatus: string | null;
  error: string | null;
}

export function PaymentInfo({ paymentStatus, error }: PaymentInfoProps) {

  return (
    <div className="text-center mb-20">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 leading-tight">
          Support Role Reactor
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Running a Discord bot isn't free—servers cost money, and building new features takes time. If you like what we're doing and want to help keep Role Reactor free for everyone, consider supporting us. Plus, you'll get Core Energy to unlock some cool AI features.
        </p>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Never Expires</span>
          </div>
        </div>
      </div>
      
      {/* Status Messages */}
      <div className="max-w-[1120px] mx-auto space-y-4">
        {paymentStatus === "success" && (
          <Alert className="bg-green-500/10 border-green-500/30 backdrop-blur-sm">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <AlertTitle className="text-sm font-semibold text-green-200">
              ✅ Payment successful!
            </AlertTitle>
            <AlertDescription className="text-xs text-green-300/90">
              Awesome! Your payment went through. Your Cores should show up in your account in a few minutes once everything's confirmed. You can check your balance with{" "}
              <code className="bg-green-500/20 px-1.5 py-0.5 rounded text-green-200">
                /core balance
              </code>
              {" "}in Discord whenever you want.
            </AlertDescription>
          </Alert>
        )}

        {paymentStatus === "cancelled" && (
          <Alert className="bg-yellow-500/10 border-yellow-500/30 backdrop-blur-sm">
            <AlertTriangle className="h-4 w-4 text-yellow-200" />
            <AlertDescription className="text-sm text-yellow-200">
              No problem! You can come back and try again whenever you want.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 backdrop-blur-sm">
            <XCircle className="h-4 w-4 text-red-200" />
            <AlertDescription className="text-sm text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

