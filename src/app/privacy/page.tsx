import Link from "next/link";
import type { Metadata } from "next";

import { links } from "@/constants/links";

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
            Last updated: August 3, 2025
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
                This Privacy Policy explains how Role Reactor Bot ("the Bot",
                "we", "our") collects, uses, and protects your information when
                you use our Discord bot service. This policy is effective as of
                the bot's release date and applies to all users of the Role
                Reactor Bot service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                2. Information We Collect
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    2.1 Discord Data
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    We collect the following information from Discord:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>User IDs:</strong> To identify users for role
                      assignments
                    </li>
                    <li>
                      <strong>Server IDs:</strong> To manage bot functionality
                      per server
                    </li>
                    <li>
                      <strong>Role IDs:</strong> To track role assignments and
                      permissions
                    </li>
                    <li>
                      <strong>Message IDs:</strong> To manage reaction-based
                      role assignments
                    </li>
                    <li>
                      <strong>Channel IDs:</strong> To identify where role
                      messages are posted
                    </li>
                    <li>
                      <strong>Guild Member Data:</strong> Basic member
                      information for role management
                    </li>
                    <li>
                      <strong>Permission Data:</strong> Role permissions for
                      validation
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    2.2 Bot Usage Data
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    We collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Command usage:</strong> Which commands are used
                      and when
                    </li>
                    <li>
                      <strong>Role assignments:</strong> Temporary and permanent
                      role assignments
                    </li>
                    <li>
                      <strong>Server configurations:</strong> Role-reaction
                      message settings
                    </li>
                    <li>
                      <strong>Error logs:</strong> Technical information for
                      debugging (no personal data)
                    </li>
                    <li>
                      <strong>Performance metrics:</strong> Response times and
                      system health data
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    2.3 Cookies and Tracking
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Session Data:</strong> Temporary session
                      information for bot functionality
                    </li>
                    <li>
                      <strong>No Third-Party Cookies:</strong> We do not use
                      third-party tracking cookies
                    </li>
                    <li>
                      <strong>Discord Cookies:</strong> Subject to Discord's
                      cookie policy
                    </li>
                    <li>
                      <strong>Analytics:</strong> Anonymous usage statistics for
                      service improvement
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    2.4 What We Don't Collect
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    We do not collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Personal messages or conversations</li>
                    <li>User profile information beyond Discord IDs</li>
                    <li>Voice or video data</li>
                    <li>Payment information (service is free)</li>
                    <li>Sensitive personal information</li>
                    <li>Location data beyond Discord's provided information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                3. How We Use Your Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    3.1 Service Provision
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Role Management:</strong> Process role assignments
                      and removals
                    </li>
                    <li>
                      <strong>Temporary Roles:</strong> Track and expire
                      temporary role assignments
                    </li>
                    <li>
                      <strong>Bot Functionality:</strong> Provide reaction-based
                      role assignment features
                    </li>
                    <li>
                      <strong>Error Resolution:</strong> Debug and fix technical
                      issues
                    </li>
                    <li>
                      <strong>Data Export:</strong> Provide data export
                      functionality for GDPR compliance
                    </li>
                    <li>
                      <strong>Service Improvement:</strong> Analyze usage
                      patterns to improve functionality
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    3.2 Data Processing
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Automated Processing:</strong> Role assignments
                      are processed automatically
                    </li>
                    <li>
                      <strong>Manual Review:</strong> Technical issues may be
                      reviewed when necessary
                    </li>
                    <li>
                      <strong>No Profiling:</strong> We do not create user
                      profiles or behavioral analysis
                    </li>
                    <li>
                      <strong>Controlled Deletion:</strong> Data deletion is
                      handled through admin commands for safety
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    3.3 Automated Decision Making
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Role Assignment Logic:</strong> Automated based on
                      reaction interactions
                    </li>
                    <li>
                      <strong>Temporary Role Expiration:</strong> Automatic
                      cleanup based on time limits
                    </li>
                    <li>
                      <strong>No Profiling:</strong> No automated user profiling
                      or behavioral analysis
                    </li>
                    <li>
                      <strong>Human Oversight:</strong> All automated decisions
                      can be reviewed and overridden
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                4. Data Storage and Security
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    4.1 Storage Location
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Primary Storage:</strong> Secure database storage
                    </li>
                    <li>
                      <strong>Backup Storage:</strong> Local backups for data
                      protection
                    </li>
                    <li>
                      <strong>Log Storage:</strong> Application logs for
                      debugging
                    </li>
                    <li>
                      <strong>Geographic Location:</strong> Data may be stored
                      in multiple regions for redundancy
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    4.2 Security Measures
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Encryption:</strong> Data transmitted over secure
                      connections (TLS 1.3)
                    </li>
                    <li>
                      <strong>Access Control:</strong> Limited access to
                      production data
                    </li>
                    <li>
                      <strong>Regular Updates:</strong> Security patches applied
                      promptly
                    </li>
                    <li>
                      <strong>Monitoring:</strong> System monitoring for
                      suspicious activity
                    </li>
                    <li>
                      <strong>Data Minimization:</strong> Only necessary data is
                      collected and stored
                    </li>
                    <li>
                      <strong>Security Audits:</strong> Regular security
                      assessments conducted
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    4.3 Data Retention
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Role Assignments:</strong> Retained until manually
                      removed via admin commands or bot is removed
                    </li>
                    <li>
                      <strong>Temporary Roles:</strong> Automatically deleted
                      upon expiration
                    </li>
                    <li>
                      <strong>Server Configurations:</strong> Retained until
                      server removes the bot
                    </li>
                    <li>
                      <strong>Logs:</strong> Retained for 30 days for debugging
                      purposes
                    </li>
                    <li>
                      <strong>User Preferences:</strong> Retained until user
                      requests deletion
                    </li>
                    <li>
                      <strong>Analytics Data:</strong> Aggregated data retained
                      for 90 days
                    </li>
                    <li>
                      <strong>Error Logs:</strong> Retained for 60 days for
                      system improvement
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                5. Data Sharing and Disclosure
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    5.1 No Third-Party Sharing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    We do not sell, trade, or share your data with third parties
                    except:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Legal Requirements:</strong> When required by law
                    </li>
                    <li>
                      <strong>Service Providers:</strong> Essential technical
                      services (hosting, monitoring)
                    </li>
                    <li>
                      <strong>Discord:</strong> As required by Discord's Terms
                      of Service
                    </li>
                    <li>
                      <strong>Emergency Situations:</strong> When necessary to
                      protect user safety
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    5.2 Discord Integration
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      Data is shared with Discord as necessary for bot
                      functionality
                    </li>
                    <li>
                      Discord's privacy policy applies to their handling of your
                      data
                    </li>
                    <li>We cannot control how Discord uses your information</li>
                    <li>
                      Discord's data practices are governed by their own privacy
                      policy
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    5.3 Service Providers
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Database Hosting:</strong> Secure cloud database
                      services
                    </li>
                    <li>
                      <strong>Discord API:</strong> Essential service
                      integration
                    </li>
                    <li>
                      <strong>GitHub:</strong> Issue tracking and support
                      (anonymized data only)
                    </li>
                    <li>
                      <strong>
                        All providers have appropriate data protection
                        agreements
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                6. Your Rights and Choices
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    6.1 Access and Control
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Remove Bot:</strong> Remove the bot from your
                      server to stop data collection
                    </li>
                    <li>
                      <strong>Delete Data:</strong> Use admin commands to delete
                      specific data or contact us for bulk deletion
                    </li>
                    <li>
                      <strong>View Data:</strong> Request a copy of your stored
                      data
                    </li>
                    <li>
                      <strong>Contact Method:</strong> Create an issue on GitHub
                      or join our support server
                    </li>
                    <li>
                      <strong>Data Correction:</strong> Request correction of
                      inaccurate data
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    6.2 Opt-Out Options
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Disable Features:</strong> Turn off specific bot
                      features in your server
                    </li>
                    <li>
                      <strong>Remove Roles:</strong> Manually remove role
                      assignments using admin commands
                    </li>
                    <li>
                      <strong>Contact Support:</strong> Reach out for assistance
                      with data concerns
                    </li>
                    <li>
                      <strong>Data Deletion:</strong> Use `/delete-roles` and
                      `/remove-temp-role` commands for specific deletion
                    </li>
                    <li>
                      <strong>Bulk Deletion:</strong> Contact us for complete
                      data removal across all servers
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    6.3 Data Portability
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Export Data:</strong> Contact us to export your
                      data
                    </li>
                    <li>
                      <strong>Data Transfer:</strong> We can transfer your data
                      to another service if requested
                    </li>
                    <li>
                      <strong>Format:</strong> Data will be provided in JSON or
                      CSV format as appropriate
                    </li>
                    <li>
                      <strong>Contact Method:</strong> Create an issue on GitHub
                      or join our support server
                    </li>
                    <li>
                      <strong>Comprehensive Export:</strong> Includes role
                      mappings, usage logs, and retention info
                    </li>
                    <li>
                      <strong>Response Time:</strong> Within 30 days of request
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    6.4 Right to Data Portability
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Export Format:</strong> JSON or CSV format
                      available
                    </li>
                    <li>
                      <strong>Export Scope:</strong> All user data, role
                      assignments, and server configurations
                    </li>
                    <li>
                      <strong>Export Method:</strong> Contact us for data export
                    </li>
                    <li>
                      <strong>Response Time:</strong> Within 30 days of request
                    </li>
                    <li>
                      <strong>No Cost:</strong> Data export is provided free of
                      charge
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                7. Children's Privacy
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    7.1 Age Requirements
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Discord requires users to be 13+ years old</li>
                    <li>
                      We do not knowingly collect data from users under 13
                    </li>
                    <li>
                      If we discover underage users, we will delete their data
                      immediately
                    </li>
                    <li>
                      Parents can contact us to request data deletion for
                      underage users
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                8. International Data Transfers
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    8.1 Data Location
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Data may be stored in different countries</li>
                    <li>We ensure appropriate data protection measures</li>
                    <li>Compliance with applicable data protection laws</li>
                    <li>Standard Contractual Clauses used where necessary</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    8.2 Cross-Border Transfers
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>EU-US Transfers:</strong> Compliant with EU
                      adequacy decisions
                    </li>
                    <li>
                      <strong>Other Regions:</strong> Appropriate safeguards
                      implemented
                    </li>
                    <li>
                      <strong>Local Laws:</strong> Compliance with local data
                      protection regulations
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                9. Changes to This Policy
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    9.1 Updates
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>This policy may be updated periodically</li>
                    <li>Changes will be posted in the bot's documentation</li>
                    <li>Significant changes will be announced via Discord</li>
                    <li>Version history maintained for transparency</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    9.2 Notification
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Users will be notified of major policy changes</li>
                    <li>
                      Continued use constitutes acceptance of updated policy
                    </li>
                    <li>Previous versions will be archived</li>
                    <li>30-day advance notice for significant changes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                10. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                For privacy-related questions or requests:
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
                  <strong>Email:</strong> privacy@tyecode.com
                </li>
                <li>
                  <strong>Data Requests:</strong> privacy@tyecode.com
                </li>
                <li>
                  <strong>Response Time:</strong> Within 48 hours for general
                  inquiries, 30 days for data requests
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                11. Legal Basis
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    11.1 GDPR Compliance
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Legitimate Interest:</strong> Providing bot
                      functionality
                    </li>
                    <li>
                      <strong>Consent:</strong> Implied through bot usage
                    </li>
                    <li>
                      <strong>Contract:</strong> Service provision agreement
                    </li>
                    <li>
                      <strong>Legal Obligation:</strong> Compliance with
                      applicable laws
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    11.2 CCPA Compliance
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Service Provider:</strong> We act as a service
                      provider
                    </li>
                    <li>
                      <strong>Data Categories:</strong> Identifiers and usage
                      data
                    </li>
                    <li>
                      <strong>Rights:</strong> California residents have
                      specific rights
                    </li>
                    <li>
                      <strong>No Sale:</strong> We do not sell personal
                      information
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    11.3 Other Jurisdictions
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>LGPD (Brazil):</strong> Compliance with Brazilian
                      data protection law
                    </li>
                    <li>
                      <strong>PIPEDA (Canada):</strong> Compliance with Canadian
                      privacy law
                    </li>
                    <li>
                      <strong>Local Laws:</strong> Compliance with applicable
                      local regulations
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                12. Data Breach Procedures
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    12.1 Incident Response
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Detection:</strong> Automated and manual
                      monitoring
                    </li>
                    <li>
                      <strong>Assessment:</strong> Immediate impact evaluation
                    </li>
                    <li>
                      <strong>Notification:</strong> Prompt user notification if
                      required
                    </li>
                    <li>
                      <strong>Remediation:</strong> Swift security improvements
                    </li>
                    <li>
                      <strong>Documentation:</strong> All incidents documented
                      and reviewed
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    12.2 User Notification
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Timeline:</strong> Within 72 hours of discovery
                    </li>
                    <li>
                      <strong>Method:</strong> Discord message and documentation
                      update
                    </li>
                    <li>
                      <strong>Information:</strong> Nature of breach and
                      protective measures
                    </li>
                    <li>
                      <strong>Contact:</strong> Direct notification to affected
                      users
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                13. Data Processing Agreements
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    13.1 Third-Party Processors
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Database Services:</strong> Secure cloud database
                      hosting
                    </li>
                    <li>
                      <strong>Discord API:</strong> Essential service
                      integration
                    </li>
                    <li>
                      <strong>GitHub:</strong> Issue tracking and support
                    </li>
                    <li>
                      <strong>
                        All processors have appropriate data protection
                        agreements
                      </strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    13.2 Data Processing Agreements
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      All third-party processors have appropriate data
                      protection agreements
                    </li>
                    <li>
                      Data processing is limited to essential service provision
                    </li>
                    <li>Regular audits of processor compliance</li>
                    <li>Sub-processor notification procedures in place</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                14. Data Protection Officer
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    14.1 Contact Information
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Email:</strong> dpo@tyecode.com
                    </li>
                    <li>
                      <strong>Role:</strong> Independent data protection
                      oversight
                    </li>
                    <li>
                      <strong>Response Time:</strong> Within 72 hours for urgent
                      matters
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                    14.2 Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Compliance Monitoring:</strong> Regular privacy
                      compliance assessments
                    </li>
                    <li>
                      <strong>User Rights:</strong> Oversight of data subject
                      rights processing
                    </li>
                    <li>
                      <strong>Breach Response:</strong> Coordination of data
                      breach response
                    </li>
                    <li>
                      <strong>Privacy Awareness:</strong> Maintaining privacy
                      best practices
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
