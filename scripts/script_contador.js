const release_date = "19/11/2026";
const cont = document.getElementById('contador');
let modo_Act = "horas";

function parseReleaseDate() {
    const [d, m, y] = release_date.split('/').map(Number);
    return new Date(y, m - 1, d, 0, 0, 0);
}

function updreloj() {
    const now = new Date();
    const target = parseReleaseDate();
    let diff = target - now;
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
    const header = document.querySelector('header');
    if (!header) return;
    const threshold = 30; // px para activar el estado compacto
    if (window.scrollY > threshold) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
}

window.addEventListener('scroll', onScrollHeader, { passive: true });
// ejecutar al cargar para estado correcto si la página se abre scrolleada
window.addEventListener('load', onScrollHeader);