var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
/*  Form contatto  */
const form = document.getElementById('form');
const result = document.getElementById('result');
if (form && result) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            let json = yield response.json();
            if (response.status === 200) {
                result.innerHTML = "Form submitted successfully";
            }
            else {
                console.log(response);
                result.innerHTML = json.message;
            }
        }))
            .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
            .then(() => {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
    });
}
/* Event listener per copiare l'userName discord */
document.addEventListener("DOMContentLoaded", () => {
    const discordUser = document.querySelector(".discordUser");
    const userNameTextElement = document.getElementById("userName-text");
    const notification = document.getElementById("copy-notification");
    if (discordUser && userNameTextElement && notification) {
        discordUser.addEventListener("click", (event) => {
            event.preventDefault();
            const userNameText = userNameTextElement.textContent;
            if (userNameText) {
                navigator.clipboard.writeText(userNameText).then(() => {
                    notification.classList.remove("hidden");
                    notification.classList.add("visible");
                    setTimeout(() => {
                        notification.classList.remove("visible");
                        notification.classList.add("hidden");
                    }, 2000);
                }).catch(() => {
                    console.error("Errore nella copia dell'UserName");
                });
            }
        });
    }
});
/*  Toggle menu  */
export function toggleMenu() {
    let mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('open');
        var hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            if (mobileMenu.classList.contains('open')) {
                hamburger.classList.add('svgAttiva');
            }
            else {
                hamburger.classList.remove('svgAttiva');
            }
        }
    }
}
window.toggleMenu = toggleMenu;
/* animazioni quando entrano nel view port */
document.addEventListener('DOMContentLoaded', () => {
    /* section chi sono */
    const homeSection = document.getElementById('chiSono');
    const presentazione = document.querySelector('.presentazione');
    const fotoCV = document.querySelector('.fotoCV');
    /* section lavori */
    const lavoriSection = document.getElementById('lavori');
    const descrizione = document.querySelector('.contenitoreDescrizione');
    const fotoLavori = document.querySelector('.fotoLavori');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    /* Callback per la sezione "chi sono" */
    const observerCallbackChiSono = (entries, observer) => {
        entries.forEach(entry => {
            if (presentazione && fotoCV) {
                if (entry.isIntersecting) {
                    presentazione.classList.add('animate-presentazione');
                    fotoCV.classList.add('animate-firstHalf');
                }
                else {
                    presentazione.classList.remove('animate-presentazione');
                    fotoCV.classList.remove('animate-firstHalf');
                }
            }
        });
    };
    /* Callback per la sezione "lavori" */
    const observerCallbackLavori = (entries, observer) => {
        entries.forEach(entry => {
            if (descrizione && fotoLavori) {
                if (entry.isIntersecting) {
                    descrizione.classList.add('animate-presentazione');
                    fotoLavori.classList.add('animate-firstHalf');
                }
                else {
                    descrizione.classList.remove('animate-presentazione');
                    fotoLavori.classList.remove('animate-firstHalf');
                }
            }
        });
    };
    const observerChiSono = new IntersectionObserver(observerCallbackChiSono, observerOptions);
    const observerLavori = new IntersectionObserver(observerCallbackLavori, observerOptions);
    if (observerChiSono && homeSection)
        observerChiSono.observe(homeSection);
    if (observerLavori && lavoriSection)
        observerLavori.observe(lavoriSection);
});
