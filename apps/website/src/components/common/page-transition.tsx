"use client";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full min-w-0 overflow-x-hidden animate-in fade-in duration-700">
      {children}
    </div>
  );
}
