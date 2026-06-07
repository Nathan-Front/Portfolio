
async function fetchHTML() {
    const page = document.body.dataset.page;
     const app = document.getElementById("app");
     const body = document.body;
     const [
        nav,
        foot,
    ] = await Promise.all([
        fetch("./components/navigation/nav.html").then(res => res.text()),
        fetch("./components/footer/foot.html").then(res => res.text()),
    ])
    body.insertAdjacentHTML("beforeend", nav);
    if (page === "voyage") {
        const section = await Promise.all([
            fetch("./components/voyage/voyageFirstSection.html").then(res => res.text()),
            fetch("./components/voyage/voyageSecondSection.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
    }
    if (page === "profile") {
        const section = await Promise.all([
            fetch("./components/profile/profileFirstSection.html").then(res => res.text()),
            fetch("./components/profile/profileSecondSection.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
    }
    if (page === "contact") {
        const section = await Promise.all([
            fetch("./components/contact/contactFirstSection.html").then(res => res.text()),
            fetch("./components/contact/contactSecondSection.html").then(res => res.text()),
        ])
        section.forEach(sec => app.insertAdjacentHTML("beforeend", sec));
    }
    body.insertAdjacentHTML("beforeend", foot);
    toggleNavbar();
    timelineIntersecting();
    flyText(); 
    displayOneletter();
    timelineIntersectingLeft();
    timelineIntersectingRight();
    displayBubbles();
}
document.addEventListener("DOMContentLoaded", fetchHTML);

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

function timelineIntersecting() {
    const dates = document.getElementById("my-journey");
    if (!dates) return;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        {
            threshold: 0
        }
    );
    observer.observe(dates);
}
function flyText() {
    const textContainer = document.querySelector(".fly-text");
    if (!textContainer) return;
    const text = textContainer.textContent;
    
    textContainer.innerHTML = ""; 
    [...text].forEach((char) => {
      const span = document.createElement("span");
      //If it's a space, preserve it so words don't collapse together
      if (char === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = char;
      }
      //Generate random starting distances 
      const randomX = Math.floor(Math.random() * 600) - 300;
      const randomY = Math.floor(Math.random() * 600) - 300;
      //Generate a random rotation angle (between -180 - 180 degrees)
      const randomRotate = Math.floor(Math.random() * 360) - 180;
      //Pass these random values to CSS as variables
      span.style.setProperty("--x", `${randomX}px`);
      span.style.setProperty("--y", `${randomY}px`);
      span.style.setProperty("--rotate", `${randomRotate}deg`);
      textContainer.appendChild(span);
    });
}

function displayOneletter() {
    const container = document.getElementById("multiline-typewriter");
    if (!container) return;
    const text = container.textContent.replace(/\s+/g, ' ').trim();
    container.innerHTML = ""; 

    // 1. Break the text into individual span tags
    const characterSpans = [...text].map((char) => {
        const span = document.createElement("span");
        if (char === " ") {
        span.textContent = " "; /* Use a standard normal space instead of &nbsp; */
        } else {
        span.textContent = char;
        }
        container.appendChild(span);
        return span;
    });

    // 2. Type them out one by one by adding the visual CSS class
    let charIndex = 0;
    const typingSpeed = 20; // Lower numbers mean faster typing (in milliseconds)

    function typeSequence() {
      if (charIndex < characterSpans.length) {
        characterSpans[charIndex].classList.add("revealed");
        charIndex++;
        setTimeout(typeSequence, typingSpeed);
      }
    }

    // Kick off the typing sequence
    typeSequence();
}