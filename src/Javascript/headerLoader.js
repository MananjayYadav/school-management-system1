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

      // Step 2: Ensure Bootstrap CSS + JS are loaded
      loadBootstrapAssets()
        .then(() => {
          // Wait for DOM to settle
          setTimeout(() => {
            initDropdowns();
            console.log("✅ Header and dropdowns initialized successfully");
          }, 150);
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
    if (window.bootstrap) {
      resolve();
      return;
    }

    const cssId = "bootstrap-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
      link.integrity = "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }

    const jsId = "bootstrap-js";
    if (document.getElementById(jsId)) {
      const existingScript = document.getElementById(jsId);
      if (existingScript.dataset.loaded === "true") resolve();
      else existingScript.addEventListener("load", resolve);
      return;
    }

    const script = document.createElement("script");
    script.id = jsId;
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    script.integrity = "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
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
// Initialize Bootstrap dropdowns - SIMPLIFIED
// ===============================
function initDropdowns() {
  const dropdownElements = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  
  if (dropdownElements.length === 0) {
    console.warn("⚠️ No dropdown elements found");
    return;
  }

  dropdownElements.forEach((toggle) => {
    try {
      // Initialize Bootstrap dropdown
      new bootstrap.Dropdown(toggle);
      
      const parentDropdown = toggle.closest(".dropdown");
      if (!parentDropdown) return;

      // ONLY add hover for desktop
      if (window.innerWidth > 991) {
        parentDropdown.addEventListener("mouseenter", function () {
          const dropdown = bootstrap.Dropdown.getInstance(toggle);
          if (dropdown) dropdown.show();
        });

        parentDropdown.addEventListener("mouseleave", function () {
          const dropdown = bootstrap.Dropdown.getInstance(toggle);
          if (dropdown) dropdown.hide();
        });
      }
      // Mobile clicks are handled automatically by Bootstrap
      
    } catch (error) {
      console.error("Error initializing dropdown:", error);
    }
  });

  console.log(`✅ Initialized ${dropdownElements.length} dropdown(s)`);
}
