export function messageForUser(parent, messageType, message, duration = 3000) {
  const container = document.querySelector(parent);

  if (container) {
    container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`;

    setTimeout(() => {
      container.innerHTML = "";
    }, duration);
  } else {
    console.error(`No element found with the selector "${parent}"`);
  }
}
