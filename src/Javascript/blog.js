// Tab switching functionality
function switchTab(index) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Carousel manual control (optional)
let currentSlide = 0;
function moveSlide(direction) {
    // Manual carousel control can be implemented here if needed
    console.log('Move slide:', direction);
}
