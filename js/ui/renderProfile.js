export function renderProfile(profile) {
  const profileContainer = document.querySelector("#profileContainer");

  // Set user details
  const avatarImg = profileContainer.querySelector(".img-fluid.rounded-circle");
  avatarImg.src = profile.avatar?.url || "../images/user.png";
  avatarImg.alt = profile.avatar?.alt || "User avatar";
  avatarImg.classList.add("img-fluid", "rounded-circle", "mx-auto", "d-block");
  avatarImg.style.width = "200px";
  avatarImg.style.height = "200px";

  profileContainer.querySelector(".card-title").innerText = profile.name || "Unknown User";
  profileContainer.querySelector(".card-text").innerText = `${profile.credits} credits`;
  profileContainer.querySelector(".bio-text").innerText = profile.bio || "No bio available.";
}
