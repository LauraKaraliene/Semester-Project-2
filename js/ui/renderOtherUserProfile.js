export function renderOtherUserProfile(profile) {
  const profileContainer = document.querySelector("#profileContainer");

  if (!profileContainer) {
    console.error("Profile container not found.");
    return;
  }

  // Rendering avatar, name, credits, bio for other user
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
    bioText.classList.add("text-muted");
  }

  // change title of the page
  document.title = `Profile | ${profile.name} | BidNest`;
}
