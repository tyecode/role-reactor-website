import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { links } from "@/constants/links";
import { Card, CardContent } from "@/components/ui/card";

export function CommunityLinks() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />

      <div className="max-w-[1120px] mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 leading-tight">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Connect with other users and stay updated on development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-900/80 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg transition-colors group-hover:bg-gray-700">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      GitHub Repository
                    </h3>
                    <p className="text-sm text-gray-400">
                      Star the project and contribute to development
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link
            href={links.support}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-900/80 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#5865F2] rounded-lg transition-colors group-hover:bg-[#4752C4]">
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Discord Server
                    </h3>
                    <p className="text-sm text-gray-400">
                      Join our community for support and updates
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}

