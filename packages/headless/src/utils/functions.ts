// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function debounce<A extends any[]>(delay: number, apply: (...args: A) => void) {
  let timer: number | undefined;
  return (...args: A) => {
    clearTimeout(timer);
    // @ts-expect-error
    timer = setTimeout(() => apply(...args), delay);
  };
}
