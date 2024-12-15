const swipeContainer = document.querySelector('.swipe-container');
const portfolioContainer = document.querySelector('.portfolio-container');

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
    swipeContainer.style.transition = 'none'; // Disable transition during swipe
    portfolioContainer.style.transition = 'none';
}

// Track swipe movement
function moveSwipe(event) {
    if (!isSwiping) return;
    currentY = event.touches ? event.touches[0].clientY : event.clientY; // Get current Y position
    translateY = currentY - startY; // Calculate translation (positive for upward swipe)

    // Prevent swiping downward
    if (translateY > 0) translateY = 0;

    // Update positions
    swipeContainer.style.transform = `translateY(${translateY}px)`;
    portfolioContainer.style.transform = `translateY(calc(100% + ${translateY}px))`;
}

// End swipe
function endSwipe() {
    if (!isSwiping) return;
    isSwiping = false;

    const threshold = -window.innerHeight * 0.2; // 20% of viewport height
    if (translateY < threshold) {
        // Complete transition to portfolio
        swipeContainer.style.transition = 'transform 0.5s ease';
        portfolioContainer.style.transition = 'transform 0.5s ease';
        swipeContainer.style.transform = 'translateY(-100%)';
        portfolioContainer.style.transform = 'translateY(0)';
    } else {
        // Reset positions
        swipeContainer.style.transition = 'transform 0.3s ease';
        portfolioContainer.style.transition = 'transform 0.3s ease';
        swipeContainer.style.transform = 'translateY(0)';
        portfolioContainer.style.transform = 'translateY(100%)';
    }
}

// Add event listeners for touch devices
swipeContainer.addEventListener('touchstart', startSwipe);
swipeContainer.addEventListener('touchmove', moveSwipe);
swipeContainer.addEventListener('touchend', endSwipe);

// Add event listeners for mouse (desktop)
swipeContainer.addEventListener('mousedown', (event) => {
    startSwipe(event);
    const moveListener = (e) => moveSwipe(e);
    const endListener = () => {
        endSwipe();
        window.removeEventListener('mousemove', moveListener);
        window.removeEventListener('mouseup', endListener);
    };
    window.addEventListener('mousemove', moveListener);
    window.addEventListener('mouseup', endListener);
});

// Initialize time and date
updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);
