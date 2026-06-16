let mobileNavOpen = false;
function toggleNavbar() {
    const navbar = document.querySelector(".navbar");
    const banner = document.querySelector(".main-title-container");
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
    if (mobileNavOpen) return;
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
        navbar.classList.add("hide");
        banner.classList.add("hideBanner");
    } else {
        navbar.classList.remove("hide");
        banner.classList.remove("hideBanner");
    }
    lastScrollY = currentScrollY;
    });
}

function openMobileNav() {
    const openBtn = document.querySelector(".mobile-nav-open");
    const mobileNavContent = document.querySelector(".nav-links-wrapper");
    const closeBtn = document.querySelector(".close-mobile-nav");
    const overlay = document.querySelector(".overlay");
    const navbar = document.querySelector(".navbar");
    openBtn.addEventListener("click", () => {
        mobileNavContent.classList.toggle("openNav");
        if (mobileNavContent.classList.contains("openNav")) {
            document.documentElement.classList.toggle("no-scroll");
            document.body.classList.toggle("no-scroll");
            overlay.classList.add("overlayActive")
            mobileNavOpen = true;
        }  
    });
    closeBtn.addEventListener("click", () => {
        if (mobileNavContent.classList.contains("openNav")) {
            mobileNavContent.classList.remove("openNav");
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
            overlay.classList.remove("overlayActive")
            mobileNavOpen = false;
        }  
    })
}