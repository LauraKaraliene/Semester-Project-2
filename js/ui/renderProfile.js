export function renderProfile(profile) {
  const profileContainer = document.querySelector("#profileContainer");

  // Set user details
  const avatarImg = profileContainer.querySelector(".img-fluid.rounded-circle");
  avatarImg.src = profile.avatar?.url || "../images/user.png";
  avatarImg.alt = profile.avatar?.alt || "User avatar";

  profileContainer.querySelector(".card-title").innerText = profile.name || "Unknown User";
  profileContainer.querySelector(".card-text").innerText = `${profile.credits} credits`;
  profileContainer.querySelector(".bio-text").innerText = profile.bio || "No bio available.";

  console.log("Avatar URL:", profile.avatar?.url);
  console.log("Avatar Alt Text:", profile.avatar?.alt);

  // Here you can also call functions to render listings, wins, etc.
}
