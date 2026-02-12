import fs from "fs";
import path from "path";

/**
 * Reads a file from the project directory and returns its content.
 * @param filePath Path relative to the project root (e.g., "src/components/ui/button.tsx")
 * @returns The content of the file
 */
export async function readCodeFile(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.promises.readFile(fullPath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return `// Error reading file: ${filePath}\n// ${(error as Error).message}`;
  }
}
