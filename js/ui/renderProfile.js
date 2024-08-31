// import { getUserName } from "../utils/helpers/getUserName.js";

// export function renderProfile(profile) {
//   const profileContainer = document.querySelector("#profileContainer");

//   // Check if the profileContainer exists
//   if (!profileContainer) {
//     console.warn("Profile container not found.");
//     return;
//   }

//   // Set user details
//   const avatarImg = profileContainer.querySelector(".img-fluid.rounded-circle");
//   if (avatarImg) {
//     avatarImg.src = profile.avatar?.url || "../images/user.png";
//     avatarImg.alt = profile.avatar?.alt || "User avatar";
//     avatarImg.style.width = "200px";
//     avatarImg.style.height = "200px";
//   } else {
//     console.warn("Avatar image element not found.");
//   }

//   const cardTitle = profileContainer.querySelector(".card-title");
//   if (cardTitle) {
//     cardTitle.innerText = profile.name || "Unknown User";
//   } else {
//     console.warn("Card title element not found.");
//   }

//   const cardText = profileContainer.querySelector(".card-text");
//   if (cardText) {
//     cardText.innerText = `${profile.credits} credits`;
//   } else {
//     console.warn("Card text element not found.");
//   }

//   const bioText = profileContainer.querySelector(".bio-text");
//   if (bioText) {
//     bioText.innerText = profile.bio || "No bio available.";
//   } else {
//     console.warn("Bio text element not found.");
//   }

//   // Only display edit and new listing buttons if this is the logged-in user's profile
//   const loggedInUserName = getUserName();
//   if (profile.name === loggedInUserName) {
//     const buttonContainer = profileContainer.querySelector(".d-flex.justify-content-start.col-md-6");
//     if (buttonContainer) {
//       buttonContainer.innerHTML = `
//         <button class="btn border-primary border-1 my-1 text-primary" id="editProfileButton">Edit profile</button>
//         <button class="btn btn-primary text-light my-1" id="newListingButton">+ New Listing</button>
//       `;

//       const editProfileButton = document.getElementById("editProfileButton");
//       const newListingButton = document.getElementById("newListingButton");

//       if (editProfileButton) {
//         editProfileButton.addEventListener("click", function () {
//           // Logic for editing the profile, e.g., opening a modal
//           const editProfileModal = new bootstrap.Modal(document.getElementById("editProfileModal"));
//           editProfileModal.show();
//         });
//       } else {
//         console.warn("Edit profile button not found.");
//       }

//       if (newListingButton) {
//         newListingButton.addEventListener("click", function () {
//           window.location.href = "/profile/add-listing.html";
//         });
//       } else {
//         console.warn("New listing button not found.");
//       }
//     } else {
//       console.warn("Button container not found.");
//     }
//   }
// }

// export function renderProfile(profile) {
//   const profileContainer = document.querySelector("#profileContainer");

//   if (!profileContainer) {
//     console.error("Profile container not found.");
//     return;
//   }

//   // Avatar
//   const avatarImg = profileContainer.querySelector(".img-fluid.rounded-circle");
//   if (avatarImg) {
//     avatarImg.src = profile.avatar?.url || "../images/user.png";
//     avatarImg.alt = profile.avatar?.alt || "User avatar";
//   } else {
//     console.warn("Avatar image element not found.");
//   }

//   // Card title
//   const cardTitle = profileContainer.querySelector(".card-title");
//   if (cardTitle) {
//     cardTitle.innerText = profile.name || "Unknown User";
//   } else {
//     console.warn("Card title element not found.");
//   }

//   // Card text (credits)
//   const cardText = profileContainer.querySelector(".card-text");
//   if (cardText) {
//     cardText.innerText = `${profile.credits} credits`;
//   } else {
//     console.warn("Card text element not found.");
//   }

//   // Bio text
//   const bioText = profileContainer.querySelector(".bio-text");
//   if (bioText) {
//     bioText.innerText = profile.bio || "No bio available.";
//   } else {
//     console.warn("Bio text element not found.");
//   }

//   // Button container (for edit profile and add new listing)
//   const buttonContainer = profileContainer.querySelector(".d-flex.flex-column.justify-content-start.col-md-6");
//   if (buttonContainer) {
//     // Edit profile button
//     const editProfileButton = buttonContainer.querySelector(".btn.text-primary");
//     if (editProfileButton) {
//       editProfileButton.addEventListener("click", () => {
//         // Add logic for edit profile button click if necessary
//         console.log("Edit profile button clicked");
//       });
//     } else {
//       console.warn("Edit profile button not found.");
//     }

