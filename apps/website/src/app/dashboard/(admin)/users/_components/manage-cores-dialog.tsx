"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Coins, AlertTriangle } from "lucide-react";
import { manageUserCores } from "../actions";
import { useRouter } from "next/navigation";

interface ManageCoresDialogProps {
  user: {
    id: string;
    username: string;
    credits: number;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageCoresDialog({
  user,
  open,
  onOpenChange,
}: ManageCoresDialogProps) {
  const router = useRouter();
  const [action, setAction] = useState<"add" | "remove" | "set">("add");
  const [amount, setAmount] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !amount) return;

    setIsPending(true);
    setError(null);

    const numAmount = parseInt(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      setError("Please enter a valid positive number");
      setIsPending(false);
      return;
    }

    try {
      const result = await manageUserCores(
        user.id,
        action,
        numAmount,
        reason || "Admin manual adjustment"
      );

      if (result.success) {
        onOpenChange(false);
        setAmount("");
        setReason("");
        router.refresh();
      } else {
        setError(result.error as string);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-white/5 bg-zinc-950/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 italic">
            <Coins className="size-4 text-yellow-500" />
            Manage Core Balance
          </DialogTitle>
          <DialogDescription className="font-mono text-[10px] uppercase tracking-wider">
            Adjusting balance for:{" "}
            <span className="text-cyan-500">{user.username}</span>
            <br />
            Current Balance:{" "}
            <span className="text-yellow-500 font-bold">
              {user.credits?.toLocaleString() || 0}
            </span>{" "}
            Cores
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Action
            </Label>
            <Select
              value={action}
              onValueChange={(v: "add" | "remove" | "set") => setAction(v)}
            >
              <SelectTrigger className="bg-zinc-900/50 border-white/10 font-mono text-xs uppercase">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add Cores (+)</SelectItem>
                <SelectItem value="remove">Remove Cores (-)</SelectItem>
                <SelectItem value="set">Set Exact Balance (=)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Amount
            </Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="bg-zinc-900/50 border-white/10 font-mono"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Reason (Audit Log)
            </Label>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Refund, Bonus, Correction..."
              className="bg-zinc-900/50 border-white/10 font-mono text-xs"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/10 p-2 rounded border border-red-500/20">
              <AlertTriangle className="size-3" />
              {error}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              variant="cyber"
              className="w-full"
              disabled={isPending || !amount}
            >
              {isPending && <Loader2 className="size-3 mr-2 animate-spin" />}
              Confirm Adjustment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
