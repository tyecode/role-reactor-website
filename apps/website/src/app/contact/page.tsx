import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Github, Heart } from "lucide-react";
import { links } from "@/constants/links";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Role Reactor team. Email support, Discord community, and GitHub issues for bug reports and feature requests.",
  openGraph: {
    title: "Contact Us | Role Reactor",
    description:
      "Get in touch with the Role Reactor team. Email support, Discord community, and GitHub issues for bug reports and feature requests.",
    type: "website",
    locale: "en_US",
    url: "/contact",
    siteName: "Role Reactor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Role Reactor",
    description:
      "Get in touch with the Role Reactor team for support and inquiries.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-950 via-black to-blue-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-gray-400">
            Get in touch with the Role Reactor team
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              We're here to help! Whether you have questions about Role Reactor,
              need technical support, or want to provide feedback, we'd love to
              hear from you.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-indigo-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Email Support
                    </h3>
                    <p className="text-gray-300 mb-2">
                      For general inquiries, technical support, or feedback:
                    </p>
                    <a
                      href={`mailto:${links.contact.email}`}
                      className="text-indigo-400 hover:underline text-lg"
                    >
                      {links.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-indigo-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Discord Community
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Join our Discord server for real-time support and
                      community discussions:
                    </p>
                    <a
                      href={links.support}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline text-lg"
                    >
                      Join Discord Server
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Github className="w-6 h-6 text-indigo-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      GitHub Issues
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Report bugs or request features on our GitHub repository:
                    </p>
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline text-lg"
                    >
                      GitHub Repository
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Response Times
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Email: Within 24-48 hours</li>
                    <li>• Discord: Real-time during active hours</li>
                    <li>• GitHub Issues: Within 1-3 business days</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Heart className="w-5 h-5 text-red-400 mr-2" />
                    Support Development
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Enjoying Role Reactor? Your support helps keep the bot
                    running and funds new features. This is a voluntary donation
                    - not required for bot features.
                  </p>
                  <a
                    href={links.buymeacoffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Buy Me a Coffee
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
              <p>
                © {new Date().getFullYear()} Role Reactor. Built by{" "}
                {links.author.name}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
