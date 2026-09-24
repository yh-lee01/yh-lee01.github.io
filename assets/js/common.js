$(document).ready(function () {
  // Keep disclosure styling and accessible state in sync, including keyboard clicks.
  $("a.abstract, button.abstract, a.award, a.bibtex, button.bibtex").on("click", function () {
    const entry = $(this).closest(".row");
    const kind = ["abstract", "award", "bibtex"].find((name) => $(this).hasClass(name));
    const target = entry.find(`.${kind}.hidden`);
    entry.find(".abstract.hidden, .award.hidden, .bibtex.hidden").not(target).removeClass("open");
    target.toggleClass("open");
    entry.find(".links [aria-controls]").each(function () {
      const panel = document.getElementById(this.getAttribute("aria-controls"));
      this.setAttribute("aria-expanded", panel && panel.classList.contains("open") ? "true" : "false");
    });
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
