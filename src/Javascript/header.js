// Enable dropdown on hover (desktop) and click (mobile)
document.addEventListener("DOMContentLoaded", function () {
  // Only for large screens
  if (window.innerWidth > 991) {
    document.querySelectorAll(".navbar .dropdown").forEach(function (dropdown) {
      dropdown.addEventListener("mouseenter", function () {
        const toggle = this.querySelector(".dropdown-toggle");
        const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
        bsDropdown.show();
      });

      dropdown.addEventListener("mouseleave", function () {
        const toggle = this.querySelector(".dropdown-toggle");
        const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
        bsDropdown.hide();
      });
    });
  }
});
