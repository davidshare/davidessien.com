import markdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";
import {cache} from "react";

// Lazy-initialize Markdown engine with Shiki for syntax highlighting
const getMarkdownEngine = cache(async () => {
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  // Add Shiki for syntax highlighting
  md.use(
    await Shiki({
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    })
  );

  return md;
});

// Render cache to avoid repeated processing
const renderCache = new Map<string, string>();

/**
 * Converts markdown content to HTML.
 * Uses Shiki + markdown-it.
 */
export async function renderMarkdown(content: string): Promise<string> {
  if (renderCache.has(content)) {
    return renderCache.get(content)!;
  }

  const engine = await getMarkdownEngine();
  const html = engine.render(content);
  renderCache.set(content, html);

  return html;
}
