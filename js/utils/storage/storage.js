export * from "./get.js";
export * from "./remove.js";
export * from "./save.js";

export function removeMultiple(keys) {
  keys.forEach((key) => localStorage.removeItem(key));
}
