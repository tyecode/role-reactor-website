import Image from "next/image";
import Link from "next/link";

import { links } from "@/constants/links";

export function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50 py-12 px-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md transition-colors duration-300">
      <div>
        <div className="max-w-[var(--spacing-fd-container)] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
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
              <span className="font-semibold dark:to-gray-300 text-[var(--color-fd-foreground)]">
                Role Reactor
              </span>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Discord Bot
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm">
            <Link
              href="/docs"
              className="text-gray-600 dark:text-gray-400 hover:text-[var(--color-fd-foreground)] transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 dark:text-gray-400 hover:text-[var(--color-fd-foreground)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 dark:text-gray-400 hover:text-[var(--color-fd-foreground)] transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href={links.support}
              className="text-gray-600 dark:text-gray-400 hover:text-[var(--color-fd-foreground)] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50 text-center text-xs text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Role Reactor. Built with 💜 by{" "}
          <Link
            href={links.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium hover:from-blue-600 hover:to-purple-400 transition-all duration-200"
          >
            Tyecode
          </Link>
        </div>
      </div>
    </footer>
  );
} 