"use client";

import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import type { PageTree } from "fumadocs-core/server";

interface DocsLayoutClientProps {
  tree: PageTree.Root | PageTree.Node[];
  nav: DocsLayoutProps["nav"];
  links: DocsLayoutProps["links"];
  children: ReactNode;
}

export function DocsLayoutClient({
  tree,
  nav,
  links,
  children,
}: DocsLayoutClientProps) {
  return (
    <DocsLayout
      tree={tree as PageTree.Root}
      nav={nav}
      links={links}
    >
      {children}
    </DocsLayout>
  );
}
