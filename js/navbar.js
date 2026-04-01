/**
 * Michelle's Portfolio - Unified Navigation Component
 * This script injects the navigation bar with theme support and active link detection.
 */

function initNavbar(theme = 'dark') {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    // Detect Current Page
    const currentPath = window.location.pathname;
    const isHome = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/');
    const isPlay = currentPath.includes('visual-playground.html');
    const isAbout = currentPath.includes('about-me.html');

    // Theme Configs
    const themes = {
        dark: {
            headerClass: "border-[#333] bg-[#1f1f1f57] text-white",
            logoClass: "",
            linkClass: "text-gray-300",
            activeClass: "text-white",
            btnBorder: "border-[#333]",
            btnBg: "bg-[rgba(31,31,31,0.62)]",
            mobileBorder: "border-white/5"
        },
        light: {
            headerClass: "border-gray-100 bg-white/80 text-black",
            logoClass: "invert",
            linkClass: "text-gray-600",
            activeClass: "text-black font-bold",
            btnBorder: "border-gray-200",
            btnBg: "bg-white",
            mobileBorder: "border-black/5"
        }
    };

    const config = themes[theme] || themes.dark;

    const navHTML = `
    <header id="main-header"
        class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[2000] flex flex-col items-center pl-6 pr-6 py-3 backdrop-blur-md rounded-full border ${config.headerClass} w-[calc(100%-2rem)] sm:w-auto transition-all duration-300 ease-in-out">

        <div class="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
            <div class="flex items-center">
                <a href="index.html" class="nav-logo-link">
                    <img src="image/logo.png" alt="Logo" class="h-4 opacity-80 hover:opacity-100 transition-opacity ${config.logoClass}">
                </a>
            </div>

            <nav class="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
                ${renderLink('index.html', 'Home', isHome)}
                ${renderLink('visual-playground.html', 'Visual Playground', isPlay)}
                ${renderLink('about-me.html', 'About Me', isAbout)}
            </nav>

            <div class="hidden sm:flex items-center gap-2 sm:gap-3">
                <a href="https://www.linkedin.com/in/michelleguanux/" target="_blank"
                    class="px-4 py-2 sm:px-3 text-xs sm:text-sm border ${config.btnBorder} ${config.btnBg} ${config.linkClass} rounded-full hover:border-black/50 hover:text-black transition-colors duration-200 w-full sm:w-auto text-center">
                    Contact Me
                </a>
                <div class="relative group w-full sm:w-auto">
                    <div class="absolute inset-0 -m-2 rounded-full hidden sm:block bg-gray-100 opacity-40 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"></div>
                    <a href="Michelle%20Guan%20-%20ATS.pdf" target="_blank"
                        class="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 w-full sm:w-auto text-center inline-block">
                        Resume
                    </a>
                </div>
            </div>

            <button id="menu-toggle"
                class="sm:hidden flex items-center justify-center w-8 h-8 ${config.linkClass} focus:outline-none"
                aria-label="Open Menu">
                <svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        <div id="mobile-menu"
            class="sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden max-h-0 opacity-0 pt-0 pointer-events-none">
            <nav class="flex flex-col items-center space-y-4 text-base w-full py-4 border-t ${config.mobileBorder} mt-4">
                <a href="index.html" class="${isHome ? config.activeClass : config.linkClass} hover:text-white transition-colors w-full text-center">Home</a>
                <a href="visual-playground.html" class="${isPlay ? config.activeClass : config.linkClass} hover:text-white transition-colors w-full text-center">Visual Playground</a>
                <a href="about-me.html" class="${isAbout ? config.activeClass : config.linkClass} hover:text-white transition-colors w-full text-center">About Me</a>
            </nav>
            <div class="flex flex-col items-center space-y-4 mt-4 w-full pb-4">
                <a href="https://www.linkedin.com/in/michelleguanux/" target="_blank"
                    class="px-4 py-2 text-sm border ${config.btnBorder} ${config.btnBg} ${config.linkClass} rounded-full w-full text-center">Contact Me</a>
                <a href="Michelle%20Guan%20-%20ATS.pdf" target="_blank"
                    class="px-4 py-2 text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full w-full text-center">Resume</a>
            </div>
        </div>
    </header>
    `;

    navbarPlaceholder.innerHTML = navHTML;

    // --- LOGIC ---
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');
    let isOpen = false;
    let shapeTimeout = null;

    menuToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        if (shapeTimeout) clearTimeout(shapeTimeout);

        if (isOpen) {
            header.classList.remove('rounded-full');
            header.classList.add('rounded-xl');
            mobileMenu.classList.remove('max-h-0', 'opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('max-h-[1000px]', 'opacity-100', 'pt-4');
            iconOpen.classList.add('hidden');
            iconClose.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('max-h-0', 'opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('max-h-[1000px]', 'opacity-100', 'pt-4');
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
            shapeTimeout = setTimeout(() => {
                header.classList.remove('rounded-xl');
                header.classList.add('rounded-full');
            }, 300);
        }
    });

    function renderLink(href, text, isActive) {
        const textClass = isActive ? config.activeClass : config.linkClass;
        const hoverTextClass = theme === 'dark' ? 'text-white' : 'text-black';

        return `
        <a href="${href}" class="group relative inline-block overflow-hidden h-5 text-sm">
            <div class="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
                <span class="${textClass} h-5 flex items-center">${text}</span>
                <span class="${hoverTextClass} h-5 flex items-center">${text}</span>
            </div>
        </a>
        `;
    }
}

// Global invocation helper
document.addEventListener('DOMContentLoaded', () => {
    // If initNavbar was called with a specific theme in the HTML, don't override.
    // Otherwise, you can set a default here or call it from the page script.
});
