document.addEventListener('DOMContentLoaded', () => {
    const overlays = document.querySelectorAll('.video-overlay');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const maximizedVideo = document.getElementById('maximizedVideo');

    if (!videoModal || !maximizedVideo) return;

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const videoUrl = overlay.getAttribute('data-video');
            maximizedVideo.src = videoUrl;
            videoModal.classList.add('show');
            videoModal.setAttribute('aria-hidden', 'false');
        });
    });

    const closeModal = () => {
        videoModal.classList.remove('show');
        videoModal.setAttribute('aria-hidden', 'true');
        maximizedVideo.src = ''; // Stop video playback
    };

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', closeModal);
    }

    // Close when clicking outside the modal content
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('show')) {
            closeModal();
        }
    });
});
