export function getParams(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  if (!paramValue) {
    return null;
  }
  return paramValue;
}
