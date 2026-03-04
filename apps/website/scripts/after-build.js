import { copyFile, mkdir, cp } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * Robust post-build script for Next.js Standalone
 */
async function afterBuild() {
  const cwd = process.cwd();
  const standalonePath = join(cwd, ".next", "standalone", "apps", "website");

  try {
    // 1. Handle Service Worker (Original Task)
    const swSource = join(cwd, "src", "service-worker.ts");
    const swDest = join(cwd, "public", "sw.js");

    if (existsSync(swSource)) {
      await copyFile(swSource, swDest);
      console.log("✓ Service worker copied to public/sw.js");
    }

    // 2. Standalone Support: Copy public and static assets
    // The standalone server.js expects these to be present to serve styles/images
    if (existsSync(join(cwd, ".next", "standalone"))) {
      console.log("📦 Preparing standalone directory...");

      // Ensure target directories exist
      await mkdir(join(standalonePath, "public"), { recursive: true });
      await mkdir(join(standalonePath, ".next", "static"), { recursive: true });

      // Copy public folder
      await cp(join(cwd, "public"), join(standalonePath, "public"), {
        recursive: true,
      });
      console.log("✓ Public assets copied to standalone");

      // Copy static folder
      await cp(
        join(cwd, ".next", "static"),
        join(standalonePath, ".next", "static"),
        {
          recursive: true,
        }
      );
      console.log("✓ Static CSS/JS chunks copied to standalone");
    }
  } catch (error) {
    console.error("✗ Post-build script failed:", error);
    process.exit(1);
  }
}

afterBuild();
