import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Zap, Target, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Role Reactor - Discord Bot for Automated Role Management",
  description:
    "Role Reactor - The most powerful Discord bot for automated role management. Set up reaction roles, manage permissions, and enhance your Discord server experience.",
  openGraph: {
    title: "Role Reactor - Discord Bot for Role Management",
    description:
      "The most powerful Discord bot for automated role management. Set up reaction roles, manage permissions, and enhance your Discord server experience.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-black dark:to-blue-950">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-indigo-500/10"></div>

        <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <Image
                src="/logo.png"
                width={64}
                height={64}
                alt="Role Reactor Logo"
                priority
                className="relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-20 scale-110"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Role Reactor
            </h1>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
            Discord role management, simplified. Set up reaction roles in
            minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link
              href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=268435456&scope=bot%20applications.commands"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Server
            </Link>
            <Link
              href="/docs"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 px-6 py-2.5 text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700 rounded-md hover:border-blue-300 dark:hover:border-blue-600"
            >
              Documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
              Why Role Reactor?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Simple, reliable, and powerful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 group hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Fast Setup
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Configure reaction roles in minutes with simple slash commands
              </p>
            </div>

            <div className="text-center space-y-3 group hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Self-Service
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Users assign roles by reacting to messages—no manual work
              </p>
            </div>

            <div className="text-center space-y-3 group hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Secure
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Built-in permission controls and rate limiting for safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-800/50 py-12 px-4 bg-gradient-to-t from-gray-50/80 to-transparent dark:from-gray-950/80 dark:to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logo.png"
                  width={32}
                  height={32}
                  alt="Role Reactor Logo"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md opacity-20 scale-110"></div>
              </div>
              <div>
                <span className="font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Role Reactor
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Discord Bot
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <Link
                href="/docs"
                className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="https://github.com/tyecode-bots/role-reactor-bot"
                className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
              <Link
                href="https://discord.gg/your-support-server"
                className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50 text-center text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Role Reactor. Built with 💜 by{" "}
            <Link
              href="https://github.com/tyecode"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Tyecode
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
