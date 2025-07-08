// Memory data - Replace images with your actual photos
const memories = [
    {
        date: "January 8th, 2025",
        title: "First Hinge Chat",
        caption: "Our first match on Hinge. A short, fleeting conversation, but it became the first tiny spark in our journey.",
        image: "first.jpeg"
    },
    {
        date: "May 3rd, 2025",
        title: "The Random 'Pew Pew' Message",
        caption: "The day I randomly replied to her story with 'pew pew.' A playful, random message that surprisingly brought us closer.",
        image: "pew.jpeg"
    },
    {
        date: "May 6th, 2025",
        title: "8-Hour FaceTime Bonding",
        caption: "That night, we talked for over 8 hours on FaceTime, laughing and connecting deeply. As 'Perfect' by Ed Sheeran played in the background, I realized she might be the love of my life.",
        image: "1.jpeg"
    },
    {
        date: "May 9th, 2025 (12:40 AM)",
        title: "The Proposal",
        caption: "Amidst reports of tensions between India and Pakistan, I couldn't keep my feelings inside any longer. I confessed and asked her to be my girlfriend. Despite the chaos outside, she said 'Yes.' It was our own little peace.",
        image: "pro.jpeg"
    },
    {
        date: "May 17th, 2025",
        title: "Our First In-Person Meeting",
        caption: "The magical day I finally saw her in person. As she stepped out of the cab, a sudden storm hit. We hugged, and it began to rain — almost like the universe was celebrating with us. Then came the funny part: the security guard stopped us, asking her to check in through the My Gate app — risking a notification to my parents! Somehow, we sneaked in. To avoid the rain, we went to the basement, and suddenly the lights went out… and that's when we shared our first kiss. It was beyond perfect.",
        image: "2.jpeg"
    },
    {
        date: "May 20th, 2025",
        title: "Hard Goodbye Before Long Distance",
        caption: "I visited her college to escort her to the airport. It was her trip home for break — the beginning of our long-distance phase. Saying goodbye was so difficult, but I promised her that I'd wait for the day we could hold each other again.",
        image: "3.jpeg"
    }
];

// Global variables
let currentSlide = 0;
let isSlideShowActive = false;
let slideInterval;
let currentTheme = 'soft_pink';
let isMusicPlaying = false;

// Anniversary date - July 8th, 2025
const anniversaryDate = new Date('2025-07-09T00:40:00');

// DOM elements
const slidesWrapper = document.getElementById('slidesWrapper');
const slideIndicators = document.getElementById('slideIndicators');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const startBtn = document.getElementById('startBtn');
const replayBtn = document.getElementById('replayBtn');
const replaySection = document.getElementById('replaySection');
const themeToggle = document.getElementById('themeToggle');
const musicControl = document.getElementById('musicControl');
const backgroundMusic = document.getElementById('backgroundMusic');
const floatingHearts = document.getElementById('floatingHearts');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeCountdown();
    initializeFloatingHearts();
    setupEventListeners();
    
    // Start floating hearts animation
    startFloatingHearts();
});

// Initialize slideshow
function initializeSlideshow() {
    // Create memory slides
    memories.forEach((memory, index) => {
        const slide = createMemorySlide(memory, index);
        slidesWrapper.appendChild(slide);
    });
    
    // Create ending slide
    const endingSlide = createEndingSlide();
    slidesWrapper.appendChild(endingSlide);
    
    // Create slide indicators
    createSlideIndicators();
    
    // Hide navigation initially
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    slideIndicators.style.display = 'none';
}

// Create memory slide
function createMemorySlide(memory, index) {
    const slide = document.createElement('div');
    slide.className = 'memory-slide';
    slide.innerHTML = `
        <div class="memory-date">${memory.date}</div>
        <h2 class="memory-title">${memory.title}</h2>
        <img src="${memory.image}" alt="${memory.title}" class="memory-image">
        <p class="memory-caption">${memory.caption}</p>
    `;
    return slide;
}

// Create ending slide
function createEndingSlide() {
    const slide = document.createElement('div');
    slide.className = 'ending-slide';
    slide.innerHTML = `
        <div class="ending-message">
            To be continued...<br>
            Here's to many more beautiful memories together. ❤️
        </div>
    `;
    return slide;
}

// Create slide indicators
function createSlideIndicators() {
    const totalSlides = memories.length + 1; // Including ending slide
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        slideIndicators.appendChild(dot);
    }
}

// Setup event listeners
function setupEventListeners() {
    startBtn.addEventListener('click', startSlideShow);
    replayBtn.addEventListener('click', replaySlideShow);
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    themeToggle.addEventListener('click', toggleTheme);
    musicControl.addEventListener('click', toggleMusic);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
}

