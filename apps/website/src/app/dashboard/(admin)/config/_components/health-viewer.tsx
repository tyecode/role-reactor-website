"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Cpu,
  HardDrive,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  Server,
  Database,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HealthData {
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    usage: number;
  };
  database: {
    connected: boolean;
    responseTime: number;
  };
  api: {
    requestsPerMinute: number;
    averageResponseTime: number;
  };
  environment: string;
  isProduction: boolean;
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function formatBytes(bytes: number): string {
  const gb = bytes / 1024 ** 3;
  if (gb >= 1) return `${gb.toFixed(2)} GB`;
  const mb = bytes / 1024 ** 2;
  return `${mb.toFixed(2)} MB`;
}

export function SystemHealthViewer() {
  const [data, setData] = useState<HealthData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchHealth = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/proxy/health");
      if (!res.ok) throw new Error("Failed to fetch health data");
      const json = await res.json();

      // The API returns data at root level with status field
      if (json.uptime !== undefined && json.memory && json.cpu) {
        setData({
          uptime: json.uptime,
          memory: json.memory,
          cpu: json.cpu,
          database: json.database,
          api: json.api,
          environment: json.environment,
          isProduction: json.isProduction,
        });
      } else {
        throw new Error("Invalid response format");
      }
      setError(null);
    } catch (err: unknown) {
      console.error("Health fetch error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load health data"
      );
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  if (error) {
    return (
      <Card className="border-red-500/50 bg-red-500/5">
        <CardContent className="pt-6 flex items-center gap-4">
          <AlertTriangle className="size-8 text-red-500" />
          <div>
            <h3 className="text-lg font-bold text-red-500">
              Health Check Failed
            </h3>
            <p className="text-zinc-400 text-sm">{error}</p>
            <Button
              onClick={fetchHealth}
              variant="outline"
              size="sm"
              className="mt-2 border-red-500/20 hover:bg-red-500/10 text-red-400"
            >
              Retry Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw className="size-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  const memoryPercentage = data.memory.percentage;
  const isHealthy = data.database.connected && memoryPercentage < 80;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                System Status
              </p>
              {isHealthy ? (
                <CheckCircle className="size-4 text-green-500" />
              ) : (
                <AlertTriangle className="size-4 text-amber-500" />
              )}
            </div>
            <p
              className={cn(
                "text-2xl font-bold uppercase",
                isHealthy ? "text-green-500" : "text-amber-500"
              )}
            >
              {isHealthy ? "Healthy" : "Warning"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Uptime
              </p>
              <Clock className="size-4 text-cyan-500" />
            </div>
            <p className="text-2xl font-bold text-white">
              {formatUptime(data.uptime)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Environment
              </p>
              <Server className="size-4 text-purple-500" />
            </div>
            <p
              className={cn(
                "text-2xl font-bold uppercase",
                data.isProduction ? "text-green-500" : "text-amber-500"
              )}
            >
              {data.environment}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Database
              </p>
              <Database
                className={cn(
                  "size-4",
                  data.database.connected ? "text-green-500" : "text-red-500"
                )}
              />
            </div>
            <p
              className={cn(
                "text-2xl font-bold uppercase",
                data.database.connected ? "text-green-500" : "text-red-500"
              )}
            >
              {data.database.connected ? "Connected" : "Offline"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Memory Usage */}
        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
              <HardDrive className="size-4 text-cyan-500" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Used</span>
                <span className="text-white font-mono">
                  {formatBytes(data.memory.used)} /{" "}
                  {formatBytes(data.memory.total)}
                </span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    memoryPercentage < 60
                      ? "bg-green-500"
                      : memoryPercentage < 80
                        ? "bg-amber-500"
                        : "bg-red-500"
                  )}
                  style={{ width: `${memoryPercentage}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 text-right">
                {memoryPercentage.toFixed(1)}% utilized
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CPU Usage */}
        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
              <Cpu className="size-4 text-cyan-500" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Current Load</span>
                <span className="text-white font-mono">
                  {data.cpu.usage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    data.cpu.usage < 60
                      ? "bg-green-500"
                      : data.cpu.usage < 80
                        ? "bg-amber-500"
                        : "bg-red-500"
                  )}
                  style={{ width: `${data.cpu.usage}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 text-right">
                {data.cpu.usage < 60
                  ? "Normal"
                  : data.cpu.usage < 80
                    ? "Elevated"
                    : "High"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* API Performance */}
        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
              <Zap className="size-4 text-cyan-500" />
              API Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Requests/min</span>
                <span className="text-white font-mono">
                  {data.api.requestsPerMinute}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Avg Response</span>
                <span className="text-white font-mono">
                  {data.api.averageResponseTime}ms
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Performance */}
        <Card className="bg-zinc-900/50 border-white/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
              <Database className="size-4 text-cyan-500" />
              Database Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Status</span>
                <span
                  className={cn(
                    "font-mono uppercase text-xs",
                    data.database.connected ? "text-green-500" : "text-red-500"
                  )}
                >
                  {data.database.connected ? "Online" : "Offline"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Ping</span>
                <span className="text-white font-mono">
                  {data.database.responseTime}ms
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={fetchHealth}
          disabled={isRefreshing}
          className="bg-zinc-900/50 border-white/5 hover:bg-zinc-800"
        >
          <RefreshCw
            className={cn("size-3 mr-2", isRefreshing && "animate-spin")}
          />
          Refresh
        </Button>
      </div>
    </div>
  );
}
