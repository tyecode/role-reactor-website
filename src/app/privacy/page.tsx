import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Role Reactor",
  description:
    "Privacy Policy for Role Reactor Discord Bot - How we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy - Role Reactor",
    description:
      "Privacy Policy for Role Reactor Discord Bot - How we collect, use, and protect your data.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-black dark:to-blue-950">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-fd-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Role Reactor ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                and safeguard your information when you use our Discord bot
                service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    2.1 Discord Data
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We collect only the minimum data necessary to provide our
                    role management services:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Server (Guild) IDs and names</li>
                    <li>User IDs (only when interacting with the bot)</li>
                    <li>Role IDs and names</li>
                    <li>Message IDs for reaction role messages</li>
                    <li>Emoji reactions and associated role mappings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    2.2 Usage Data
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We may collect anonymous usage statistics to improve our
                    service, including command usage frequency and error logs
                    (without personal identifiers).
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We use the collected information solely to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Provide role assignment and management functionality</li>
                <li>Maintain reaction role configurations</li>
                <li>Process user interactions with reaction roles</li>
                <li>Ensure proper bot functionality and security</li>
                <li>Improve our service through anonymous analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                4. Data Storage and Security
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We implement appropriate security measures to protect your
                  data:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>
                    Data is stored securely using industry-standard encryption
                  </li>
                  <li>
                    Access to data is restricted to essential bot operations
                    only
                  </li>
                  <li>
                    We do not store message content or personal conversations
                  </li>
                  <li>Regular security audits and updates are performed</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                5. Data Sharing
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We do not sell, trade, or share your personal data with third
                parties. Data is only shared when:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Required by law or legal process</li>
                <li>Necessary to protect our rights or the safety of users</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                6. Data Retention
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We retain your data only as long as necessary to provide our
                services. When you remove the bot from your server, all
                associated configuration data is automatically deleted within 30
                days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                7. Your Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>
                  Request deletion of your server's data by removing the bot
                </li>
                <li>Access information about what data we store</li>
                <li>Request corrections to inaccurate data</li>
                <li>Contact us with privacy concerns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                8. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Role Reactor integrates with Discord's API and services. Please
                review Discord's Privacy Policy to understand how Discord
                handles your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy periodically. We will notify
                users of significant changes through our support server or
                website updates. Continued use of the bot after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                10. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Discord:</strong>{" "}
                  <Link
                    href="https://discord.gg/your-support-server"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join our support server
                  </Link>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>GitHub:</strong>{" "}
                  <Link
                    href="https://github.com/tyecode-bots/role-reactor-bot/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Create an issue
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
