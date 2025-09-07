import Link from "next/link";

import { links } from "@/constants/links";

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: September 7, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Welcome! We appreciate you and our community. In order to create a
              better experience for everyone, we require all our users to
              carefully review and accept the following Terms of Service. This
              not only helps us preserve a healthy and fun environment for our
              users, but also allows us to continuously improve your experience.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              General Considerations and Definitions
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              For purposes of this agreement, these terms set forth our legal
              obligations to each other. This applies to your use of our
              services.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When we say "The Company", "Role Reactor", "Ourselves", "We", "Us"
              and "Our", this refers to our service, Role Reactor. When we say
              "Services" in these terms, we mean Role Reactor's Discord bot,
              website, and other products. "Party", "Parties" or "Us" refers to
              both the End User and ourselves, or either the End User or
              ourselves. When we say "You" or "Your", we mean you.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              If you're accessing our services on behalf of a legal entity, you
              agree that you have the authority to bind that entity to these
              terms, and "you" and "your" will refer to that entity. When we say
              "Discord" or "Discord server", we are referring to our online
              community provided by Discord, Inc.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Privacy Policy and Community Guidelines
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our Privacy Policy is available to inform you of our data
              collection practices and your rights with respect to the data we
              collect from you. While this is a separate document, it is an
              important part of understanding how we operate.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Your privacy rights are important to us. Please take your time to
              review our{" "}
              <Link
                href="/privacy"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Eligibility
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              By accessing our services, you confirm that you're at least 13
              years old and meet the minimum age of digital consent in your
              country. If you are old enough to access our services in your
              country but not old enough to have authority to consent to our
              terms, your parent or responsible guardian must agree to our terms
              on your behalf.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Please ask your parent or guardian to read these terms with you.
              If you're a parent or legal guardian, and you allow your teenager
              to use our services, then these terms also apply to you and you
              are responsible for your teenager's activity on our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Service Description
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Role Reactor is a free, open-source Discord bot that provides role
              management and gamification features. Our core service is provided
              free of charge, with optional donations and sponsorships available
              to support development and server costs.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our Services include:
            </p>

            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Self-assignable roles with reaction-based assignment</li>
              <li>Temporary role assignments with automatic expiration</li>
              <li>Scheduled role assignments at specific times or intervals</li>
              <li>Experience points and leveling system</li>
              <li>Leaderboards and user statistics</li>
              <li>Welcome system for new members</li>
              <li>Administrative tools for server management</li>
              <li>Interactive 8-ball question answering</li>
              <li>Optional sponsorship and donation features</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Ownership and Content
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Your Content
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When we say "Your Content" in these terms, we mean all the things
              you add (upload and post) to our services. This may include text,
              links, emoji, photos, videos, documents or other media.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              You are responsible for ensuring that you have the right to use
              any content you add to our services. We take no responsibility for
              any of your content. By adding content, you grant us a license to
              use, copy, store, and distribute it in manners consistent with
              your use of the services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Content and Materials
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              The services contain content including our logos, designs, text,
              and graphics which are the proprietary property of Role Reactor
              and are protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Donations and Sponsorship
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Optional Donations
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Role Reactor is provided free of charge. We offer optional
              donation and sponsorship opportunities through platforms like
              Ko-fi to help cover server costs and support development. All
              donations are processed through third-party payment processors and
              are subject to their terms and conditions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Sponsor Benefits
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Sponsors may receive benefits such as special recognition roles in
              our Discord community and priority support. All donations are
              final and non-refundable.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              User Responsibilities
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              You agree to use our Services only for lawful purposes and not to
              engage in any conduct that restricts or inhibits anyone's use or
              enjoyment of the Services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Disclaimer of Warranties and Limited Liability
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our services are provided on an "AS IS" basis. To the full extent
              permissible by law, we disclaim any and all warranties and
              representations. We do not warrant the non-infringement of any
              intellectual property right.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              To the maximum extent permitted by applicable law, in no event
              shall we be liable for any special, incidental, indirect, or
              consequential damages whatsoever.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Termination
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Your Right to Terminate
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You are free to stop using our services at any time. Removing the
              bot from your Discord server will delete your server-specific data
              from our service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Right to Terminate
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We reserve the right to suspend or terminate your access to our
              services with or without notice if you breach these terms or if we
              are required to do so to comply with a legal requirement.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Open Source
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Role Reactor is an open-source project licensed under the MIT
              License. You can view our source code on{" "}
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                GitHub
              </a>
              , contribute to development, and run your own instance of the bot.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Disputes or Concerns
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Should you have an issue with the services, please try to resolve
              it with us informally by sending a notice to{" "}
              <a
                href={`mailto:${links.contact.email}`}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {links.contact.email}
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions or concerns regarding these Terms of Use,
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
              Changes
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may change these Terms from time to time. If we do, we'll
              provide notice of any changes. Your continued use of the Services
              following any notice will confirm that you have agreed to the
              amended Terms.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
