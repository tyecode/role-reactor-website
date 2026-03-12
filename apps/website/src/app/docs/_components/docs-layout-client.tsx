"use client";

import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { SidebarSeparator } from "fumadocs-ui/components/layout/sidebar";
import { AdBlock } from "@/components/adsense/ad-block";
import type { ReactNode } from "react";
import type { PageTree } from "fumadocs-core/server";

interface DocsLayoutClientProps {
  tree: PageTree.Root | PageTree.Node[];
  nav: DocsLayoutProps["nav"];
  links: DocsLayoutProps["links"];
  children: ReactNode;
}

export function DocsLayoutClient({ tree, nav, links, children }: DocsLayoutClientProps) {
  // Augment the tree to include a special separator for the ad
  let augmentedTree: PageTree.Root | PageTree.Node[];

  if (Array.isArray(tree)) {
    augmentedTree = [...tree, { type: "separator", name: "SIDEBAR_AD" }];
  } else {
    augmentedTree = {
      ...tree,
      children: [
        ...(tree.children || []),
        { type: "separator", name: "SIDEBAR_AD" },
      ],
    };
  }

  return (
    <DocsLayout
      tree={augmentedTree as PageTree.Root}
      sidebar={{
        prefetch: false,
        components: {
          Separator: ({ item }) => {
            if (item.name === "SIDEBAR_AD") {
              return (
                <div className="px-3 py-4 mt-4 border-t border-white/5">
                  <AdBlock
                    slot="docs_sidebar_scroll"
                    variant="sidebar"
                    className="border-white/5 hover:border-cyan-500/20 transition-colors shadow-2xl"
                  />
                </div>
              );
            }
            return <SidebarSeparator>{item.name}</SidebarSeparator>;
          },
        },
      }}
      nav={nav}
      links={links}
    >
      {children}
    </DocsLayout>
  );
}
