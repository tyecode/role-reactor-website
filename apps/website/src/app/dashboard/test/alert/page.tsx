"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Terminal,
  Zap,
} from "lucide-react";

export default function AlertTestPage() {
  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">
          Alert
        </h1>
        <p className="text-zinc-400 text-lg max-w-3xl">
          Displays a callout for user attention.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase title="Standard Variants">
          <div className="flex flex-col gap-6 w-full items-center">
            <Alert className="max-w-md w-full">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive" className="max-w-md w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </div>
        </Showcase>

        <Showcase title="Cyberpunk Variants">
          <div className="flex flex-col gap-6 w-full items-center">
            <Alert variant="info" className="max-w-md w-full">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                New features are available in the latest update.
              </AlertDescription>
            </Alert>

            <Alert variant="success" className="max-w-md w-full">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>

            <Alert variant="warning" className="max-w-md w-full">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This action cannot be undone. Proceed with caution.
              </AlertDescription>
            </Alert>

            <Alert variant="error" className="max-w-md w-full">
              <Zap className="h-4 w-4" />
              <AlertTitle>Critical Failure</AlertTitle>
              <AlertDescription>
                System override detected. Initiating lockdown protocol.
              </AlertDescription>
            </Alert>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
