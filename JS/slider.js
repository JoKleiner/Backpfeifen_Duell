document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slider_box");
    const slider = document.querySelector(".slider");
    const punchSound = new Audio("Media/Punch.mp3");
    punchSound.volume = 0.75;
    punchSound.preload = "auto";
    punchSound.load();

    function playPunch() {
        punchSound.currentTime = 0;
        punchSound.play().catch(() => {});
    }

    let index = 0;

    /* ---------------- UPDATE SLIDER ---------------- */
    function updateSlider() {
        playPunch();

        slides.forEach(slide => {
            slide.classList.remove("prev_box", "active_box", "next_box", "inactive_box");
            slide.classList.add("inactive_box");
        });

        let prevIndex = index - 1;
        let nextIndex = index + 1;

        if (prevIndex < 0) prevIndex = slides.length - 1;
        if (nextIndex >= slides.length) nextIndex = 0;

        // prev
        slides[prevIndex].classList.remove("inactive_box");
        slides[prevIndex].classList.add("prev_box");

        // active
        slides[index].classList.remove("inactive_box");
        slides[index].classList.add("active_box");

        // next
        slides[nextIndex].classList.remove("inactive_box");
        slides[nextIndex].classList.add("next_box");
    }

    /* ---------------- BUTTON NAV ---------------- */
    window.changeSlide = function (direction) {
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

    /* ---------------- KLICK ON PIC (PC) ---------------- */
    slides.forEach((slide, i) => {

        slide.addEventListener("click", () => {

            if (slide.classList.contains("prev_box")) {
                changeSlide(-1);
            }

            if (slide.classList.contains("next_box")) {
                changeSlide(1);
            }
        });

    });

    /* ---------------- TOUCH (HANDY SWIPE) ---------------- */
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    document.addEventListener("touchstart", (e) => {
        if (!e.target.closest(".slider")) return;
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    document.addEventListener("touchend", (e) => {
        if (!isDragging) return;

        endX = e.changedTouches[0].clientX;

        let diff = startX - endX;

        if (Math.abs(diff) > 50) {
            changeSlide(diff > 0 ? 1 : -1);
        }

        isDragging = false;
    });

    /* ---------------- START ---------------- */
    updateSlider();
});