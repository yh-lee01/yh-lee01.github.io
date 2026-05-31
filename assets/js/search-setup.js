let searchTheme = determineComputedTheme();
const ninjaKeys = document.querySelector("ninja-keys");

if (searchTheme === "dark") {
  ninjaKeys.classList.add("dark");
} else {
  ninjaKeys.classList.remove("dark");
}

const openSearchModal = () => {
  // collapse navbarNav if expanded on mobile (jQuery-free)
  const nav = document.getElementById("navbarNav");
  if (nav && nav.classList.contains("show")) {
    nav.classList.remove("show");
  }
  ninjaKeys.open();
};
