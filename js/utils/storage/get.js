export function get(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
}
