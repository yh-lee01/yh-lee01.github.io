// Adds a "#" link after each section heading in long-form posts.
// Clicking it jumps to the section and copies its URL, for sharing a specific part.
(() => {
  const headings = document.querySelectorAll("d-article h2[id], d-article h3[id], .reading-page article h2[id], .reading-page article h3[id]");
  headings.forEach((heading) => {
    const anchor = document.createElement("a");
    anchor.className = "heading-anchor";
    anchor.href = "#" + heading.id;
    anchor.textContent = "#";
    anchor.setAttribute("aria-label", "Copy link to “" + heading.textContent.trim() + "”");
    anchor.title = "Copy link to this section";
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      history.replaceState(null, "", anchor.hash);
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(() => {
          anchor.classList.add("is-copied");
          anchor.textContent = "Copied";
          setTimeout(() => {
            anchor.classList.remove("is-copied");
            anchor.textContent = "#";
          }, 1500);
        });
      }
    });
    heading.append(anchor);
  });
})();
