const choiceArray = document.querySelectorAll(".choice")

choiceArray.forEach((card) => {
    card.addEventListener("click", () => {
        choiceArray.forEach((element) => {
            element.classList.remove("expand", "unset")
            element.classList.add('small')
        })
        card.classList.remove("small")
        card.classList.add('expand')
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter-value");
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !started) {
                started = true;
                counters.forEach((counter) => {
                    animateCounter(counter);
                });
            }
        });
    }, { threshold: 0.5 });

    const counterSection = document.getElementById("counter");
    if (counterSection) observer.observe(counterSection);

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