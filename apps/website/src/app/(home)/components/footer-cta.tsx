import Link from "next/link";
import { FaDiscord, FaRocket } from "react-icons/fa";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BubbleBackground } from "@/components/common/bubble-background";

import { links } from "@/constants/links";

export function FooterCTA() {
  return (
    <section className="py-12 px-4 relative overflow-hidden">
      {/* Abstract Digital Background */}
      <div className="absolute inset-0 z-0">
        {/* Main background */}
        <div className="absolute inset-0 bg-background pointer-events-none" />

        {/* Bubble Background with gooey metaball effect */}
        <BubbleBackground
          interactive={false}
          className="absolute inset-0"
          transition={{ stiffness: 50, damping: 30 }}
          colors={{
            first: "139, 92, 246", // purple-500
            second: "236, 72, 153", // pink-500
            third: "168, 85, 247", // purple-400
            fourth: "99, 102, 241", // indigo-500
            fifth: "59, 130, 246", // blue-500
            sixth: "124, 58, 237", // violet-600
          }}
        />

        {/* Dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main CTA Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/60 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {/* Card background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 to-transparent" />

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-xl opacity-20" />

          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Transform Your Discord Server Today</span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Level Up?
            </h2>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Stop struggling with manual role management. Role Reactor
              automates everything so you can focus on building an amazing
              community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                asChild
                size="lg"
                className="group relative bg-gradient-to-r from-[#5865F2]! to-[#4752C4]! text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-2xl transform hover:scale-105 hover:-translate-y-1 focus:outline-none"
              >
                <Link
                  href={links.inviteBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Add Role Reactor Discord Bot to Server - Free Discord Bot"
                >
                  <FaDiscord
                    size={20}
                    className="relative z-10 group-hover:animate-pulse mr-2"
                  />
                  <span className="relative z-10">Add Bot Free</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group px-8 py-3 rounded-lg hover:scale-105 hover:-translate-y-1 duration-300 transition-all"
              >
                <Link
                  href="/docs"
                  aria-label="Role Reactor Discord Bot Documentation and Setup Guide"
                >
                  <FaRocket className="w-4 h-4 group-hover:rotate-12 transition-transform mr-2" />
                  <span>View Documentation</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-8 text-zinc-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>100% Free</span>
            </div>
            <div className="w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>30s Setup</span>
            </div>
            <div className="w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>24/7 Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
