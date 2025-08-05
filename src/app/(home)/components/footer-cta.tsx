import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

import { links } from "@/constants/links";

export function FooterCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-[var(--spacing-fd-container)] mx-auto text-center">
        <h2 className="text-3xl font-medium mb-4">
          Ready to Transform Your Server?
        </h2>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto">
          Simplify your Discord server with powerful reaction-based role
          management.
        </p>
        <Link
          href={links.inviteBot}
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get Started with Role Reactor"
        >
          <FaDiscord size={20} />
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
