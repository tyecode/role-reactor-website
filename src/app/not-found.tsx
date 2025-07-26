import Link from "next/link";
import Image from "next/image";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-br from-slate-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[180px] h-[180px] bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-25 animate-bg-move-1" />
        <div className="absolute w-[120px] h-[120px] bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-2xl opacity-20 animate-bg-move-2" />
        <div
          className="absolute w-[40px] h-[40px] bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full blur-xl opacity-15 animate-bg-move-3"
          style={{
            left: "50%",
            top: "60%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/logo.png"
          width={64}
          height={64}
          alt="Role Reactor Bot Logo"
          className="mb-6 drop-shadow-lg rounded-full border border-primary/20 bg-white dark:bg-[#23263a]"
          priority
        />
        <h1
          className={
            "text-6xl md:text-7xl font-extrabold tracking-tight text-primary mb-2 " +
            audiowide.className
          }
        >
          404
        </h1>
        <h2 className="text-xl font-medium text-muted-foreground mb-6">
          This page could not be found.
        </h2>
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-md font-semibold bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
