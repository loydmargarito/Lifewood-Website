let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;

function showSlide(index) {
    // Make the slideshow loop
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Hide all slides and remove active class from all dots
    slides.forEach(slide => {
        slide.classList.remove("active");
    });
    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    // Show the target slide and activate the corresponding dot
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function moveSlide(n) {
    showSlide(currentSlide + n);
}

// Automatically change slide every 7 seconds
let slideInterval = setInterval(() => {
    moveSlide(1);
}, 7000);

// Initialize the slideshow
showSlide(currentSlide);


// --- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
const animatedCards = document.querySelectorAll('.pillars-section .card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1
});

animatedCards.forEach(card => {
    observer.observe(card);
});


// --- INTERACTIVE PILLARS SCRIPT (TEXT-TO-SPEECH & VIDEO) ---
if ('speechSynthesis' in window) {
    const allCards = document.querySelectorAll('.pillars-section .card');
    const videoLightbox = document.getElementById('video-lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeVideoBtn = document.getElementById('close-video-btn');
    
    allCards.forEach(card => {
        // --- Part 1: Text-to-Speech on Click ---
        card.addEventListener('click', (event) => {
            // Stop if the click was on the "Watch Video" button itself
            if (event.target.classList.contains('watch-video-btn')) {
                return;
            }

            const textToSpeak = card.querySelector('.card-description').textContent;
            window.speechSynthesis.cancel(); // Stop any other speech
            
            // Remove 'speaking' class and buttons from all other cards
            allCards.forEach(c => {
                c.classList.remove('speaking');
                c.querySelector('.card-action').innerHTML = ''; 
            });

            card.classList.add('speaking');
            
            // --- Part 2: Create and show the "Watch Video" button ---
            const buttonContainer = card.querySelector('.card-action');
            const watchBtn = document.createElement('button');
            watchBtn.className = 'watch-video-btn';
            watchBtn.textContent = 'Watch Video';
            buttonContainer.appendChild(watchBtn);

            // Add listener to the NEWLY created button
            watchBtn.addEventListener('click', () => {
                const videoSrc = card.dataset.videoSrc;
                if (videoSrc) {
                    lightboxVideo.src = videoSrc;
                    videoLightbox.classList.add('show');
                    lightboxVideo.play();
                }
            });
            
            // --- Part 3: Speak the utterance ---
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        });
    });

    // --- Part 4: Logic to close the video lightbox ---
    function closeLightbox() {
        videoLightbox.classList.remove('show');
        lightboxVideo.pause();
        lightboxVideo.src = ''; // Important to stop video download
    }

    closeVideoBtn.addEventListener('click', closeLightbox);
    
    videoLightbox.addEventListener('click', (event) => {
        // Close if the user clicks on the dark background, but not the video itself
        if (event.target === videoLightbox) {
            closeLightbox();
        }
    });

} else {
    console.log("Sorry, your browser does not support text-to-speech.");
}

document.addEventListener('DOMContentLoaded', () => {

    // --- ADDITION 1: RESPONSIVE NAVIGATION ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');

    if(hamburgerBtn && mobileNavPanel) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            mobileNavPanel.classList.toggle('is-open');
        });
    }

    // --- ADDITION 2: SCROLL ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});
