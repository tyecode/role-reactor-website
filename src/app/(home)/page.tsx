import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/logo.png"
              width={80}
              height={80}
              alt="Role Reactor Logo"
              className="mr-4"
              priority
            />
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Role Reactor
              </h1>
              <p className="text-lg text-fd-muted-foreground">
                <span className="font-semibold text-blue-600">Coming Soon</span>{" "}
                • Production Ready
              </p>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-fd-muted-foreground mb-8 max-w-3xl">
            The most powerful Discord bot for automated role management.
            Transform your server with reaction-based roles and advanced
            permission controls.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=268435456&scope=bot%20applications.commands"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              target="_blank"
              rel="noopener noreferrer"
            >
              🚀 Add to Server
            </Link>
            <Link
              href="/docs"
              className="border border-fd-border hover:bg-fd-muted px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              📚 Documentation
            </Link>
          </div>

          {/* Key Features Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">⚡</div>
              <div className="text-sm text-fd-muted-foreground">Fast Setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">🛡️</div>
              <div className="text-sm text-fd-muted-foreground">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">🆓</div>
              <div className="text-sm text-fd-muted-foreground">Free</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-fd-muted-foreground">Reliable</div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 -z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Role Reactor?
            </h2>
            <p className="text-lg text-fd-muted-foreground max-w-2xl mx-auto">
              Designed for Discord servers of all sizes, from small communities
              to massive gaming guilds
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-fd-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">
                Self-Assignable Roles
              </h3>
              <p className="text-fd-muted-foreground">
                Let users assign and remove roles by simply reacting to
                messages. No complex commands needed - just click and get your
                role!
              </p>
            </div>
            <div className="p-6 rounded-lg border border-fd-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-3">Temporary Roles</h3>
              <p className="text-fd-muted-foreground">
                Set roles to automatically expire after a specified time period.
                Perfect for events, contests, and temporary access management.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-fd-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">
                Permission Controls
              </h3>
              <p className="text-fd-muted-foreground">
                Comprehensive permission checking ensures only authorized users
                can manage roles and configure bot settings.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-fd-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">Custom Emojis</h3>
              <p className="text-fd-muted-foreground">
                Full support for Unicode emojis and custom server emojis to
                perfectly match your server's unique style and branding.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-fd-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Role Categories</h3>
              <p className="text-fd-muted-foreground">
                Organize roles into logical groups for better management, user
                experience, and easier server navigation.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-fd-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3">Health Monitoring</h3>
              <p className="text-fd-muted-foreground">
                Enterprise-grade monitoring with built-in health checks and
                performance metrics ensures reliable 24/7 operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-fd-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Setup in Minutes, Not Hours
          </h2>
          <p className="text-lg text-fd-muted-foreground mb-16 max-w-2xl mx-auto">
            Get your reaction roles working in just 3 simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Invite & Setup</h3>
              <p className="text-fd-muted-foreground">
                Add Role Reactor to your server and use our intuitive slash
                commands to configure your first reaction role message.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Users React</h3>
              <p className="text-fd-muted-foreground">
                Your community members simply react to your configured messages
                with the specified emojis to instantly receive their roles.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Automate & Scale</h3>
              <p className="text-fd-muted-foreground">
                Watch your community grow as members seamlessly manage their own
                roles without any manual intervention from moderators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built with Best Practices
          </h2>
          <p className="text-lg text-fd-muted-foreground mb-12">
            Developed following industry standards and Discord's official
            guidelines
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-fd-muted/50 rounded-lg border border-fd-border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  🛠️
                </div>
                <div className="text-left">
                  <div className="font-semibold">
                    Enterprise-Grade Architecture
                  </div>
                  <div className="text-sm text-fd-muted-foreground">
                    Production-ready codebase
                  </div>
                </div>
              </div>
              <p className="text-fd-muted-foreground italic">
                "Built with Discord.js v14, featuring comprehensive error
                handling, health monitoring, and scalable MongoDB integration
                for reliable performance."
              </p>
            </div>

            <div className="p-6 bg-fd-muted/50 rounded-lg border border-fd-border">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  📋
                </div>
                <div className="text-left">
                  <div className="font-semibold">Discord Best Practices</div>
                  <div className="text-sm text-fd-muted-foreground">
                    Following official guidelines
                  </div>
                </div>
              </div>
              <p className="text-fd-muted-foreground italic">
                "Implements Discord's latest slash commands, proper permission
                handling, and follows all platform guidelines for optimal user
                experience."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Discord Server?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the next generation of Discord role
            management. Setup takes less than 5 minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=268435456&scope=bot%20applications.commands"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              target="_blank"
              rel="noopener noreferrer"
            >
              🚀 Add to Server - It's Free!
            </Link>
            <Link
              href="/docs"
              className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              📖 View Documentation
            </Link>
          </div>

          <div className="mt-8 text-sm opacity-75">
            ✨ Free forever • ⚡ Instant setup • 🛡️ Secure & reliable
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fd-background border-t border-fd-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    width={40}
                    height={40}
                    alt="Role Reactor Logo"
                    className="mr-3 rounded-lg shadow-sm"
                  />
                </div>
                <div>
                  <span className="font-bold text-xl">Role Reactor</span>
                  <div className="text-xs text-fd-muted-foreground">
                    Discord Bot
                  </div>
                </div>
              </div>
              <p className="text-fd-muted-foreground text-sm mb-6 leading-relaxed">
                The most powerful Discord bot for automated role management.
              </p>
              <div className="flex space-x-3">
                <Link
                  href="https://github.com/tyecode-bots/role-reactor-bot"
                  className="group relative p-2 text-fd-muted-foreground hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                </Link>
                <Link
                  href="https://discord.gg/your-support-server"
                  className="group relative p-2 text-fd-muted-foreground hover:text-purple-600 transition-all duration-200 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/20"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord Support Server"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.120.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/docs"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/getting-started"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/commands"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Commands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/examples"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://discord.gg/your-support-server"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord Server
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/troubleshooting"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Troubleshooting
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/tyecode-bots/role-reactor-bot/issues"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report Issues
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/support"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/docs/legal/privacy"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/legal/terms"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/tyecode-bots/role-reactor-bot/blob/main/LICENSE"
                    className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-fd-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-fd-muted-foreground mb-4 md:mb-0 flex items-center">
                <span className="mr-2">©</span>
                <span className="font-medium">
                  {new Date().getFullYear()} Role Reactor.
                </span>
                <span className="ml-1">All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-full border border-blue-200/30 dark:border-blue-800/30">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Founded and developed by Tyecode
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
