document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slider img");
    const slider = document.querySelector(".slider");

    let index = 0;

    /* ---------------- UPDATE SLIDER ---------------- */
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

    /* ---------------- BUTTON NAV ---------------- */
    window.changeSlide = function(direction) {
        index += direction;

        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        updateSlider();
    };

    /* ---------------- KEYBOARD (PC) ---------------- */
    document.addEventListener("keydown", (e) => {

        if (e.key === "ArrowRight") {
            changeSlide(1);
        }

        if (e.key === "ArrowLeft") {
            changeSlide(-1);
        }
    });

    /* ---------------- TOUCH (HANDY SWIPE) ---------------- */
    let startX = 0;
    let endX = 0;

    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;

        let diff = startX - endX;

        if (Math.abs(diff) > 50) {

            if (diff > 0) {
                changeSlide(1);   // swipe left → next
            } else {
                changeSlide(-1);  // swipe right → prev
            }
        }
    });

    /* ---------------- START ---------------- */
    updateSlider();
});