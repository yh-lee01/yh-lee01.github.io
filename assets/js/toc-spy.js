// Marks the Distill contents entry for the section currently being read.
(() => {
  const links = [...document.querySelectorAll("d-contents nav a[href^='#']")];
  if (!links.length) return;

  const sections = links
    .map((link) => ({ link, heading: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
    .filter((s) => s.heading);
  if (!sections.length) return;

  // A section becomes current once its heading passes the upper quarter of the viewport
  // (never higher than just below the fixed navbar, where linked headings land).
  const activationLine = () => Math.max((document.getElementById("navbar")?.offsetHeight || 56) + 48, window.innerHeight * 0.25);
  let current = null;

  const setCurrent = (link) => {
    if (link === current) return;
    current?.classList.remove("is-active");
    current?.removeAttribute("aria-current");
    link?.classList.add("is-active");
    link?.setAttribute("aria-current", "location");
    current = link;
  };

  const update = () => {
    const line = activationLine();
    let active = null;
    for (const { link, heading } of sections) {
      if (heading.getBoundingClientRect().top - line <= 0) active = link;
      else break;
    }
    // At the very bottom the last short section may never reach the line.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) active = sections[sections.length - 1].link;
    setCurrent(active);
  };

  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
