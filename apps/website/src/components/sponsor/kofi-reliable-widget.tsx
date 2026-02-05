"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { links } from "@/constants/links";
import Link from "next/link";

export function KofiReliableWidget() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full">
      {/* Ko-fi Reliable Widget Container */}
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-indigo-200/50 dark:border-white/20 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Image
              src="/logo.png"
              alt="Role Reactor Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-2">
            Support Role Reactor
          </h2>
          <p className="text-indigo-700 dark:text-white/70 mb-6">
            Help us keep the bot free and continuously improving
          </p>
        </div>

        {/* Ko-fi Button - Direct HTML approach */}
        <div className="flex justify-center">
          <Link
            href={links.sponsor}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-lg rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Image
              src="/kofi_symbol.svg"
              alt="Ko-fi Symbol"
              width={32}
              height={32}
              className="group-hover:scale-105 transition-transform duration-200 group-hover:rotate-12"
            />
            Support me on Ko-fi
          </Link>
        </div>

        {/* Ko-fi Widget - Only render on client */}
        {isClient && (
          <div className="mt-6">
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  <script type='text/javascript' src='https://storage.ko-fi.com/cdn/widget/Widget_2.js'></script>
                  <script type='text/javascript'>
                    setTimeout(function() {
                      if (typeof kofiwidget2 !== 'undefined') {
                        kofiwidget2.init('Support me on Ko-fi', '#7367fa', 'S6S51KVH10');
                        kofiwidget2.draw();
                      }
                    }, 100);
                  </script>
                `,
              }}
            />
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-indigo-600 dark:text-white/60">
            Secure payment processing by Ko-fi
          </p>
        </div>
      </div>
    </div>
  );
}
