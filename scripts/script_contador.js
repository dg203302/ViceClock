const release_date = "19/11/2026";
const cont = document.getElementById('contador');
let modo_Act = "meses";

function parseDate(dateStr) {
    const [d, m, y] = dateStr.split('/').map(Number);
    return new Date(y, m - 1, d, 0, 0, 0);
}

function updreloj() {
    const now = new Date();
    const target = parseDate(release_date);
    let diff = target - now;
    
    // Update progress bar
    const start = parseDate("05/12/2023");
    const totalDuration = target - start;
    const elapsed = now - start;
    let percentage = (elapsed / totalDuration) * 100;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    
    const progressFill = document.getElementById('progress-bar-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
        progressFill.parentElement.title = `Progreso: ${percentage.toFixed(2)}% | Falta: ${(100 - percentage).toFixed(2)}%`;
    }

    if (diff <= 0) {
        cont.innerText = 'Lanzado';
        return;
    }
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (modo_Act === 'horas') {
        const totalHours = Math.floor(totalSeconds / 3600);
        cont.innerText = `${String(totalHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} Hrs`;
    } else if (modo_Act === 'dias') {
        cont.innerText = `${days} Days ${hours} h ${minutes} m ${seconds} s`;
    } else if (modo_Act === 'meses') {
        const months = Math.floor(days / 30);
        const remDays = days - months * 30;
        cont.innerText = `${months} Months ${remDays} Days`;
    }
}

function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    const btn = document.getElementById('menuToggle');
    const isOpen = menu.classList.toggle('show');
    menu.setAttribute('aria-hidden', String(!isOpen));
    btn.setAttribute('aria-expanded', String(isOpen));
}

function toggleMenuClose() {
    const menu = document.getElementById('dropdownMenu');
    const btn = document.getElementById('menuToggle');
    if (menu) menu.classList.remove('show');
    if (menu) menu.setAttribute('aria-hidden', 'true');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

function selectMode(mode) {
    modo_Act = mode;
    toggleMenuClose();
    updreloj();
}

// close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('dropdownMenu');
    const btn = document.getElementById('menuToggle');
    if (!menu || !btn) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        toggleMenuClose();
    }
});

// close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenuClose();
});

window.addEventListener('load', () => {
    updreloj();
    setInterval(updreloj, 1000);
});

// Header scroll behavior: añadir/quitar clase 'scrolled' según desplazamiento
function onScrollHeader() {
    const threshold = 30; // px para activar el estado compacto
    if (window.scrollY > threshold) document.body.classList.add('scrolled');
    else document.body.classList.remove('scrolled');
}

window.addEventListener('scroll', onScrollHeader, { passive: true });
// ejecutar al cargar para estado correcto si la página se abre scrolleada
window.addEventListener('load', onScrollHeader);

// ── YouTube Background Music Player ──
let ytPlayer = null;
let ytReady = false;
let isPlaying = false;
const YT_VIDEO_ID = 'atha8XPhkuQ'; // YouTube video ID to play

// Load the YouTube IFrame API script
(function loadYTAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
})();

// Called automatically by the YT API once it's ready
function onYouTubeIframeAPIReady() {
    // Create a hidden container for the player
    let container = document.getElementById('yt-player-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'yt-player-container';
        container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;pointer-events:none;';
        document.body.appendChild(container);
        const playerDiv = document.createElement('div');
        playerDiv.id = 'yt-bg-player';
        container.appendChild(playerDiv);
    }

    ytPlayer = new YT.Player('yt-bg-player', {
        videoId: YT_VIDEO_ID,
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YT_VIDEO_ID, // required for loop to work
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
        },
        events: {
            onReady: (e) => {
                ytReady = true;
                e.target.setVolume(30); // 30% volume
            },
            onStateChange: (e) => {
                const btn = document.getElementById('musicToggleBtn');
                if (e.data === YT.PlayerState.PLAYING) {
                    isPlaying = true;
                    if (btn) btn.classList.add('music-playing');
                } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.UNSTARTED) {
                    isPlaying = false;
                    if (btn) btn.classList.remove('music-playing');
                } else if (e.data === YT.PlayerState.ENDED) {
                    e.target.playVideo();
                }
            }
        }
    });
}

/**
 * Toggle background music playback.
 * Called by the audio icon button in the header.
 */
function toggleSong() {
    if (!ytReady || !ytPlayer) return;

    const btn = document.getElementById('musicToggleBtn');

    if (isPlaying) {
        ytPlayer.pauseVideo();
        isPlaying = false;
        if (btn) btn.classList.remove('music-playing');
    } else {
        ytPlayer.playVideo();
        isPlaying = true;
        if (btn) btn.classList.add('music-playing');
    }
}

// Alias so the existing onclick="iniciarMusica()" also works
function iniciarMusica() {
    toggleSong();
}