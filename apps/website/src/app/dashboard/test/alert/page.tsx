"use client";

import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Showcase } from "@/components/ui/showcase";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Info,
  Terminal,
  Zap,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AlertTestPage() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
          Alert Systems
        </h1>
        <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
          {"//"} High-priority telemetry broadcast modules.
        </p>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Showcase
          title="System Protocol"
          description="Standard and Glitch variants."
        >
          <div className="flex flex-col gap-6 w-full items-center">
            {showAlert ? (
              <Alert
                className="max-w-md w-full"
                onClose={() => setShowAlert(false)}
              >
                <Terminal className="h-4 w-4" />
                <AlertTitle>Normal Operation</AlertTitle>
                <AlertDescription>
                  System heartbeats detected. Neural link stable. This alert is
                  closeable.
                </AlertDescription>
              </Alert>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAlert(true)}
                className="font-mono text-[10px] uppercase"
              >
                <RefreshCcw className="w-3 h-3 mr-2" /> Reboot Alert Module
              </Button>
            )}

            <Alert variant="glitch" className="max-w-md w-full">
              <Zap className="h-4 w-4" />
              <AlertTitle>Anomaly Detected</AlertTitle>
              <AlertDescription>
                Frequency drift in sector 7G. Initiating auto-sync.
              </AlertDescription>
            </Alert>
          </div>
        </Showcase>

        <Showcase
          title="Status Signatures"
          description="Thematic color-coding."
        >
          <div className="flex flex-col gap-6 w-full items-center">
            <Alert variant="info" className="max-w-md w-full">
              <Info className="h-4 w-4" />
              <AlertTitle>Telemetry Info</AlertTitle>
              <AlertDescription>
                New firmware version 2.4.0 is ready for uplink.
              </AlertDescription>
            </Alert>

            <Alert variant="success" className="max-w-md w-full">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Uplink Success</AlertTitle>
              <AlertDescription>
                Data packet transmission confirmed by central node.
              </AlertDescription>
            </Alert>

            <Alert variant="warning" className="max-w-md w-full">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning Signal</AlertTitle>
              <AlertDescription>
                Power levels fluctuating. Switching to backup cells.
              </AlertDescription>
            </Alert>

            <Alert variant="error" className="max-w-md w-full">
              <Zap className="h-4 w-4" />
              <AlertTitle>Critical Fault</AlertTitle>
              <AlertDescription>
                Core containment failure! Evacuate local terminal.
              </AlertDescription>
            </Alert>
          </div>
        </Showcase>
      </div>
    </div>
  );
}
