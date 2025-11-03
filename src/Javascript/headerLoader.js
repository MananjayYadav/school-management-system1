// ===============================
// HEADER LOADER (WORKS ON ALL PAGES)
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (!headerPlaceholder) {
    console.error("❌ header-placeholder element not found.");
    return;
  }

  // Step 1: Load the header HTML
  fetch("/src/html/header.html")
    .then((response) => {
      if (!response.ok) throw new Error("❌ Failed to load header HTML");
      return response.text();
    })
    .then((html) => {
      headerPlaceholder.innerHTML = html;

      // Step 2: Ensure Bootstrap CSS + JS are loaded before initializing dropdowns
      loadBootstrapAssets()
        .then(() => {
          initDropdowns(); // initialize dropdowns after Bootstrap is ready
          console.log("✅ Header and dropdowns initialized successfully");
        })
        .catch((err) => console.error("Bootstrap load error:", err));
    })
    .catch((err) => console.error("Header load error:", err));
});

// ===============================
// Load Bootstrap CSS and JS if missing
// ===============================
function loadBootstrapAssets() {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (window.bootstrap) {
      resolve();
      return;
    }

    // --- Load Bootstrap CSS ---
    const cssId = "bootstrap-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
      link.integrity =
        "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }

    // --- Load Bootstrap JS Bundle ---
    const jsId = "bootstrap-js";
    if (document.getElementById(jsId)) {
      // If script tag already exists, wait for it to finish loading
      const existingScript = document.getElementById(jsId);
      if (existingScript.dataset.loaded === "true") resolve();
      else existingScript.addEventListener("load", resolve);
      return;
    }

    const script = document.createElement("script");
    script.id = jsId;
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    script.integrity =
      "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// ===============================
// Initialize Bootstrap dropdowns safely
// ===============================
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    // Attach Bootstrap dropdown object
    new bootstrap.Dropdown(toggle);

    // Optional: Add hover support for desktop
    toggle.addEventListener("mouseenter", (e) => {
      if (window.innerWidth > 991) {
        const dropdown = bootstrap.Dropdown.getInstance(e.target);
        dropdown.show();
      }
    });

    const parentDropdown = toggle.closest(".dropdown");
    if (parentDropdown) {
      parentDropdown.addEventListener("mouseleave", (e) => {
        if (window.innerWidth > 991) {
          const dropdown = bootstrap.Dropdown.getInstance(
            e.currentTarget.querySelector(".dropdown-toggle")
          );
          dropdown.hide();
        }
      });
    }
  });
}
