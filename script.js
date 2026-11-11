"use strict";
document.documentElement.classList.add("js");
const tiers = {
  single: { annual: 79, lifetime: 149, licenses: "1" },
  five: { annual: 129, lifetime: 249, licenses: "5" },
  unlimited: { annual: 199, lifetime: 399, licenses: "unlimited" },
};
document.querySelectorAll("[data-billing]").forEach((button) => {
  button.addEventListener("click", () => {
    const cycle = button.dataset.billing;
    document
      .querySelectorAll("[data-billing]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    document.querySelectorAll("[data-tier]").forEach((card) => {
      const tier = tiers[card.dataset.tier];
      card.querySelector("[data-price]").textContent = "$" + tier[cycle];
      card.querySelector("[data-period]").textContent =
        cycle === "annual" ? " / year" : " one-time";
      card.querySelector("[data-billing-description]").textContent =
        cycle === "annual" ? "Billed annually." : "One-time lifetime purchase.";
      card.querySelector(".checkout-link").href =
        "https://checkout.freemius.com/plugin/31874/plan/52318/licenses/" +
        tier.licenses +
        "/?billing_cycle=" +
        cycle;
    });
  });
});
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("open", open);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-wrap")) closeMenu();
});

document.querySelectorAll("[data-demo-scene]").forEach((button) => {
  button.addEventListener("click", () => {
    const path = "assets/demo/" + button.dataset.image + ".webp";
    const screenshot = document.querySelector("#demo-screenshot");
    screenshot.width = button.dataset.image === "client-review" ? 1425 : 1600;
    screenshot.height = 1000;
    screenshot.src = path;
    screenshot.alt = button.dataset.alt;
    document.querySelector("#demo-fullsize").href = path;
    const enlargeLink = document.querySelector("#demo-enlarge");
    if (enlargeLink) enlargeLink.href = path;
    document.querySelector("#demo-description").textContent =
      button.dataset.description;
    document
      .querySelectorAll("[data-demo-scene]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
  });
});

const demoLightbox = document.querySelector("#demo-lightbox");
const demoVideo = document.querySelector("#demo-modal-video");
const demoModalImage = document.querySelector("#demo-modal-image");
let demoTrigger = null;
function openDemo(event, videoMode) {
  if (!demoLightbox || typeof demoLightbox.showModal !== "function") return;
  event.preventDefault();
  demoTrigger = event.currentTarget;
  demoModalImage.hidden = videoMode;
  demoVideo.hidden = !videoMode;
  document.querySelector("#demo-lightbox-title").textContent = videoMode
    ? "Previu · 18-second walkthrough"
    : "Previu · Product screenshot";
  if (!videoMode) {
    const source = document.querySelector("#demo-screenshot");
    demoModalImage.src = source.src;
    demoModalImage.alt = source.alt;
  }
  demoLightbox.showModal();
  document.body.classList.add("demo-modal-open");
}
document
  .querySelectorAll("[data-demo-expand]")
  .forEach((link) =>
    link.addEventListener("click", (event) => openDemo(event, false)),
  );
document
  .querySelectorAll("[data-demo-video]")
  .forEach((link) =>
    link.addEventListener("click", (event) => openDemo(event, true)),
  );
document
  .querySelector("[data-demo-close]")
  .addEventListener("click", () => demoLightbox.close());
demoLightbox.addEventListener("click", (event) => {
  if (event.target !== demoLightbox) return;
  const rect = demoLightbox.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    demoLightbox.close();
});
demoLightbox.addEventListener("close", () => {
  demoVideo.pause();
  document.body.classList.remove("demo-modal-open");
  if (demoTrigger) demoTrigger.focus();
});
