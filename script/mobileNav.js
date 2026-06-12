function toggleNavbar() {
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }
    lastScrollY = currentScrollY;
    });
}

function openMobileNav() {
    const openBtn = document.querySelector(".mobile-nav-open");
    const mobileNavContent = document.querySelector(".nav-links-wrapper");
    const closeBtn = document.querySelector(".close-mobile-nav");
    const overlay = document.querySelector(".overlay");
    openBtn.addEventListener("click", () => {
        mobileNavContent.classList.toggle("openNav");
        if (mobileNavContent.classList.contains("openNav")) {
            document.body.classList.add("menu-open");
            overlay.style = "display: flex";
        }  
    });
    closeBtn.addEventListener("click", () => {
        if (mobileNavContent.classList.contains("openNav")) {
            mobileNavContent.classList.remove("openNav");
            document.body.classList.remove("menu-open");
            overlay.style = "display: none";
        }  
    })
}