import Link from "next/link";

import { links } from "@/constants/links";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-black dark:to-blue-950">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: September 7, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              If you are here, you have reached us by visiting rolereactor.app,
              or by using our Discord bot services ("Services"). Your privacy is
              important to us. It is our policy, as the developers of Role
              Reactor, to respect your privacy and comply with any applicable
              law and regulation regarding any personal information we may
              collect about you.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Personal information is any information about you which can be
              used to identify you. This includes information about you as a
              person (such as your Discord ID), your devices, and information
              about how you use our Services.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              In the event our site or Services contain links to third-party
              sites and services, please be aware that those sites and services
              have their own privacy policies. After following a link to any
              third-party content, you should read their posted privacy policy
              information about how they collect and use personal information.
              This Privacy Policy does not apply to any of your activities after
              you leave our Services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The information we collect consists of three types: "Personal
              Information Provided by You," "Automatically Collected
              Information," and "Information Provided by Discord."
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Personal Information Provided by You
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This refers to any information you knowingly and actively provide
              us when using our Services, such as by interacting with the bot,
              configuring settings, or contacting our support team.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When you make donations through our Services, your payment
              processing service provider (Ko-fi) may collect your name, email
              address, and payment information to process the transaction. We
              receive a notification of the donation, which may include your
              provided name and message.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              When you ask for assistance from our support team, we may collect
              and store the contact information you provide, such as your
              Discord username and ID, and any information about your activity
              on the Services. We will also store the correspondence and any
              information contained within it to provide support.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Automatically Collected Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When you interact with our Services, we may automatically collect
              data about your usage patterns. This information is necessary for
              the core functionality of the bot.
            </p>

            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <strong>User IDs and Server (Guild) IDs:</strong> Required for
                all bot functionality to identify users and servers.
              </li>
              <li>
                <strong>Role Assignments and Temporary Role Data:</strong> To
                manage reaction roles and track when temporary roles should
                expire.
              </li>
              <li>
                <strong>Experience Points and Level Progression:</strong> To
                operate the leveling system and leaderboards.
              </li>
              <li>
                <strong>Message Activity:</strong> We log that a message was
                sent to calculate XP. We do not store the content of user
                messages.
              </li>
              <li>
                <strong>Bot Command Usage and Configuration Settings:</strong>{" "}
                To understand feature usage and save server-specific settings.
              </li>
              <li>
                <strong>Error Logs and Performance Data:</strong> To monitor the
                bot's health and troubleshoot issues.
              </li>
            </ul>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              This information does not typically reveal your specific
              real-world identity but is essential for the bot's operational
              functionality.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Information Provided by Discord
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              When you interact with a server where our Services are installed,
              we receive certain information from Discord in accordance with
              their Privacy Policy, such as your Discord username, ID, and
              avatar.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use the information collected via our bot for various purposes:
            </p>

            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>To provide, operate, and maintain our Services.</li>
              <li>
                To provide in-service features like leaderboards, experience
                systems, and role management.
              </li>
              <li>
                To customize and personalize the experience in the Services.
              </li>
              <li>
                To provide technical support and respond to user inquiries.
              </li>
              <li>
                To analyze and understand how you use our Services, and to
                develop new products, services, features, and functionality.
              </li>
              <li>To recognize and reward supporters and donors.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Sharing Your Information
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We may share your information in the following situations:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              With Third-Party Service Providers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We may provide your information to third-party companies that
              perform services for us or on our behalf. These services include
              payment processing (Ko-fi), data hosting and storage (MongoDB
              Atlas), and issue tracking for support (GitHub). These service
              providers have access to your information only to perform these
              tasks on our behalf and are obligated not to disclose or use it
              for any other purpose.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              For Legal Reasons
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We may disclose your information if we believe it is necessary to
              investigate, prevent, or take action regarding potential
              violations of our policies, suspected fraud, situations involving
              potential threats to the safety of any person, illegal activities,
              or as evidence in litigation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              With Your Consent
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We may disclose your personal information for other purposes with
              your consent.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We will retain your personal information only for as long as is
              necessary for the purposes set out in this privacy policy. We will
              retain and use your information to the extent necessary to comply
              with our legal obligations, resolve disputes, and enforce our
              policies. When you remove our bot from your Discord server,
              associated server-specific configuration data is deleted.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Policies Concerning Children
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Our Services are intended for a general audience and are not
              directed to children. We do not knowingly collect personal
              information from users deemed to be children under their
              respective national laws. If we learn that we have collected
              personal information from any child, we will take steps to delete
              such information from our files as soon as possible.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Data Protection Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Depending on your location, you may have certain rights under
              applicable data protection laws. These may include:
            </p>

            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                The right to request access and obtain a copy of your personal
                information.
              </li>
              <li>The right to request rectification or erasure.</li>
              <li>
                The right to restrict the processing of your personal
                information.
              </li>
              <li>The right to data portability (if applicable).</li>
              <li>
                The right to object to the processing of your personal
                information.
              </li>
            </ul>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              For inquiries about your data rights, please contact us at{" "}
              <a
                href={`mailto:${links.contact.email}`}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {links.contact.email}
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              International Transfer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Your personal information may be transferred to, and maintained
              on, computers located outside of your state, province, country, or
              other governmental jurisdiction where the privacy laws may not be
              as protective as those in your jurisdiction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions or concerns regarding our Privacy Policy,
              please contact us at:
            </p>

            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${links.contact.email}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {links.contact.email}
                </a>
              </li>
              <li>
                Discord:{" "}
                <a
                  href={links.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Join our support server
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. When we do,
              we will update the "Last Updated" date at the top of this page.
              For significant changes, we will notify users through our Discord
              server or website.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
