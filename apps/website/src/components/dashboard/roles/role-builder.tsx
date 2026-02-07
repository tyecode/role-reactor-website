"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DiscordPreview } from "./discord-preview";
import { Plus, Trash2, Send, Rocket } from "lucide-react";

export function RoleBuilder() {
  const [title, setTitle] = useState("Get Your Roles!");
  const [description, setDescription] = useState(
    "React with the emojis below to get the corresponding roles.\n\n🔵 : Announcement Role\n🟣 : Newsletter Role"
  );
  const [color, setColor] = useState("#3b82f6");
  const [reactions, setReactions] = useState([
    { emoji: "🔵", roleName: "Announcements" },
    { emoji: "🟣", roleName: "Newsletter" },
  ]);

  const addReaction = () => {
    setReactions([...reactions, { emoji: "🆕", roleName: "New Role" }]);
  };

  const removeReaction = (index: number) => {
    setReactions(reactions.filter((_, i) => i !== index));
  };

  const updateReaction = (index: number, field: string, value: string) => {
    const newReactions = [...reactions];
    newReactions[index] = { ...newReactions[index], [field]: value };
    setReactions(newReactions);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Configuration Form */}
      <div className="space-y-6 order-2 lg:order-1">
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-400">
                Embed Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="bg-black/40 border-white/10 h-10 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-400">
                Description
              </Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                className="w-full min-h-[120px] bg-black/40 border-white/10 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none font-sans"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-400">
                Accent Color
              </Label>
              <div className="flex gap-3">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-10 p-1 bg-black/40 border-white/10 cursor-pointer"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 bg-black/40 border-white/10 h-10 px-4 font-mono uppercase"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reaction Role Mappings */}
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-gray-400">
                Role Mappings
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addReaction}
                className="h-8 border-white/10 hover:bg-white/5 text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Mapping
              </Button>
            </div>

            <div className="space-y-3">
              {reactions.map((r, i) => (
                <div key={i} className="flex gap-3 items-center group">
                  <div className="w-10 h-10 bg-black/40 border border-white/10 rounded-lg flex items-center justify-center relative hover:border-primary/50 transition-colors">
                    <input
                      type="text"
                      value={r.emoji}
                      onChange={(e) =>
                        updateReaction(i, "emoji", e.target.value)
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <span className="text-xl">{r.emoji}</span>
                  </div>
                  <Input
                    value={r.roleName}
                    onChange={(e) =>
                      updateReaction(i, "roleName", e.target.value)
                    }
                    placeholder="Search for role..."
                    className="flex-1 bg-black/40 border-white/10 h-10 px-4"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeReaction(i)}
                    className="h-10 w-10 text-gray-500 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-12 rounded-xl border-t border-white/20 shadow-[0_4px_20px_rgba(59,130,246,0.5)] transition-all active:scale-[0.98]">
          <Rocket className="w-5 h-5 mr-2" />
          Deploy to Discord
        </Button>
      </div>

      {/* Live Preview */}
      <div className="space-y-4 order-1 lg:order-2 sticky top-24">
        <Label className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Discord Preview
        </Label>

        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <DiscordPreview
            title={title}
            description={description}
            color={color}
            reactions={reactions}
          />
        </div>

        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
          <p className="text-xs text-blue-300 leading-relaxed italic">
            "Your community can click the reactions below the message to toggle
            roles automatically. Everything you see here is exactly what they
            will see in Discord."
          </p>
        </div>
      </div>
    </div>
  );
}
