document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const openingScreen = document.getElementById("opening");
    const mainContent = document.getElementById("main-content");
    const beginButton = document.getElementById("beginButton");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle"); 
    const loveLetter = document.getElementById("loveLetter");

loveLetter.addEventListener("click", () => {
    loveLetter.classList.toggle("open");
});
musicToggle.addEventListener("click", () => {

    if (backgroundMusic.paused) {
        backgroundMusic.play();

        musicToggle.textContent = "♪";
        musicToggle.setAttribute("aria-label", "Pause music");
        
    } else {
        backgroundMusic.pause();

        musicToggle.textContent = "Ⅱ";
        musicToggle.setAttribute("aria-label", "Play music");
    }

});
    const finalMessage = document.getElementById("finalMessage");


    /* =========================================
       INITIAL STATE
    ========================================= */

    // Keep the main website hidden when the page first loads.
    mainContent.style.display = "none";

    // Keep the final message hidden until the envelope is opened.
    finalMessage.style.display = "none";


    /* =========================================
       BEGIN EXPERIENCE
    ========================================= */

    beginButton.addEventListener("click", () => {
        backgroundMusic.volume = 0.35;

backgroundMusic.play().catch(() => {
    console.log("Music could not start automatically.");
});

        // Fade the opening screen away.
        openingScreen.style.transition = "opacity 1.2s ease";
        openingScreen.style.opacity = "0";

        // Wait for the fade before hiding it.
        setTimeout(() => {

            openingScreen.style.display = "none";

            // Show the main website.
            mainContent.style.display = "block";

            // Start from the top of the experience.
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 1200);

    });


    /* =========================================
       FINAL ENVELOPE
    ========================================= */

    envelopeButton.addEventListener("click", () => {

        // Show the final message.
        finalMessage.style.display = "flex";

        // Give the browser a moment before scrolling.
        setTimeout(() => {

            finalMessage.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    });


    /* =========================================
       REVEAL ANIMATIONS
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".hero-text, " +
        ".memory-text, " +
        ".memory-image, " +
        ".love-card, " +
        ".story-photo, " +
        ".letter-placeholder, " +
        ".heartfelt-message, " +
        ".final-content"
    );


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // Stop observing after the element appears.
                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =========================================
       IMAGE FALLBACK
    ========================================= */

    // If an image hasn't been added yet,
    // prevent the broken-image icon from appearing.

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            image.parentElement.classList.add(
                "image-placeholder"
            );

        });

    });

});