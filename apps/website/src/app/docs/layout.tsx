import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { docsOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tree={source.pageTree as any}
      sidebar={{ prefetch: false }}
      nav={docsOptions.nav}
      links={docsOptions.links}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ children } as any)}
    />
  );
}
