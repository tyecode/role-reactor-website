import type { ReactNode } from "react";
import { docsOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { DocsLayoutClient } from "./_components/docs-layout-client";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayoutClient
      tree={source.getPageTree()}
      nav={docsOptions.nav}
      links={docsOptions.links}
    >
      {children}
    </DocsLayoutClient>
  );
}
