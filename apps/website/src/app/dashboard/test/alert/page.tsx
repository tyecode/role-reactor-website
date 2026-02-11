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
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AlertTestPage() {
  const [activeAlerts, setActiveAlerts] = useState<Record<string, boolean>>({
    default: true,
    glitch: false,
    info: false,
    success: false,
    warning: false,
    error: false,
  });

  const toggleAlert = (id: string, state: boolean) => {
    setActiveAlerts((prev) => ({ ...prev, [id]: state }));
  };

  const resetAll = () => {
    setActiveAlerts({
      default: false,
      glitch: false,
      info: false,
      success: false,
      warning: false,
      error: false,
    });
  };

  return (
    <div className="space-y-10 p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-widest uppercase italic font-audiowide">
            Alert Systems
          </h1>
          <p className="text-zinc-400 max-w-3xl font-mono text-sm uppercase tracking-tight">
            {"//"} High-priority telemetry broadcast modules.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="font-mono text-[10px] uppercase text-zinc-500 hover:text-white"
        >
          <RotateCcw className="w-3 h-3 mr-2" /> Clearance Protocol
        </Button>
      </div>

      <Separator className="bg-white/10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <Showcase
            title="Command Center"
            description="Trigger telemetry signals."
          >
            <div className="grid grid-cols-1 gap-3 w-full">
              {[
                { id: "default", label: "Standard Ping", icon: Terminal },
                { id: "glitch", label: "Neural Anomaly", icon: Zap },
                { id: "info", label: "System Info", icon: Info },
                {
                  id: "success",
                  label: "Uplink Confirmed",
                  icon: CheckCircle2,
                },
                {
                  id: "warning",
                  label: "Power Fluctuation",
                  icon: AlertTriangle,
                },
                { id: "error", label: "Core Breach", icon: Zap },
              ].map((trigger) => (
                <Button
                  key={trigger.id}
                  variant="outline"
                  className="justify-between font-mono text-[10px] uppercase h-10 group"
                  onClick={() => toggleAlert(trigger.id, true)}
                >
                  <div className="flex items-center gap-2">
                    <trigger.icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                    {trigger.label}
                  </div>
                  <Play className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                </Button>
              ))}
            </div>
          </Showcase>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Showcase
            title="Telemetry Output"
            description="Live signal visualization."
          >
            <div className="flex flex-col gap-4 w-full min-h-[400px]">
              {Object.values(activeAlerts).every((v) => !v) && (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 border border-dashed border-white/5 rounded-2xl animate-pulse">
                  <Terminal className="w-8 h-8 mb-4 opacity-20" />
                  <p className="font-mono text-[10px] uppercase tracking-widest">
                    Awaiting Signal Entry...
                  </p>
                </div>
              )}

              {activeAlerts.default && (
                <Alert onClose={() => toggleAlert("default", false)}>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Normal Operation</AlertTitle>
                  <AlertDescription>
                    System heartbeats detected. Neural link stable. Connection
                    latency: 14ms.
                  </AlertDescription>
                </Alert>
              )}

              {activeAlerts.glitch && (
                <Alert
                  variant="glitch"
                  onClose={() => toggleAlert("glitch", false)}
                >
                  <Zap className="h-4 w-4" />
                  <AlertTitle>Anomaly Detected</AlertTitle>
                  <AlertDescription>
                    Frequency drift in sector 7G. Unauthorized packet
                    fragmentation detected. Initiating auto-sync protocols.
                  </AlertDescription>
                </Alert>
              )}

              {activeAlerts.info && (
                <Alert
                  variant="info"
                  onClose={() => toggleAlert("info", false)}
                >
                  <Info className="h-4 w-4" />
                  <AlertTitle>Telemetry Info</AlertTitle>
                  <AlertDescription>
                    New firmware version 2.4.0 is ready for uplink. Optimization
                    parameters updated for deep-space communication.
                  </AlertDescription>
                </Alert>
              )}

              {activeAlerts.success && (
                <Alert
                  variant="success"
                  onClose={() => toggleAlert("success", false)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Uplink Success</AlertTitle>
                  <AlertDescription>
                    Data packet transmission confirmed by central node. All
                    systems green. Verification hash: 0x8F2...A4B.
                  </AlertDescription>
                </Alert>
              )}

              {activeAlerts.warning && (
                <Alert
                  variant="warning"
                  onClose={() => toggleAlert("warning", false)}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning Signal</AlertTitle>
                  <AlertDescription>
                    Power levels fluctuating in the primary heat sink. Switching
                    to auxiliary cooling cells to prevent thermal runaway.
                  </AlertDescription>
                </Alert>
              )}

              {activeAlerts.error && (
                <Alert
                  variant="error"
                  onClose={() => toggleAlert("error", false)}
                >
                  <Zap className="h-4 w-4" />
                  <AlertTitle>Critical Fault</AlertTitle>
                  <AlertDescription>
                    CORE CONTAINMENT FAILURE! Magnetic seals at 12% capacity.
                    Manual evacuation of the local terminal is highly
                    recommended.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </Showcase>
        </div>
      </div>
    </div>
  );
}
