document.addEventListener('DOMContentLoaded', () => {
    const blurElement = document.getElementById('background-blur');

    // 1. Find the background image element
    const bgImage = document.getElementById('fixed-background-image');

    if (!blurElement || !bgImage) {
        console.warn('Scroll-blur script: Missing blur or background element.');
        return;
    }

    // 2. Get the *computed pixel height* of the background image
    const scrollStop = bgImage.offsetHeight;

    // 3. Check for a valid height
    if (scrollStop === 0) {
        console.warn('Scroll-blur script: Background height is 0.');
        return;
    }

    let ticking = false;

    function updateOpacity() {
        const scrollY = window.scrollY;

        // This logic is now robust
        const opacity = Math.min(scrollY / scrollStop, 1);
        blurElement.style.opacity = opacity;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOpacity);
            ticking = true;
        }
        });

    updateOpacity(); // Run once on load
});