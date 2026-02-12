import { CodeBlock } from "@/components/ui/code-block";

import { readCodeFile } from "@/lib/code-reader";

export default async function CodeBlockShowcase() {
  // Read actual project files
  const codeBlockSource = await readCodeFile(
    "src/components/ui/code-block.tsx"
  );
  await readCodeFile("src/components/ui/card.tsx");
  const pageSource = await readCodeFile(
    "src/app/dashboard/test/code-block/page.tsx"
  );
  const packageJson = await readCodeFile("package.json");

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">CodeBlock Component</h1>
        <p className="text-zinc-400 text-lg">
          A cyberpunk-themed code block component with scanlines, corner
          accents, and interactive features.
        </p>
      </div>

      {/* Dedent Example */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Smart Dedent</h2>
          <p className="text-zinc-400 text-sm">
            The component automatically removes common leading whitespace from
            indented template literals.
          </p>
        </div>
        <CodeBlock
          title="Indented Code"
          code={`
            function indented() {
              // This code was written with indentation
              // in the source file, but it renders
              // aligned to the left!
              return "It works!";
            }
          `}
          language="typescript"
        />
      </section>

      {/* Live Source Code Example */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Auto-Loaded Source Code
          </h2>
          <p className="text-zinc-400 text-sm">
            Instead of manually pasting code, you can read files directly from
            the project using <code>readCodeFile</code>. Here is the source code
            of the <strong>CodeBlock</strong> component itself!
          </p>
        </div>
        <CodeBlock
          title="src/components/ui/code-block.tsx"
          code={codeBlockSource}
          language="tsx"
          showLineNumbers
          collapsible
          defaultExpanded={false}
        />
      </section>

      {/* Configuration Example */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Configuration Files
          </h2>
          <p className="text-zinc-400 text-sm">
            Perfect for displaying config files like <code>package.json</code>
          </p>
        </div>
        <CodeBlock
          title="package.json"
          showLineNumbers
          code={packageJson}
          language="json"
          collapsible
          defaultExpanded={false}
        />
      </section>

      {/* Usage Documentation */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Self-Documentation
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            This page is rendering its own source code below:
          </p>
        </div>

        <CodeBlock
          title="src/app/dashboard/test/code-block/page.tsx"
          showLineNumbers
          code={pageSource}
          language="tsx"
          collapsible
          defaultExpanded={false}
        />
      </section>
    </div>
  );
}
