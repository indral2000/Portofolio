/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    } else {
        console.warn('Toggle or nav element not found');
    }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    if (navMenu) {
        navMenu.classList.remove('show');
    } else {
        console.warn('Nav menu element not found');
    }
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            if (sectionsClass) {
                sectionsClass.classList.add('active-link');
            }
        } else {
            if (sectionsClass) {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    // reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

/*===== TOGGLE DARK MODE =====*/
const buttonToggle = document.querySelector('button');
const syncCheckbox = document.querySelector('#sync');

const toggleDarkMode = () => {
    const isPressed = buttonToggle.matches("[aria-pressed=true]");
    if (syncCheckbox) {
        document.body.setAttribute("data-dark-mode", isPressed ? "false" : "true");
    }
    buttonToggle.setAttribute("aria-pressed", isPressed ? "false" : "true");
};

if (buttonToggle) {
    buttonToggle.addEventListener("click", toggleDarkMode);
} else {
    console.warn('Button toggle element not found');
}

