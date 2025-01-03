const swipeContainer = document.querySelector('.swipe-container');
const portfolioContainer = document.querySelector('.portfolio-container');

let isSwiping = false;
let startY = 0;
let currentY = 0;
let translateY = 0;


function updateTimeAndDate() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    timeElement.textContent = now.toLocaleTimeString('id-ID');
    dateElement.textContent = now.toLocaleDateString('id-ID', options);
}


function startSwipe(event) {
    event.preventDefault(); 
    isSwiping = true;
    startY = event.touches ? event.touches[0].clientY : event.clientY; 
    swipeContainer.style.transition = 'none'; 
    portfolioContainer.style.transition = 'none';
}


function moveSwipe(event) {
    if (!isSwiping) return;
    currentY = event.touches ? event.touches[0].clientY : event.clientY; 
    translateY = currentY - startY; 

   
    if (translateY > 0) translateY = 0;

    
    swipeContainer.style.transform = `translateY(${translateY}px)`;
    portfolioContainer.style.transform = `translateY(calc(100% + ${translateY}px))`;
}


function endSwipe() {
    if (!isSwiping) return;
    isSwiping = false;

    const threshold = -window.innerHeight * 0.2; 
    if (translateY < threshold) {
        swipeContainer.style.transition = 'transform 0.5s ease';
        portfolioContainer.style.transition = 'transform 0.5s ease';
        swipeContainer.style.transform = 'translateY(-100%)';
        portfolioContainer.style.transform = 'translateY(0)';
    } else {
        swipeContainer.style.transition = 'transform 0.3s ease';
        portfolioContainer.style.transition = 'transform 0.3s ease';
        swipeContainer.style.transform = 'translateY(0)';
        portfolioContainer.style.transform = 'translateY(100%)';
    }
}

swipeContainer.addEventListener('touchstart', startSwipe);
swipeContainer.addEventListener('touchmove', moveSwipe);
swipeContainer.addEventListener('touchend', endSwipe);

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

updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);
