import {Lavori} from './lavori.js'



const titoloLavori : Element | null = document.querySelector('.titoloLavoro');
const homepages : HTMLImageElement | null = document.querySelector('.homepage');
const descrizioni : HTMLSpanElement | null = document.querySelector('.descrizione');
const btnNext = document.getElementById('next') as HTMLButtonElement | null;
const btnPrev = document.getElementById('prev') as HTMLButtonElement | null;
const dotsContainer: HTMLElement | null = document.querySelector('.dots');
const urlsRepo : HTMLAnchorElement | null = document.querySelector('.urlRepo');
const tecnologie : HTMLImageElement | null = document.querySelector('.tecnologia');
const urlsLive : HTMLAnchorElement | null = document.querySelector('.urlLive');

let currentIndex : number = 0;

// Creazione dei punti di navigazione
if (dotsContainer) {
    for (let i: number = 0; i < Lavori.length; i++) {
      const dot: HTMLSpanElement = document.createElement('span');
      dot.classList.add('dot');
      dot.setAttribute('data-slide', i.toString());
  
      if (i === 0) {
        dot.classList.add('active');
      }
  
      dotsContainer.appendChild(dot);
    }
  } else {
    console.error('Elemento .dots non trovato');
  }

const dots: NodeListOf<Element> = document.querySelectorAll('.dot');



function updateCarosello(currentIndex: number): void {

    if (titoloLavori) titoloLavori.textContent= Lavori[currentIndex].titolo;
    if (homepages) homepages.src= Lavori[currentIndex].img;
    if (descrizioni) descrizioni.textContent = Lavori[currentIndex].descrizione;
    if (urlsRepo) urlsRepo.href = Lavori[currentIndex].urlRepo;
    if (tecnologie) tecnologie.src = Lavori[currentIndex].tec;
    if (urlsLive) urlsLive.href = Lavori[currentIndex].urlLive;

    // Aggiorna i punti di navigazione
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function nextSlide() : void {
    currentIndex = (currentIndex + 1) % Lavori.length;
    updateCarosello( currentIndex);
}

function prevSlide() : void {
    currentIndex = (currentIndex - 1 + Lavori.length) % Lavori.length;
    updateCarosello( currentIndex);
}

/* Event listeners */


if (btnNext) {
    btnNext.addEventListener('click', () => {
        nextSlide();
    });
} else {
    console.error('Elemento con ID "next" non trovato o non è un HTMLButtonElement');
}

if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        prevSlide();
    });
} else {
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