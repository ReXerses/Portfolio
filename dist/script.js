import { Lavori } from './lavori.js';
const titoloLavori = document.querySelector('.titoloLavoro');
const homepages = document.querySelector('.homepage');
const descrizioni = document.querySelector('.descrizione');
const btnNext = document.getElementById('next');
const btnPrev = document.getElementById('prev');
const dotsContainer = document.querySelector('.dots');
const urlsRepo = document.querySelector('.urlRepo');
const tecnologie = document.querySelector('.tecnologia');
const urlsLive = document.querySelector('.urlLive');
let currentIndex = 0;
// Creazione dei punti di navigazione
if (dotsContainer) {
    for (let i = 0; i < Lavori.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-slide', i.toString());
        if (i === 0) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    }
}
else {
    console.error('Elemento .dots non trovato');
}
const dots = document.querySelectorAll('.dot');
function updateCarosello(currentIndex) {
    if (titoloLavori)
        titoloLavori.textContent = Lavori[currentIndex].titolo;
    if (homepages)
        homepages.src = Lavori[currentIndex].img;
    if (descrizioni)
        descrizioni.textContent = Lavori[currentIndex].descrizione;
    if (urlsRepo)
        urlsRepo.href = Lavori[currentIndex].urlRepo;
    if (tecnologie)
        tecnologie.src = Lavori[currentIndex].tec;
    if (urlsLive)
        urlsLive.href = Lavori[currentIndex].urlLive;
    // Aggiorna i punti di navigazione
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add("active");
        }
        else {
            dot.classList.remove("active");
        }
    });
}
function nextSlide() {
    currentIndex = (currentIndex + 1) % Lavori.length;
    updateCarosello(currentIndex);
}
function prevSlide() {
    currentIndex = (currentIndex - 1 + Lavori.length) % Lavori.length;
    updateCarosello(currentIndex);
}
/* Event listeners */
if (btnNext) {
    btnNext.addEventListener('click', () => {
        nextSlide();
    });
}
else {
    console.error('Elemento con ID "next" non trovato o non è un HTMLButtonElement');
}
if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        prevSlide();
    });
}
else {
    console.error('Elemento con ID "prev" non trovato o non è un HTMLButtonElement');
}
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarosello(currentIndex);
    });
});
// primo paint della sezione
updateCarosello(currentIndex);
