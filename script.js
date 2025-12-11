const track = document.querySelector('.carousel-track');
let slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let slideWidth = slides[0].getBoundingClientRect().width;

// Clone first and last slides for infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);
let currentIndex = 1; // start at the "real" first slide
track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

// Update slide width on resize
window.addEventListener('resize', () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transition = "none";
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});

// Move to next slide
nextButton.addEventListener('click', () => {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  track.style.transition = "transform 0.4s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});

// Move to previous slide
prevButton.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  track.style.transition = "transform 0.4s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});

// Reset position when hitting clones
track.addEventListener('transitionend', () => {
  if (slides[currentIndex].id === "first-clone") {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
  if (slides[currentIndex].id === "last-clone") {
    track.style.transition = "none";
    currentIndex = slides.length - 2;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
});