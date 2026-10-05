/* eryanto.dev — progressive enhancement only.
   Every feature here degrades to a working page with JS disabled. */
(function () {
  "use strict";

  var each = function (list, fn) {
    Array.prototype.forEach.call(list, fn);
  };

  /* ---- 1. Command palette (⌘K / Ctrl+K, and the mobile menu) ---------- */
  var dlg = document.getElementById("palette");
  var openers = document.querySelectorAll("[data-palette-open]");
  var lastFocus = null;

  function paletteLinks() {
    if (!dlg) return [];
    return Array.prototype.filter.call(
      dlg.querySelectorAll(".palette-body a"),
      function (a) {
        return !a.closest("[hidden]");
      },
    );
  }

  // From the burger the first link takes focus, not the search field — a
  // focused input on a phone throws the keyboard over the menu. showModal()
  // honours `autofocus`, so the target is marked before the dialog opens.
  function openPalette(fromMenu) {
    if (!dlg || dlg.open) return;
    lastFocus = document.activeElement;
    var q = dlg.querySelector("input");
    if (q) {
      q.value = "";
      filterPalette("");
    }
    var target = fromMenu ? paletteLinks()[0] : q;
    each(dlg.querySelectorAll("[autofocus]"), function (el) {
      el.removeAttribute("autofocus");
    });
    if (target) target.setAttribute("autofocus", "");
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", "");
    if (target && document.activeElement !== target) target.focus();
  }
  function closePalette() {
    if (!dlg || !dlg.open) return;
    if (typeof dlg.close === "function") dlg.close();
    else dlg.removeAttribute("open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  each(openers, function (b) {
    b.addEventListener("click", function () {
      openPalette(false);
    });
  });

  if (dlg) {
    // click on the backdrop area closes; so does following a link — a
    // same-page anchor (projects.html#p-…) would otherwise leave it open
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) closePalette();
      else if (e.target.closest && e.target.closest("a")) {
        lastFocus = null;
        closePalette();
      }
    });
    dlg.addEventListener("cancel", function (e) {
      e.preventDefault();
      closePalette();
    });

    var input = dlg.querySelector("input");
    if (input) {
      input.addEventListener("input", function () {
        filterPalette(input.value);
      });
    }
  }

  // Hides non-matching items, then any section heading left with nothing
  // under it, and shows the "no match" line when everything is gone.
  function filterPalette(term) {
    if (!dlg) return;
    var t = term.trim().toLowerCase();
    var any = false;
    each(dlg.querySelectorAll(".palette-body ul"), function (ul) {
      var shown = 0;
      each(ul.querySelectorAll("li"), function (li) {
        li.hidden = t !== "" && li.textContent.toLowerCase().indexOf(t) === -1;
        if (!li.hidden) shown++;
      });
      ul.hidden = shown === 0;
      var head = ul.previousElementSibling;
      if (head && head.tagName === "P") head.hidden = shown === 0;
      if (shown) any = true;
    });
    var empty = dlg.querySelector("[data-palette-empty]");
    if (empty) empty.hidden = any;
  }

  // ↑↓ walk the visible links (the search field sits above the first one);
  // ⏎ in the search field opens the first match.
  function paletteKeys(e) {
    var links = paletteLinks();
    var q = dlg.querySelector("input");
    var i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!links.length) return;
      e.preventDefault();
      var down = e.key === "ArrowDown";
      if (i === -1) {
        (down ? links[0] : links[links.length - 1]).focus();
      } else if (!down && i === 0 && q) {
        q.focus();
      } else {
        links[(i + (down ? 1 : -1) + links.length) % links.length].focus();
      }
    } else if (e.key === "Enter" && document.activeElement === q && links[0]) {
      e.preventDefault();
      links[0].click();
    }
  }

  document.addEventListener("keydown", function (e) {
    var tag = ((e.target && e.target.tagName) || "").toLowerCase();
    var typing =
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      (e.target && e.target.isContentEditable);
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      dlg && dlg.open ? closePalette() : openPalette(false);
      return;
    }
    if (dlg && dlg.open) {
      paletteKeys(e);
      return;
    }
    if (e.key === "Escape" && !typing) closePalette();
  });

  /* ---- 2. Mobile menu: reuses the palette, no separate drawer --------- */
  var burger = document.querySelector("[data-menu]");
  if (burger)
    burger.addEventListener("click", function () {
      openPalette(true);
    });

  /* ---- 3. Project filters — accessible, kept in the URL hash ---------- */
  // #kasir filters to that business type, so a filtered list can be shared
  // over WhatsApp and Back restores the previous filter. Any other hash
  // (a card anchor such as #p-kasir-offline) shows everything and lets the browser
  // scroll to it.
  var chips = document.querySelectorAll("[data-filter]");
  var items = document.querySelectorAll("[data-cat]");
  var countEl = document.querySelector("[data-count-label]");
  var emptyEl = document.querySelector("[data-empty]");

  if (chips.length && items.length) {
    var valid = {};
    each(chips, function (c) {
      valid[c.getAttribute("data-filter")] = true;
    });
    var format =
      (countEl && countEl.getAttribute("data-format")) || "{n} / {total}";

    var apply = function (want) {
      if (!valid[want]) want = "all";
      each(chips, function (c) {
        c.setAttribute(
          "aria-pressed",
          String(c.getAttribute("data-filter") === want),
        );
      });
      var shown = 0;
      each(items, function (item) {
        var hit = want === "all" || item.getAttribute("data-cat") === want;
        item.hidden = !hit;
        if (hit) shown++;
      });
      if (countEl)
        countEl.textContent = format
          .replace("{n}", shown)
          .replace("{total}", items.length);
      if (emptyEl) emptyEl.hidden = shown !== 0;
    };
    var fromHash = function () {
      return decodeURIComponent(location.hash.slice(1));
    };

    each(chips, function (chip) {
      chip.addEventListener("click", function () {
        var want = chip.getAttribute("data-filter");
        if (want === "all") {
          if (location.hash)
            history.pushState(null, "", location.pathname + location.search);
          apply("all");
        } else {
          location.hash = want; // fires hashchange → apply
        }
      });
    });
    window.addEventListener("hashchange", function () {
      apply(fromHash());
    });
    apply(fromHash());
  }

  /* ---- Image preview for .gallery images ------------------------------ */
  (function () {
    var groups = document.querySelectorAll(".gallery");
    if (!groups.length || !window.HTMLDialogElement) return;

    var en = document.documentElement.lang === "en";
    var t = en
      ? { close: "Close", prev: "Previous", next: "Next" }
      : { close: "Tutup", prev: "Sebelumnya", next: "Berikutnya" };

    var box = document.createElement("dialog");
    box.className = "preview";
    box.setAttribute("aria-label", en ? "Image preview" : "Pratinjau gambar");
    box.innerHTML =
      '<button type="button" class="pv-close" aria-label="' + t.close + '">✕</button>' +
      '<button type="button" class="pv-nav pv-prev" aria-label="' + t.prev + '">‹</button>' +
      '<figure><img alt="" /><figcaption></figcaption></figure>' +
      '<button type="button" class="pv-nav pv-next" aria-label="' + t.next + '">›</button>';
    document.body.appendChild(box);

    var img = box.querySelector("img");
    var cap = box.querySelector("figcaption");
    var items = [];
    var at = 0;
    var opener = null;

    function show(i) {
      at = (i + items.length) % items.length;
      var src = items[at];
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      // never upscale past the file's own resolution
      // (lazy thumbnails may not be decoded yet, so fall back to the width attribute)
      var w = src.naturalWidth || +src.getAttribute("width") || 0;
      img.style.maxWidth = w ? w + "px" : "";
      cap.textContent = (at + 1) + " / " + items.length + " — " + src.alt;
    }
    function open(group, i) {
      items = Array.prototype.slice.call(group.querySelectorAll("img"));
      opener = items[i];
      box.classList.toggle("single", items.length < 2);
      show(i);
      box.showModal();
      document.documentElement.classList.add("pv-lock");
    }
    function close() {
      box.close();
    }

    each(groups, function (group) {
      each(group.querySelectorAll("img"), function (el, i) {
        el.tabIndex = 0;
        el.setAttribute("role", "button");
        el.style.cursor = "zoom-in";
        el.addEventListener("click", function () {
          open(group, i);
        });
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open(group, i);
          }
        });
      });
    });

    box.querySelector(".pv-close").addEventListener("click", close);
    box.querySelector(".pv-prev").addEventListener("click", function () {
      show(at - 1);
    });
    box.querySelector(".pv-next").addEventListener("click", function () {
      show(at + 1);
    });
    // a click on the dark backdrop lands on the dialog itself
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.tagName === "FIGURE") close();
    });
    box.addEventListener("keydown", function (e) {
      if (items.length < 2) return;
      if (e.key === "ArrowLeft") show(at - 1);
      else if (e.key === "ArrowRight") show(at + 1);
    });
    box.addEventListener("close", function () {
      document.documentElement.classList.remove("pv-lock");
      if (opener) opener.focus();
    });

    var x0 = null;
    box.addEventListener("touchstart", function (e) {
      x0 = e.touches[0].clientX;
    }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null || items.length < 2) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    });
  })();

  /* 404.html resolves its own base in an inline script — nothing to do here. */
})();
