// FIX: Listen for a click on the 'enter-btn' instead of the whole document.
const enterButton = document.getElementById('enter-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const flashOverlay = document.getElementById('flash-overlay');
const mainMenuScreen = document.getElementById('main-menu-screen');
const campaignScreen = document.getElementById('campaign-screen');
const iconScreen = document.getElementById('icon-screen');
const extraScreen = document.getElementById('extra-screen');
const contactScreen = document.getElementById('contact-screen');

enterButton.addEventListener('click', function () {

    // 1. Show the black flash overlay instantly (CSS transition handles the speed)
    flashOverlay.style.opacity = '1';

    // 2. Hide the original welcome screen immediately
    welcomeScreen.classList.add('hidden'); // Use the CSS class for hiding/showing

    // 3. After a very short delay, turn the flash off and show the menu
    setTimeout(function () {
        flashOverlay.style.opacity = '0';
        mainMenuScreen.classList.remove('hidden'); // Show the menu screen

        //Remove the enter button's animation to save resources
        enterButton.style.animation = 'none';

    }, 250);
});

// Get all navigation links
const navLinks = document.querySelectorAll('#nav-menu a');

// Create a list of all screens to make hiding them easier
const allScreens = [mainMenuScreen, campaignScreen, iconScreen, extraScreen, contactScreen];

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Stop the page from reloading or jumping

        // 1. Get the ID of the screen we want to show from the href (e.g., "#icon-screen")
        const targetId = this.getAttribute('href').replace('#', '');
        const targetScreen = document.getElementById(targetId);

        // 2. Hide all screens first
        allScreens.forEach(screen => screen.classList.add('hidden'));

        // 3. Show the target screen
        targetScreen.classList.remove('hidden');
    });
});

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        allScreens.forEach(screen => screen.classList.add('hidden'));
        mainMenuScreen.classList.remove('hidden');
    });
});