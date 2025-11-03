// ===============================
// WAIT FOR DOM TO LOAD FIRST
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  
  // ===== SECTION 1: Card/Choice Expansion =====
  const choiceArray = document.querySelectorAll(".choice");
  
  if (choiceArray.length > 0) {
    choiceArray.forEach((card) => {
      card.addEventListener("click", () => {
        choiceArray.forEach((element) => {
          element.classList.remove("expand", "unset");
          element.classList.add("small");
        });
        card.classList.remove("small");
        card.classList.add("expand");
      });
    });
    console.log(`✅ Initialized ${choiceArray.length} choice cards`);
  }

  // ===== SECTION 2: Counter Animation =====
  const counters = document.querySelectorAll(".counter-value");
  let started = false;

  if (counters.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            counters.forEach((counter) => {
              animateCounter(counter);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const counterSection = document.getElementById("counter");
    if (counterSection) {
      observer.observe(counterSection);
      console.log("✅ Counter animation initialized");
    }
  }

  // Counter animation function
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-count");
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCounter);
  }
});
