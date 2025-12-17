const enterButton = document.getElementById('enter-btn');
const flashOverlay = document.getElementById('flash-overlay');
const welcomeScreen = document.getElementById('welcome-screen');
const mainMenuScreen = document.getElementById('main-menu-screen');
const campaignScreen = document.getElementById('campaign-screen');
const iconScreen = document.getElementById('icon-screen');
const extraScreen = document.getElementById('extra-screen');
const contactScreen = document.getElementById('contact-screen');

enterButton.addEventListener('click', function () {
    mainMenuScreen.classList.remove('hidden');

    mainMenuScreen.scrollIntoView({behavior: 'smooth'});

    // Wait for the scroll to finish before hiding the welcome screen
    function hideWelcome() {
        welcomeScreen.classList.add('hidden');

        window.scrollTo(0, 0);

        window.removeEventListener('scrollend', hideWelcome);
    }

    window.addEventListener('scrollend', hideWelcome);

    // Fallback for older browsers: hide after 1 second (approx. scroll time)
    setTimeout(hideWelcome, 1000);
});

// Get all navigation links
const navLinks = document.querySelectorAll('#nav-menu a');

// Create a list of all screens to make hiding them easier
const allScreens = [mainMenuScreen, campaignScreen, iconScreen, extraScreen, contactScreen];


// Helper function to handle the "Flash" swap
function flashSwap(toHide, toShow) {
    flashOverlay.style.opacity = '1';

    setTimeout(() => {
        // 3. Swap the screens while it's pitch black
        toHide.classList.add('hidden');
        toShow.classList.remove('hidden');

        const content = toShow.querySelector('.content-wrapper') || toShow.querySelector('ul');
        if (content) {
            content.classList.remove('animate-in'); // Reset
            void content.offsetWidth; // Force reflow to restart animation
            content.classList.add('animate-in');
        }

        flashOverlay.style.opacity = '0';
    }, 250);
}

// Menu Link Navigation
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').replace('#', '');
        const targetScreen = document.getElementById(targetId);

        flashSwap(mainMenuScreen, targetScreen);
    });
});

// Back Button Navigation
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const currentScreen = this.closest('div[id$="-screen"]'); // Finds the parent screen div

        flashSwap(currentScreen, mainMenuScreen);
    });
});