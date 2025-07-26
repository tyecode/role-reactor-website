import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Role Reactor",
  description:
    "Terms of Service for Role Reactor Discord Bot - Rules and conditions for using our service.",
  openGraph: {
    title: "Terms of Service - Role Reactor",
    description:
      "Terms of Service for Role Reactor Discord Bot - Rules and conditions for using our service.",
    url: "/terms",
  },
};

export default function TermsPage() {
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
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By using Role Reactor ("the Bot," "our service"), you agree to
                be bound by these Terms of Service ("Terms"). If you do not
                agree to these Terms, please do not use our service. These Terms
                apply to all users of the Bot.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                2. Description of Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Role Reactor is a Discord bot that provides automated role
                management functionality, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Reaction-based role assignment and removal</li>
                <li>Role management commands</li>
                <li>Temporary role functionality</li>
                <li>Permission controls and security features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                3. User Responsibilities
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    3.1 Proper Usage
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You agree to use the Bot in accordance with Discord's Terms
                    of Service and Community Guidelines. You are responsible
                    for:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      Ensuring you have proper permissions to add the Bot to
                      servers
                    </li>
                    <li>
                      Configuring the Bot appropriately for your server's needs
                    </li>
                    <li>
                      Not using the Bot for illegal, harmful, or abusive
                      purposes
                    </li>
                    <li>
                      Respecting other users and maintaining a safe environment
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                    3.2 Prohibited Activities
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You may not use the Bot to:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Spam, harass, or abuse other users</li>
                    <li>Attempt to disrupt or overwhelm the Bot's services</li>
                    <li>
                      Reverse engineer, decompile, or attempt to extract source
                      code
                    </li>
                    <li>
                      Use the Bot for commercial purposes without permission
                    </li>
                    <li>Violate any applicable laws or regulations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                4. Service Availability
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We strive to provide reliable service but cannot guarantee
                  100% uptime. The Bot may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Scheduled maintenance</li>
                  <li>Technical issues or server problems</li>
                  <li>Discord API limitations or outages</li>
                  <li>Force majeure events</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We will make reasonable efforts to provide advance notice of
                  planned maintenance when possible.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Role Reactor is provided "as is" without warranties of any kind.
                We are not liable for any damages arising from the use or
                inability to use our service, including but not limited to data
                loss, server disruptions, or conflicts between users. Your use
                of the Bot is at your own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                6. Privacy and Data
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our collection and use of data is governed by our Privacy
                Policy. By using the Bot, you acknowledge and agree to our data
                practices as outlined in the Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Role Reactor and all related materials are the intellectual
                property of Tyecode. The Bot is licensed under the MIT License,
                allowing for certain uses as specified in the license. You may
                not claim ownership of the Bot or use our branding without
                permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                8. Termination
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>
                    Suspend or terminate access to the Bot for violations of
                    these Terms
                  </li>
                  <li>Discontinue the service with reasonable notice</li>
                  <li>Modify or update the Bot's functionality</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You may stop using the Bot at any time by removing it from
                  your server(s).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                9. Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update these Terms periodically to reflect changes in our
                service or legal requirements. We will notify users of
                significant changes through our support server or website.
                Continued use of the Bot after changes constitutes acceptance of
                the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                10. Discord Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Use of Role Reactor is also subject to Discord's Terms of
                Service and Community Guidelines. Any violation of Discord's
                terms may result in termination of access to our Bot.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                11. Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms are governed by applicable international laws and
                Discord's platform policies. Any disputes will be resolved in
                accordance with these governing principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                12. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have questions about these Terms or need support, please
                contact us:
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
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Developer:</strong>{" "}
                  <Link
                    href="https://github.com/tyecode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tyecode on GitHub
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
