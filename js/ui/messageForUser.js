export function messageForUser(parent, messageType, message) {
  const container = document.querySelector(parent)

  if (container) {
    container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`
  } else {
    console.error(`No element found with the selector "${parent}"`)
  }
}
