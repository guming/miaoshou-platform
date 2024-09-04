export default function Page() {
  return (
    // biome-ignore lint/a11y/useIframeTitle: <explanation>
    // biome-ignore lint/style/useSelfClosingElements: <explanation>
    <iframe
      src="https://jupyterlite.github.io/demo/repl/index.html?kernel=python&toolbar=1&theme=JupyterLab Dark"
      width="100%"
      height="100%"
    ></iframe>
  );
}
