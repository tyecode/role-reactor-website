import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { ConditionalAdBlock } from "@/components/propellerads";
import { links } from "@/constants/links";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const pageData = page.data as unknown as Record<string, unknown>;
  const MDXContent = pageData.body as React.ComponentType<
    Record<string, unknown>
  >;

  return (
    <DocsPage toc={pageData.toc as never} full={pageData.full as boolean}>
      <DocsTitle>{pageData.title as string}</DocsTitle>
      <DocsDescription>{pageData.description as string}</DocsDescription>
      <DocsBody>
        <MDXContent components={getMDXComponents({})} />
        <div className="mt-16 border-t border-white/5 pt-12">
          <ConditionalAdBlock
            zoneId={process.env.NEXT_PUBLIC_PROPELLERADS_DOCS_ZONE || ""}
          />
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || links.home;
  const url = `${baseUrl}${page.url}`;

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: `${page.data.title} | Role Reactor`,
      description: page.data.description,
      type: "article",
      locale: "en_US",
      url,
      siteName: "Role Reactor",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.data.title} | Role Reactor`,
      description: page.data.description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
