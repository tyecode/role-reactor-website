import Link from "next/link";
import type { Metadata } from "next";

import { links } from "@/constants/links";

export const metadata: Metadata = {
  title: "Terms of Use - Role Reactor",
  description:
    "Terms of Use for Role Reactor Discord Bot - Rules and conditions for using our service.",
  openGraph: {
    title: "Terms of Use - Role Reactor",
    description:
      "Terms of Use for Role Reactor Discord Bot - Rules and conditions for using our service.",
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
            Terms of Use
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: August 3, 2025
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
                By using Role Reactor Bot ("the Bot"), you agree to be bound by
                these Terms of Use. If you do not agree to these terms, please
                do not use the Bot. These terms constitute a legally binding
                agreement between you and the Bot's operator.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                2. Description of Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Role Reactor Bot is a Discord bot that provides role management
                functionality through reaction-based interactions. The Bot
                allows users to self-assign roles and manage temporary roles
                within Discord servers. The service is provided free of charge
                and is designed for community management and user engagement.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    2.1 Service Features
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Role Assignment:</strong> Self-assignable roles
                      through reactions
                    </li>
                    <li>
                      <strong>Temporary Roles:</strong> Time-limited role
                      assignments
                    </li>
                    <li>
                      <strong>Role Management:</strong> Administrative tools for
                      role configuration
                    </li>
                    <li>
                      <strong>Analytics:</strong> Usage statistics and
                      performance monitoring
                    </li>
                    <li>
                      <strong>Support:</strong> Technical support and
                      documentation
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                3. User Responsibilities
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    3.1 Proper Use
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Use the Bot only for its intended purpose</li>
                    <li>
                      Respect Discord's Terms of Service and Community
                      Guidelines
                    </li>
                    <li>
                      Do not attempt to abuse or exploit the Bot's features
                    </li>
                    <li>
                      Do not use the Bot for any illegal or harmful activities
                    </li>
                    <li>Report security vulnerabilities responsibly</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    3.2 Server Management
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      Ensure you have proper permissions to manage roles in your
                      server
                    </li>
                    <li>Use role management features responsibly</li>
                    <li>Do not create roles that violate Discord's policies</li>
                    <li>Respect other users' privacy and rights</li>
                    <li>Do not use the bot for harassment or discrimination</li>
                    <li>Comply with Discord's Community Guidelines</li>
                    <li>Maintain appropriate server moderation practices</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    3.3 Security Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Account Security:</strong> Protect your Discord
                      account credentials
                    </li>
                    <li>
                      <strong>Server Security:</strong> Maintain appropriate
                      server permissions
                    </li>
                    <li>
                      <strong>Vulnerability Reporting:</strong> Report security
                      issues through proper channels
                    </li>
                    <li>
                      <strong>Compliance:</strong> Ensure server compliance with
                      Discord's policies
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                4. Bot Limitations and Service Level Agreement
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    4.1 Availability
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Uptime Target:</strong> 99.5% availability
                      (excluding scheduled maintenance)
                    </li>
                    <li>
                      <strong>Maintenance Windows:</strong> Scheduled
                      maintenance with 24-hour notice
                    </li>
                    <li>
                      <strong>Emergency Maintenance:</strong> May occur without
                      notice for security issues
                    </li>
                    <li>
                      <strong>Service Interruptions:</strong> We are not
                      responsible for data loss during interruptions
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    4.2 Rate Limits
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>The Bot respects Discord's rate limits</li>
                    <li>Excessive use may result in temporary restrictions</li>
                    <li>
                      Follow Discord's API guidelines for optimal performance
                    </li>
                    <li>Fair use policies apply to all users</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    4.3 API Usage Guidelines
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Rate Limiting:</strong> Respect Discord's API rate
                      limits
                    </li>
                    <li>
                      <strong>Fair Use:</strong> Reasonable usage patterns
                      expected
                    </li>
                    <li>
                      <strong>Abuse Prevention:</strong> Excessive use may
                      result in restrictions
                    </li>
                    <li>
                      <strong>Monitoring:</strong> Usage patterns may be
                      monitored for abuse prevention
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    4.4 Service Limitations
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Data Storage:</strong> Limited to essential bot
                      functionality
                    </li>
                    <li>
                      <strong>Feature Availability:</strong> Features may be
                      modified or discontinued
                    </li>
                    <li>
                      <strong>Third-Party Dependencies:</strong> Service depends
                      on Discord's API availability
                    </li>
                    <li>
                      <strong>Geographic Restrictions:</strong> Service
                      available worldwide subject to local laws
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                5. Privacy and Data
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    5.1 Data Collection
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      The Bot stores role assignments and temporary role data
                    </li>
                    <li>
                      Server configuration data is stored for functionality
                    </li>
                    <li>
                      No personal user data is collected beyond what's necessary
                    </li>
                    <li>Data collection is governed by our Privacy Policy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    5.2 Data Retention
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      Role assignment data is retained for bot functionality
                    </li>
                    <li>Temporary role data is automatically cleaned up</li>
                    <li>
                      Server configuration data is retained until manually
                      removed
                    </li>
                    <li>
                      Data retention policies are detailed in our Privacy Policy
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    5.3 Data Security
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Encryption:</strong> All data transmitted using
                      industry-standard encryption
                    </li>
                    <li>
                      <strong>Access Control:</strong> Limited access to user
                      data
                    </li>
                    <li>
                      <strong>Security Audits:</strong> Regular security
                      assessments conducted
                    </li>
                    <li>
                      <strong>Breach Notification:</strong> Prompt notification
                      of security incidents
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                6. Intellectual Property
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    6.1 Bot Code
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      The Bot's source code is open source and licensed under
                      MIT License
                    </li>
                    <li>The code is available for review and modification</li>
                    <li>
                      Attribution to the original authors is required for any
                      modifications
                    </li>
                    <li>
                      Community contributions are welcome and subject to review
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    6.2 Discord Content
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      Discord's content remains subject to Discord's terms
                    </li>
                    <li>We do not claim ownership of Discord content</li>
                    <li>Users retain rights to their Discord content</li>
                    <li>Bot-generated content is subject to these terms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    6.3 Trademarks and Branding
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Role Reactor Bot:</strong> Trademark owned by the
                      service operator
                    </li>
                    <li>
                      <strong>Discord:</strong> Trademark owned by Discord Inc.
                    </li>
                    <li>
                      <strong>Proper Attribution:</strong> Required when
                      referencing the service
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                7. Disclaimers and Limitations
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    7.1 No Warranty
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>The Bot is provided without any warranties</li>
                    <li>We disclaim all warranties, express or implied</li>
                    <li>Use at your own risk</li>
                    <li>Service provided "as is" and "as available"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    7.2 Limitation of Liability
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>We are not liable for any damages from Bot use</li>
                    <li>
                      This includes direct, indirect, incidental, or
                      consequential damages
                    </li>
                    <li>
                      Maximum liability is limited to the amount paid for the
                      service (if any)
                    </li>
                    <li>
                      No liability for third-party actions or Discord service
                      issues
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    7.3 Force Majeure
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Unforeseen Events:</strong> Not liable for events
                      beyond our control
                    </li>
                    <li>
                      <strong>Discord API Issues:</strong> Not responsible for
                      Discord service disruptions
                    </li>
                    <li>
                      <strong>Technical Failures:</strong> Not liable for
                      technical infrastructure issues
                    </li>
                    <li>
                      <strong>Natural Disasters:</strong> Not liable for natural
                      disaster-related disruptions
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                8. Termination
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    8.1 User Termination
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>You may stop using the Bot at any time</li>
                    <li>Remove the Bot from your server to discontinue use</li>
                    <li>
                      Data will be retained according to our retention policy
                    </li>
                    <li>No refunds for free service</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    8.2 Service Termination
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>We may discontinue the Bot service with notice</li>
                    <li>Emergency termination may occur without notice</li>
                    <li>
                      Users will be notified of service changes when possible
                    </li>
                    <li>30-day notice for planned service discontinuation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    8.3 Effect of Termination
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Data Retention:</strong> Data retained according
                      to Privacy Policy
                    </li>
                    <li>
                      <strong>Access Cessation:</strong> Immediate cessation of
                      service access
                    </li>
                    <li>
                      <strong>Data Export:</strong> Users may request data
                      export before termination
                    </li>
                    <li>
                      <strong>No Refunds:</strong> No refunds for free service
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                9. Changes to Terms
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    9.1 Updates
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>These terms may be updated periodically</li>
                    <li>Changes will be posted in the Bot's documentation</li>
                    <li>Continued use constitutes acceptance of new terms</li>
                    <li>Version history maintained for transparency</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    9.2 Notification
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      Major changes will be announced in the Bot's support
                      server
                    </li>
                    <li>Users are responsible for checking for updates</li>
                    <li>
                      Significant changes will be communicated via Discord
                    </li>
                    <li>30-day advance notice for significant changes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    9.3 Acceptance
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Continued Use:</strong> Continued use constitutes
                      acceptance
                    </li>
                    <li>
                      <strong>Explicit Consent:</strong> Major changes may
                      require explicit consent
                    </li>
                    <li>
                      <strong>Opt-Out:</strong> Users may opt out by
                      discontinuing service use
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                10. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                For questions about these Terms of Use:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>GitHub Issues:</strong>{" "}
                  <Link
                    href={`${links.github}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Create an issue
                  </Link>
                </li>
                <li>
                  <strong>Support Server:</strong>{" "}
                  <Link
                    href={links.support}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Join our Discord server
                  </Link>{" "}
                  for assistance
                </li>
                <li>
                  <strong>Email:</strong> support@tyecode.com
                </li>
                <li>
                  <strong>Response Time:</strong> Within 48 hours for general
                  inquiries
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                11. Governing Law and Dispute Resolution
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    11.1 Governing Law
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    These terms are governed by applicable laws. Any disputes
                    will be resolved through appropriate legal channels. For
                    users in the European Union, these terms are governed by EU
                    law. For users in the United States, these terms are
                    governed by the laws of the state where the service is
                    provided.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    11.2 Dispute Resolution
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Initial Contact:</strong> Attempt resolution
                      through support channels
                    </li>
                    <li>
                      <strong>Escalation:</strong> GitHub issues or support
                      server for complex disputes
                    </li>
                    <li>
                      <strong>Legal Action:</strong> As last resort, governed by
                      applicable law
                    </li>
                    <li>
                      <strong>Mediation:</strong> Optional mediation for
                      commercial disputes
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    11.3 Jurisdiction
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Primary Jurisdiction:</strong> Service provider's
                      jurisdiction
                    </li>
                    <li>
                      <strong>Alternative Dispute Resolution:</strong> Available
                      for eligible disputes
                    </li>
                    <li>
                      <strong>Class Action Waiver:</strong> Individual dispute
                      resolution required
                    </li>
                    <li>
                      <strong>Small Claims:</strong> Small claims court
                      available where applicable
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                12. Security and Compliance
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    12.1 Security Standards
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Data Protection:</strong> Industry-standard
                      security measures
                    </li>
                    <li>
                      <strong>Regular Audits:</strong> Security assessments
                      conducted periodically
                    </li>
                    <li>
                      <strong>Incident Response:</strong> Prompt response to
                      security incidents
                    </li>
                    <li>
                      <strong>Vulnerability Management:</strong> Regular
                      security updates and patches
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    12.2 Compliance
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>GDPR:</strong> Full compliance with European data
                      protection laws
                    </li>
                    <li>
                      <strong>CCPA:</strong> California Consumer Privacy Act
                      compliance
                    </li>
                    <li>
                      <strong>COPPA:</strong> Children's Online Privacy
                      Protection Act compliance
                    </li>
                    <li>
                      <strong>Local Laws:</strong> Compliance with applicable
                      local regulations
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    12.3 Security Measures
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Encryption:</strong> TLS 1.3 encryption for all
                      data transmission
                    </li>
                    <li>
                      <strong>Access Control:</strong> Role-based access control
                      for all systems
                    </li>
                    <li>
                      <strong>Monitoring:</strong> 24/7 system monitoring and
                      alerting
                    </li>
                    <li>
                      <strong>Backup:</strong> Regular data backups with
                      encryption
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                13. Service Level Agreement (SLA)
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    13.1 Availability
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Target Uptime:</strong> 99.5% monthly availability
                    </li>
                    <li>
                      <strong>Maintenance Windows:</strong> Scheduled with
                      24-hour notice
                    </li>
                    <li>
                      <strong>Emergency Maintenance:</strong> May occur without
                      notice
                    </li>
                    <li>
                      <strong>Compensation:</strong> Service credits for
                      extended outages
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    13.2 Support
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Response Time:</strong> 48 hours for general
                      inquiries
                    </li>
                    <li>
                      <strong>Critical Issues:</strong> 24 hours for critical
                      functionality issues
                    </li>
                    <li>
                      <strong>Bug Reports:</strong> Acknowledged within 72 hours
                    </li>
                    <li>
                      <strong>Feature Requests:</strong> Reviewed quarterly
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    13.3 Performance
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Response Time:</strong> Sub-2-second response time
                      for commands
                    </li>
                    <li>
                      <strong>Rate Limiting:</strong> Respects Discord's API
                      limits
                    </li>
                    <li>
                      <strong>Scalability:</strong> Designed to handle multiple
                      servers
                    </li>
                    <li>
                      <strong>Monitoring:</strong> Real-time performance
                      monitoring
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                14. Additional Terms
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    14.1 Beta Features
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Experimental Features:</strong> May be unstable or
                      incomplete
                    </li>
                    <li>
                      <strong>Feedback:</strong> User feedback encouraged for
                      beta features
                    </li>
                    <li>
                      <strong>Discontinuation:</strong> Beta features may be
                      discontinued
                    </li>
                    <li>
                      <strong>No Warranty:</strong> Beta features provided
                      without warranty
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    14.2 Third-Party Services
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Discord Integration:</strong> Subject to Discord's
                      terms
                    </li>
                    <li>
                      <strong>External APIs:</strong> May use third-party
                      services
                    </li>
                    <li>
                      <strong>No Liability:</strong> Not liable for third-party
                      service issues
                    </li>
                    <li>
                      <strong>Compatibility:</strong> Service depends on Discord
                      API compatibility
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    14.3 Export Controls
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Compliance:</strong> Service complies with export
                      control laws
                    </li>
                    <li>
                      <strong>Restricted Use:</strong> No use in embargoed
                      countries
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> Users must comply with
                      applicable laws
                    </li>
                    <li>
                      <strong>Reporting:</strong> Required reporting of
                      suspicious activity
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Last Updated:</strong> August 3, 2025
                </p>
                <p>
                  <strong>Version:</strong> 1.1
                </p>
                <p>
                  <strong>Effective Date:</strong> Upon bot release (TBD)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
