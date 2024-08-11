export function save(key, value) {
  let savedInfo = value;
  if (typeof value !== "string") {
    savedInfo = JSON.stringify(value);
  }
  localStorage.setItem(key, savedInfo);
}
