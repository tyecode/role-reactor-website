import Link from "next/link";

import { links } from "@/constants/links";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-black to-blue-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors mb-4 sm:mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Terms of Use
          </h1>
          <p className="text-gray-400">Last Updated: April 4, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-700/50">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Welcome! We appreciate you and our community. In order to create a
              better experience for everyone, we require all our users to
              carefully review and accept the following Terms of Service. This
              not only helps us preserve a healthy and fun environment for our
              users, but also allows us to continuously improve your experience.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              General Considerations and Definitions
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              For purposes of this agreement, these terms set forth our legal
              obligations to each other. This applies to your use of our
              services.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              When we say &quot;The Company&quot;, &quot;Role Reactor&quot;,
              &quot;Ourselves&quot;, &quot;We&quot;, &quot;Us&quot; and
              &quot;Our&quot;, this refers to our service, Role Reactor. When we
              say &quot;Services&quot; in these terms, we mean Role
              Reactor&apos;s Discord bot, website (rolereactor.app), dashboard,
              and other products. &quot;Party&quot;, &quot;Parties&quot; or
              &quot;Us&quot; refers to both the End User and ourselves, or
              either the End User or ourselves. When we say &quot;You&quot; or
              &quot;Your&quot;, we mean you.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              If you&apos;re accessing our services on behalf of a legal entity,
              you agree that you have the authority to bind that entity to these
              terms, and &quot;you&quot; and &quot;your&quot; will refer to that
              entity. When we say &quot;Discord&quot; or &quot;Discord
              server&quot;, we are referring to our online community provided by
              Discord, Inc.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Privacy Policy and Community Guidelines
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              Our Privacy Policy is available to inform you of our data
              collection practices and your rights with respect to the data we
              collect from you. While this is a separate document, it is an
              important part of understanding how we operate.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Your privacy rights are important to us. Please take your time to
              review our{" "}
              <Link href="/privacy" className="text-indigo-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Eligibility
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              By accessing our services, you confirm that you&apos;re at least
              13 years old and meet the minimum age of digital consent in your
              country. If you are old enough to access our services in your
              country but not old enough to have authority to consent to our
              terms, your parent or responsible guardian must agree to our terms
              on your behalf.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              Please ask your parent or guardian to read these terms with you.
              If you&apos;re a parent or legal guardian, and you allow your
              teenager to use our services, then these terms also apply to you
              and you are responsible for your teenager&apos;s activity on our
              services.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Service Description
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              Role Reactor is an open-source Discord bot platform that provides
              community management and automation features. Our core service is
              provided free of charge, with optional paid upgrades (Core Credits
              and Pro Engine) available for users who need higher limits and
              advanced features.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              Our Services include:
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
              <li>Self-assignable roles with reaction-based assignment</li>
              <li>Temporary role assignments with automatic expiration</li>
              <li>Scheduled role assignments at specific times or intervals</li>
              <li>Experience points, leveling system, and leaderboards</li>
              <li>
                Welcome and goodbye messages for new and departing members
              </li>
              <li>Ticket support system with transcript storage</li>
              <li>Giveaway hosting with configurable entry limits</li>
              <li>Moderation tools (timeout, ban, kick, bulk actions)</li>
              <li>Dynamic voice channel control</li>
              <li>AI-powered tools (avatars, chat, image generation)</li>
              <li>Server analytics dashboard</li>
              <li>Web dashboard for server configuration</li>
              <li>Administrative tools for server management</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Ownership and Content
            </h2>

            <h3 className="text-xl font-semibold text-white mb-3">
              Your Content
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              When we say &quot;Your Content&quot; in these terms, we mean all
              the things you add (upload and post) to our services. This may
              include text, links, emoji, photos, videos, documents or other
              media.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              You are responsible for ensuring that you have the right to use
              any content you add to our services. We take no responsibility for
              any of your content. By adding content, you grant us a license to
              use, copy, store, and distribute it in manners consistent with
              your use of the services.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">
              Our Content and Materials
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The services contain content including our logos, designs, text,
              and graphics which are the proprietary property of Role Reactor
              and are protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Purchases and Payments
            </h2>

            <h3 className="text-xl font-semibold text-white mb-3">
              Core Credits
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Role Reactor offers digital credit packages called &quot;Core
              Credits&quot; (also referred to as &quot;Cores&quot;) available
              for purchase at various price points. Core Credits are used to
              activate the Pro Engine and access premium features within your
              Discord server. Purchases are processed through third-party
              payment processors (currently cryptocurrency via Plisio) and are
              subject to their respective terms and conditions.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">
              Pro Engine
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Pro Engine is a premium upgrade that provides increased usage
              limits and access to advanced features for a specific Discord
              server. Pro Engine activations are tied to the server they are
              activated on and cannot be transferred between servers. Each
              activation has a duration period, after which it must be renewed
              using additional Core Credits.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">
              Refund Policy
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Core Credits are non-refundable digital assets. Once purchased,
              Core Credits cannot be exchanged for cash or transferred to
              another user. Pro Engine activations, once applied to a server,
              cannot be reversed or refunded. If you experience a technical
              issue with your purchase, please contact us for assistance.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">
              Free Credits
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Users may earn a limited number of Core Credits through free
              methods such as voting on bot listing platforms (e.g., top.gg). We
              reserve the right to modify, limit, or discontinue free credit
              programs at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Voluntary Donations
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              In addition to Core Credit purchases, we accept voluntary
              donations through third-party platforms (e.g., Buy Me a Coffee) to
              support the ongoing development and hosting costs of Role Reactor.
              Donations are entirely optional, do not grant any premium
              features, and are non-refundable. Donations are processed through
              their respective third-party platforms and are subject to those
              platforms&apos; terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              User Responsibilities
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              You agree to use our Services only for lawful purposes and not to
              engage in any conduct that restricts or inhibits anyone&apos;s use
              or enjoyment of the Services. You agree not to exploit, abuse, or
              manipulate the Core Credit economy through automated means, fake
              accounts, or any other fraudulent activity.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Disclaimer of Warranties and Limited Liability
            </h2>

            <p className="text-gray-300 leading-relaxed mb-4">
              Our services are provided on an &quot;AS IS&quot; basis. To the
              full extent permissible by law, we disclaim any and all warranties
              and representations. We do not warrant the non-infringement of any
              intellectual property right.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              To the maximum extent permitted by applicable law, in no event
              shall we be liable for any special, incidental, indirect, or
              consequential damages whatsoever.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Termination
            </h2>

            <h3 className="text-xl font-semibold text-white mb-3">
              Your Right to Terminate
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You are free to stop using our services at any time. Removing the
              bot from your Discord server will delete your server-specific data
              from our service. Unused Core Credits will remain in your account
              unless you request their deletion.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">
              Our Right to Terminate
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              We reserve the right to suspend or terminate your access to our
              services with or without notice if you breach these terms or if we
              are required to do so to comply with a legal requirement. In the
              event of termination for Terms of Service violations, unused Core
              Credits may be forfeited.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Open Source
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Role Reactor is an open-source project licensed under the MIT
              License. You can view our source code on{" "}
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                GitHub
              </a>
              , contribute to development, and run your own instance of the bot.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Disputes or Concerns
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Should you have an issue with the services, please try to resolve
              it with us informally by sending a notice to{" "}
              <a
                href={`mailto:${links.contact.email}`}
                className="text-indigo-400 hover:underline"
              >
                {links.contact.email}
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have questions or concerns regarding these Terms of Use,
              please contact us at:
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${links.contact.email}`}
                  className="text-indigo-400 hover:underline"
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
                  className="text-indigo-400 hover:underline"
                >
                  Join our support server
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mb-4">Changes</h2>
            <p className="text-gray-300 leading-relaxed">
              We may change these Terms from time to time. If we do, we&apos;ll
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