// Start slideshow
function startSlideShow() {
    isSlideShowActive = true;
    currentSlide = 0;
    
    // Hide start button and show navigation
    startBtn.style.display = 'none';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    slideIndicators.style.display = 'flex';
    
    // Show first slide
    showSlide(0);
    
    // Start auto-advance (optional - uncomment if you want auto-advance)
    // startAutoAdvance();
}

// Replay slideshow
function replaySlideShow() {
    currentSlide = 0;
    replaySection.style.display = 'none';
    showSlide(0);
    
    // Restart auto-advance if it was running
    // startAutoAdvance();
}

// Show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.memory-slide, .ending-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Show replay button if on last slide
    if (index === slides.length - 1) {
        replaySection.style.display = 'block';
    } else {
        replaySection.style.display = 'none';
    }
    
    currentSlide = index;
}

// Go to specific slide
function goToSlide(index) {
    if (isSlideShowActive) {
        showSlide(index);
        // Stop auto-advance when user manually navigates
        stopAutoAdvance();
    }
}

// Previous slide
function previousSlide() {
    if (isSlideShowActive) {
        const totalSlides = memories.length + 1;
        const newIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        showSlide(newIndex);
        stopAutoAdvance();
    }
}

// Next slide
function nextSlide() {
    if (isSlideShowActive) {
        const totalSlides = memories.length + 1;
        const newIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        showSlide(newIndex);
        stopAutoAdvance();
    }
}

// Auto-advance functionality (optional)
function startAutoAdvance() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 8000); // 8 seconds per slide
}

function stopAutoAdvance() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Keyboard navigation
function handleKeyPress(event) {
    if (isSlideShowActive) {
        switch (event.key) {
            case 'ArrowLeft':
                previousSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                break;
            case ' ':
                event.preventDefault();
                toggleMusic();
                break;
        }
    }
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (currentTheme === 'soft_pink') {
        body.setAttribute('data-theme', 'sky_blue');
        themeIcon.textContent = '🌸';
        themeText.textContent = 'Soft Pink';
        currentTheme = 'sky_blue';
    } else {
        body.setAttribute('data-theme', 'soft_pink');
        themeIcon.textContent = '💙';
        themeText.textContent = 'Sky Blue';
        currentTheme = 'soft_pink';
    }
}

// Music control
function toggleMusic() {
    const musicIcon = document.querySelector('.music-icon');
    const musicText = document.querySelector('.music-text');
    
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Play Music';
        isMusicPlaying = false;
    } else {
        // Note: Auto-play might be blocked by browser policies
        backgroundMusic.play().catch(e => {
            console.log('Music playback failed:', e);
            alert('Please interact with the page first to enable music playback.');
        });
        musicIcon.textContent = '🔇';
        musicText.textContent = 'Pause Music';
        isMusicPlaying = true;
    }
}

// Countdown timer
function initializeCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = anniversaryDate.getTime() - now;
    
    if (distance < 0) {
        // Anniversary has passed, show celebration message
        document.getElementById('days').textContent = '🎉';
        document.getElementById('hours').textContent = '❤️';
        document.getElementById('minutes').textContent = '🎊';
        document.getElementById('seconds').textContent = '💕';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Floating hearts animation
function initializeFloatingHearts() {
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        createFloatingHeart();
    }
}

function startFloatingHearts() {
    setInterval(() => {
        createFloatingHeart();
    }, 3000); // New heart every 3 seconds
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '💕';
    
    // Random horizontal position
    heart.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 3 + 4; // 4-7 seconds
    heart.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 2;
    heart.style.animationDelay = delay + 's';
    
    floatingHearts.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, (duration + delay) * 1000);
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (!isSlideShowActive) return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - previous slide
            previousSlide();
        } else {
            // Swipe left - next slide
            nextSlide();
        }
    }
}

// Smooth scrolling for navigation
function smoothScrollToElement(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Add some extra romantic touches
function addRomanticEffects() {
    // Add sparkle effect on hover for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add pulse effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        setInterval(() => {
            mainTitle.style.textShadow = '2px 2px 20px var(--theme-shadow)';
            setTimeout(() => {
                mainTitle.style.textShadow = '2px 2px 4px var(--theme-shadow)';
            }, 1000);
        }, 3000);
    }
}

// Initialize romantic effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addRomanticEffects, 1000);
});

// Utility function to format date
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Console message for developers
console.log('💕 Welcome to Our Love Gallery! 💕');
console.log('This website was built with love and contains our precious memories.');
console.log('To customize: Replace placeholder images in the memories array with your actual photos.');
console.log('Enjoy exploring our journey! ❤️');