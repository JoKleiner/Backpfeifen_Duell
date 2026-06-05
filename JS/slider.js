document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slider img");
    let index = 0;

    function updateSlider() {

        slides.forEach(img => {
            img.classList.remove("prev_img", "active_img", "next_img", "inactive_img");
            img.classList.add("inactive_img");
        });

        let prevIndex = index - 1;
        let nextIndex = index + 1;

        if (prevIndex < 0) prevIndex = slides.length - 1;
        if (nextIndex >= slides.length) nextIndex = 0;

        // prev
        slides[prevIndex].classList.remove("inactive_img");
        slides[prevIndex].classList.add("prev_img");

        // active
        slides[index].classList.remove("inactive_img");
        slides[index].classList.add("active_img");

        // next
        slides[nextIndex].classList.remove("inactive_img");
        slides[nextIndex].classList.add("next_img");
    }

    window.changeSlide = function(direction) {
        index += direction;

        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        updateSlider();
    };

    // Start
    updateSlider();
});