// export function messageForUser(parent, messageType, message) {
//   const container = document.querySelector(parent)

//   if (container) {
//     container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`
//   } else {
//     console.error(`No element found with the selector "${parent}"`)
//   }
// }
export function messageForUser(parent, messageType, message, duration = 3000) {
  const container = document.querySelector(parent);

  if (container) {
    container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`;

    // Automatically clear the message after the specified duration (default is 3000ms or 3 seconds)
    setTimeout(() => {
      container.innerHTML = ""; // Clears the message after the duration
    }, duration);
  } else {
    console.error(`No element found with the selector "${parent}"`);
  }
}
