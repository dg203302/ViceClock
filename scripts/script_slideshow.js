(() => {
    'use strict';

    // All game screenshots
    const images = [
        'images/Ambrosia_01.jpg',
        'images/Ambrosia_02.jpg',
        'images/Ambrosia_03.jpg',
        'images/Ambrosia_04.jpg',
        'images/Ambrosia_05.jpg',
        'images/Boobie_Ike_01.jpg',
        'images/Boobie_Ike_02.jpg',
        'images/Boobie_Ike_03.jpg',
        'images/Boobie_Ike_04.jpg',
        'images/Brian_Heder_01.jpg',
        'images/Brian_Heder_02.jpg',
        'images/Brian_Heder_03.jpg',
        'images/Brian_Heder_04.jpg',
        'images/Cal_Hampton_01.jpg',
        'images/Cal_Hampton_02.jpg',
        'images/Cal_Hampton_03.jpg',
        'images/Cal_Hampton_04.jpg',
        'images/DreQuan_Priest_01.jpg',
        'images/DreQuan_Priest_02.jpg',
        'images/DreQuan_Priest_03.jpg',
        'images/DreQuan_Priest_04.jpg',
        'images/Grassrivers_01.jpg',
        'images/Grassrivers_02.jpg',
        'images/Grassrivers_03.jpg',
        'images/Grassrivers_04.jpg',
        'images/Jason_Duval_01.jpg',
        'images/Jason_Duval_02.jpg',
        'images/Jason_Duval_03.jpg',
        'images/Jason_Duval_04.jpg',
        'images/Jason_Duval_05.jpg',
        'images/Jason_Duval_06.jpg',
        'images/Leonida_Keys_01.jpg',
        'images/Leonida_Keys_02.jpg',
        'images/Leonida_Keys_03.jpg',
        'images/Leonida_Keys_04.jpg',
        'images/Leonida_Keys_05.jpg',
        'images/Lucia_Caminos_01.jpg',
        'images/Lucia_Caminos_02.jpg',
        'images/Lucia_Caminos_03.jpg',
        'images/Lucia_Caminos_04.jpg',
        'images/Lucia_Caminos_05.jpg',
        'images/Lucia_Caminos_06.jpg',
        'images/Mount_Kalaga_National_Park_01.jpg',
        'images/Mount_Kalaga_National_Park_02.jpg',
        'images/Mount_Kalaga_National_Park_03.jpg',
        'images/Mount_Kalaga_National_Park_04.jpg',
        'images/Mount_Kalaga_National_Park_05.jpg',
        'images/Mount_Kalaga_National_Park_06.jpg',
        'images/Port_Gellhorn_01.jpg',
        'images/Port_Gellhorn_02.jpg',
        'images/Port_Gellhorn_03.jpg',
        'images/Port_Gellhorn_04.jpg',
        'images/Port_Gellhorn_05.jpg',
        'images/Raul_Bautista_01.jpg',
        'images/Raul_Bautista_02.jpg',
        'images/Raul_Bautista_03.jpg',
        'images/Raul_Bautista_04.jpg',
        'images/Real_Dimez_01.jpg',
        'images/Real_Dimez_02.jpg',
        'images/Real_Dimez_03.jpg',
        'images/Real_Dimez_04.jpg',
        'images/Vice_City_01.jpg',
        'images/Vice_City_02.jpg',
        'images/Vice_City_03.jpg',
        'images/Vice_City_04.jpg',
        'images/Vice_City_05.jpg',
        'images/Vice_City_06.jpg',
        'images/Vice_City_07.jpg',
        'images/Vice_City_08.jpg',
        'images/Vice_City_09.jpg',
    ];

    // Shuffle so the order is different each visit
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    const TRANSITION_MS = 1800;   // crossfade duration
    const DISPLAY_MS = 6000;      // how long each image stays

    const slides = document.querySelectorAll('.bg-slide');
    if (slides.length < 2) return;

    let currentIndex = 0;
    let activeSlide = 0; // index into slides[] (0 or 1)

    // Preload a single image, returns a promise
    function preload(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(src);
            img.src = src;
        });
    }

    // Random subtle Ken Burns transform for variety
    function randomTransform() {
        const scale = 1.05 + Math.random() * 0.1;       // 1.05 – 1.15
        const x = (Math.random() - 0.5) * 6;             // -3% to 3%
        const y = (Math.random() - 0.5) * 4;             // -2% to 2%
        return `scale(${scale.toFixed(3)}) translate(${x.toFixed(1)}%, ${y.toFixed(1)}%)`;
    }

    // Set a slide's background image with Ken Burns
    function setSlide(slideEl, src) {
        slideEl.style.backgroundImage = `url('${src}')`;
        slideEl.style.transform = randomTransform();
    }

    // Initial setup: show first image immediately
    function init() {
        setSlide(slides[0], images[0]);
        slides[0].classList.add('bg-slide--active');
        slides[1].classList.remove('bg-slide--active');

        // Preload the next image
        const nextIdx = 1 % images.length;
        preload(images[nextIdx]);

        // Start cycling
        setTimeout(cycle, DISPLAY_MS);
    }

    function cycle() {
        // Determine next image
        currentIndex = (currentIndex + 1) % images.length;
        const nextSlideIdx = activeSlide === 0 ? 1 : 0;

        // Set the next image on the hidden slide
        setSlide(slides[nextSlideIdx], images[currentIndex]);

        // Crossfade: activate the new slide, deactivate the old
        slides[nextSlideIdx].classList.add('bg-slide--active');
        slides[activeSlide].classList.remove('bg-slide--active');

        activeSlide = nextSlideIdx;

        // Preload the image after next
        const preloadIdx = (currentIndex + 1) % images.length;
        preload(images[preloadIdx]);

        // Schedule next transition
        setTimeout(cycle, DISPLAY_MS);
    }

    // Preload first two images then start
    Promise.all([preload(images[0]), preload(images[1] || images[0])]).then(init);
})();
