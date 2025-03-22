import type { CodapiSnippet } from "@antonz/codapi";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "codapi-snippet": React.DetailedHTMLProps<React.HTMLAttributes<CodapiSnippet>, CodapiSnippet>;
    }
  }
}
