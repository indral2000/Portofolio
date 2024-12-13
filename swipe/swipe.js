const swipeContainer = document.querySelector('.swipe-container');
const swipeImage = document.querySelector('.swipe-image');
const swipeHint = document.querySelector('.swipe-hint');

let isSwiping = false;
let startY = 0;
let currentY = 0;
let translateY = 0;

// Update time and date
function updateTimeAndDate() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    timeElement.textContent = now.toLocaleTimeString('id-ID');
    dateElement.textContent = now.toLocaleDateString('id-ID', options);
}

// Start swipe
function startSwipe(event) {
    event.preventDefault(); // Prevent default drag behavior
    isSwiping = true;
    startY = event.touches ? event.touches[0].clientY : event.clientY; // Get starting Y position
}

// Track swipe movement
function moveSwipe(event) {
    if (!isSwiping) return;
    currentY = event.touches ? event.touches[0].clientY : event.clientY; // Get current Y position
    translateY = Math.max(0, startY - currentY); // Calculate translation, prevent negative values
    swipeImage.style.transform = `translateY(-${translateY}px)`; // Apply translation
}

// End swipe
function endSwipe() {
    if (!isSwiping) return;
    isSwiping = false;

    // Trigger animation if swipe is sufficient
    if (translateY > 150) {
        startSwipeAnimation();
    } else {
        resetSwipe();
    }
}

// Trigger swipe animation
function startSwipeAnimation() {
    swipeHint.style.display = 'none'; // Hide hint
    swipeImage.style.transition = 'transform 0.5s ease';
    swipeImage.style.transform = 'translateY(-100%)'; // Slide image upwards

    // Redirect to portfolio page after animation
    setTimeout(() => {
        window.location.href = "../portofolio/index.html"; // Adjust path to portfolio
    }, 500); // Match animation duration
}

// Reset swipe position
function resetSwipe() {
    swipeImage.style.transition = 'transform 0.3s ease';
    swipeImage.style.transform = 'translateY(0)'; // Reset position to initial state
}

// Add event listeners for touch devices
swipeContainer.addEventListener('touchstart', startSwipe);
swipeContainer.addEventListener('touchmove', moveSwipe);
swipeContainer.addEventListener('touchend', endSwipe);

// Add event listeners for mouse (desktop)
swipeContainer.addEventListener('mousedown', (event) => {
    startSwipe(event);
    window.addEventListener('mousemove', moveSwipe);
    window.addEventListener('mouseup', () => {
        endSwipe();
        window.removeEventListener('mousemove', moveSwipe);
    });
});





// Initialize time and date
updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);