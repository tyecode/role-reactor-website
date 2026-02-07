"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  UserMenu as SharedUserMenu,
  UserMenuProps as SharedUserMenuProps,
} from "@/components/ui/user-menu";
import { PricingDialog } from "@/components/pricing/pricing-dialog";
import { useUserStore } from "@/store/use-user-store";

// Helper function to check if session cookie exists
function hasSessionCookie(): boolean {
  if (typeof document === "undefined") return false;

  // NextAuth v5 uses different cookie names, check for common ones
  const cookies = document.cookie.split(";");
  return cookies.some(
    (cookie) =>
      cookie.trim().startsWith("authjs.session-token=") ||
      cookie.trim().startsWith("__Secure-authjs.session-token=") ||
      cookie.trim().startsWith("next-auth.session-token=") ||
      cookie.trim().startsWith("__Secure-next-auth.session-token=")
  );
}

// Omit the props we are overriding/handling internally
type Props = Omit<
  SharedUserMenuProps,
  "onLogin" | "onLogout" | "onAddCredits"
> & {
  // Add any specific props if needed, but for now we just pass through
};

export function UserMenu(props: Partial<Props>) {
  const { data: session, status } = useSession();
  const { user: userData, fetchUser, clearUser } = useUserStore();
  const [hasCookie, setHasCookie] = useState(() => hasSessionCookie());
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Check for session cookie on mount and when status changes
  useEffect(() => {
    setHasCookie(hasSessionCookie());
  }, [status]);

  // Handle session sync with store
  useEffect(() => {
    if (session?.user?.id) {
      fetchUser(session.user.id);
    } else if (status === "unauthenticated") {
      clearUser();
    }
  }, [session, status, fetchUser, clearUser]);

  const coreBalance = userData?.currentCredits ?? null;

  // Determine the actual status - if loading with no cookie, show unauthenticated
  const effectiveStatus =
    status === "loading" && !hasCookie && !session ? "unauthenticated" : status;

  return (
    <>
      <PricingDialog open={isPricingOpen} onOpenChange={setIsPricingOpen}>
        <span className="hidden" />
      </PricingDialog>

      <SharedUserMenu
        user={session?.user}
        status={effectiveStatus}
        coreBalance={coreBalance}
        coreImageUrl="/images/cores/core_energy.png"
        onLogin={() => {
          const currentPath =
            typeof window !== "undefined" ? window.location.pathname : "/";
          signIn("discord", { callbackUrl: currentPath });
        }}
        onLogout={() => signOut({ callbackUrl: "/" })}
        onAddCredits={() => setIsPricingOpen(true)}
        dashboardUrl="/dashboard"
        showDashboardLink={true}
        showSettingsLink={false}
        showCoreBalance={true}
        variant="header"
        {...props}
      />
    </>
  );
}
