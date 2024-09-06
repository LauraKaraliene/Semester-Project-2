export function handleScrollButton() {
  const scrollTopButton = document.getElementById("scrollTopButton");

  if (scrollTopButton) {
    console.log("Scroll to Top button found");
    window.addEventListener("scroll", function () {
      if (document.documentElement.scrollTop > 300) {
        scrollTopButton.classList.add("show");
      } else {
        scrollTopButton.classList.remove("show");
      }
    });

    scrollTopButton.addEventListener("click", function () {
      document.body.scrollIntoView({ behavior: "smooth" });
    });
  } else {
    console.log("Scroll to Top button not found");
  }
}