//     // New listing button
//     const newListingButton = buttonContainer.querySelector("#newListingButton");
//     if (newListingButton) {
//       newListingButton.addEventListener("click", () => {
//         window.location.href = "/profile/add-listing.html";
//       });
//     } else {
//       console.warn("New listing button not found.");
//     }
//   } else {
//     console.warn("Button container not found.");
//   }
// }

// export function renderProfile(profile) {
//   const profileContainer = document.querySelector("#profileContainer");

//   if (!profileContainer) {
//     console.error("Profile container not found.");
//     return;
//   }

//   // Debugging - Check for the avatar image
//   const avatarImg = profileContainer.querySelector(".img-fluid.rounded-circle");
//   if (avatarImg) {
//     avatarImg.src = profile.avatar?.url || "../images/user.png";
//     avatarImg.alt = profile.avatar?.alt || "User avatar";
//     avatarImg.classList.add("img-fluid", "rounded-circle", "mx-auto", "d-block");
//     avatarImg.style.width = "200px";
//     avatarImg.style.height = "200px";
//   } else {
//     console.warn("Avatar image element not found.");
//   }

//   // Debugging - Check for the card title (user name)
//   const cardTitle = profileContainer.querySelector(".card-title");
//   if (cardTitle) {
//     cardTitle.innerText = profile.name || "Unknown User";
//   } else {
//     console.warn("Card title element (user name) not found.");
//   }

//   // Debugging - Check for the card text (credits)
//   const cardText = profileContainer.querySelector(".card-text");
//   if (cardText) {
//     cardText.innerText = `${profile.credits} credits`;
//   } else {
//     console.warn("Card text element (credits) not found.");
//   }

//   // Debugging - Check for the bio text
//   const bioText = profileContainer.querySelector(".bio-text");
//   if (bioText) {
//     bioText.innerText = profile.bio || "No bio available.";
//   } else {
//     console.warn("Bio text element not found.");
//   }

//   // Add buttons for editing and new auction if the user is viewing their own profile
//   const buttonContainer = profileContainer.querySelector(".d-flex");
//   if (buttonContainer) {
//     const editProfileButton = document.createElement("button");
//     editProfileButton.classList.add("btn", "border-primary", "border-1", "my-1", "text-primary");
//     editProfileButton.innerText = "Edit profile";

//     const newListingButton = document.createElement("button");
//     newListingButton.classList.add("btn", "btn-primary", "text-light", "my-1");
//     newListingButton.innerText = "+ New Auction";

//     buttonContainer.appendChild(editProfileButton);
//     buttonContainer.appendChild(newListingButton);
//   } else {
//     console.warn("Button container not found.");
//   }
// }

export function renderProfile(profile) {
  const profileContainer = document.querySelector("#profileContainer");

  if (!profileContainer) {
    console.error("Profile container not found.");
    return;
  }

  // Rendering avatar, name, credits, bio for logged-in user
  const avatarImg = profileContainer.querySelector(".img-fluid.rounded-circle");
  if (avatarImg) {
    avatarImg.src = profile.avatar?.url || "../images/user.png";
    avatarImg.alt = profile.avatar?.alt || "User avatar";
    avatarImg.style.width = "200px";
    avatarImg.style.height = "200px";
  }

  const cardTitle = profileContainer.querySelector(".card-title");
  if (cardTitle) {
    cardTitle.innerText = profile.name || "Unknown User";
  }

  const cardText = profileContainer.querySelector(".card-text");
  if (cardText) {
    cardText.innerText = `${profile.credits} credits`;
  }

  const bioText = profileContainer.querySelector(".bio-text");
  if (bioText) {
    bioText.innerText = profile.bio || "No bio available.";
  }

  // const buttonContainer = profileContainer.querySelector(".d-flex");
  // if (buttonContainer) {
  //   const editProfileButton = document.createElement("button");
  //   editProfileButton.classList.add("btn", "border-primary", "border-1", "my-1", "text-primary");
  //   editProfileButton.innerText = "Edit profile";

  //   const newListingButton = document.createElement("button");
  //   newListingButton.classList.add("btn", "btn-primary", "text-light", "my-1");
  //   newListingButton.innerText = "+ New Auction";

  //   buttonContainer.appendChild(editProfileButton);
  //   buttonContainer.appendChild(newListingButton);
  // }
}
