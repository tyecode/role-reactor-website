import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Github, Heart } from "lucide-react";
import { links } from "@/constants/links";

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
                    Help us keep Role Reactor running and improving:
                  </p>
                  <div className="space-y-2">
                    <a
                      href={links.buymeacoffee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-indigo-400 hover:underline"
                    >
                      Buy Me a Coffee
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Business Information
              </h3>
              <div className="text-gray-300 space-y-2">
                <p>
                  <strong>Service:</strong> Role Reactor Discord Bot
                </p>
                <p>
                  <strong>Type:</strong> Discord Bot Development & Support
                </p>
                <p>
                  <strong>Developer:</strong> {links.author.name}
                </p>
                <p>
                  <strong>Business Email:</strong> {links.contact.email}
                </p>
                <p>
                  <strong>Website:</strong> {links.home}
                </p>
                <p>
                  <strong>Support:</strong> Discord Community & Email
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
