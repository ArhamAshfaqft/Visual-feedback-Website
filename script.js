// Pricing Toggle Config
const checkoutConfig = {
  pluginId: "31874",
  planId: "52318",
  tiers: {
    single: {
      label: "Single Site",
      pricingId: "68634",
      annual: 79,
      lifetime: 149
    },
    five: {
      label: "5 Sites",
      pricingId: "68636",
      annual: 129,
      lifetime: 249
    },
    unlimited: {
      label: "Unlimited Sites",
      pricingId: "68637",
      annual: 199,
      lifetime: 399
    }
  }
};

let activeBilling = "annual";

const formatPrice = (amount) => `$${amount}`;

function checkoutUrl(tierKey) {
  const billingCycle = activeBilling === "lifetime" ? "lifetime" : "annual";
  const licenseCount = tierKey === "single" ? "1" : tierKey === "five" ? "5" : "unlimited";

  return `https://checkout.freemius.com/plugin/${checkoutConfig.pluginId}/plan/${checkoutConfig.planId}/licenses/${licenseCount}/?billing_cycle=${billingCycle}`;
}

function updatePricing() {
  document.querySelectorAll(".price-card").forEach((card) => {
    const tierKey = card.dataset.tier;
    if (tierKey === "free") return;

    const tier = checkoutConfig.tiers[tierKey];
    const price = tier[activeBilling];

    card.querySelector("[data-price]").textContent = formatPrice(price);
    card.querySelector("[data-period]").textContent = activeBilling === "annual" ? "/year" : " lifetime";
    card.querySelector(".checkout-link").href = checkoutUrl(tierKey);
  });
}

// Pricing Toggle Events
document.querySelectorAll("[data-billing]").forEach((button) => {
  button.addEventListener("click", () => {
    activeBilling = button.dataset.billing;
    document.querySelectorAll("[data-billing]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    updatePricing();
  });
});

// Interactive Feature Tabs (ElementsKit-style)
document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Set active button
    document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show active tab content
    const targetTab = button.dataset.tab;
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(`tab-${targetTab}`).classList.add("active");
  });
});

// Run Initial Price Updates
updatePricing();

// Mobile Menu Toggle
const menuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    // Prevent scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}
