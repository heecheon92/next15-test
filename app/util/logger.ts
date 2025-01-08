export function log(...args: Parameters<typeof console.log>) {
  console.log("test", ...args);
}