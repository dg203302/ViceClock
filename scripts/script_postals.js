(() => {
    const postals = [
        'images/Postals/post-cards-of-the-gta-vi-locations-v0-21pm2hdeq6ze1.webp',
        'images/Postals/post-cards-of-the-gta-vi-locations-v0-40eicjdeq6ze1.webp',
        'images/Postals/post-cards-of-the-gta-vi-locations-v0-azdmeedeq6ze1.webp',
        'images/Postals/post-cards-of-the-gta-vi-locations-v0-fs3osgdeq6ze1.webp',
        'images/Postals/post-cards-of-the-gta-vi-locations-v0-kvvhfldeq6ze1.webp',
        'images/Postals/post-cards-of-the-gta-vi-locations-v0-qkq9rideq6ze1.webp'
    ];

    let currentIndex = 0;

    const currentPostal = document.getElementById('currentPostal');
    const prevBtn = document.getElementById('prevPostal');
    const nextBtn = document.getElementById('nextPostal');
    
    const modal = document.getElementById('postalModal');
    const modalImg = document.getElementById('maximizedPostal');
    const closeBtn = document.getElementById('closePostalModal');

    function updateImage() {
        if (!currentPostal) return;
        currentPostal.src = postals[currentIndex];
        // Add a small bounce/fade effect
        currentPostal.style.transform = 'scale(0.98)';
        setTimeout(() => {
            currentPostal.style.transform = 'scale(1)';
        }, 150);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? postals.length - 1 : currentIndex - 1;
            updateImage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === postals.length - 1) ? 0 : currentIndex + 1;
            updateImage();
        });
    }

    if (currentPostal) {
        currentPostal.addEventListener('click', () => {
            if (!modal || !modalImg) return;
            modal.classList.add('show');
            modalImg.src = postals[currentIndex];
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
})();
