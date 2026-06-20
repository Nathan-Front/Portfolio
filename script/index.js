
async function fetchHTML() {
    const page = document.body.dataset.page;
    const app = document.getElementById("app");
    const body = document.body;
    //Content fallback
    app.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading your voyage...</p>
        </div>
    `;
    try {
        const [
            nav,
            foot,
        ] = await Promise.all([
            fetch("./components/navigation/nav.html").then(res => {
                if (!res.ok) throw new Error("Navigation failed");
                return res.text();
            }),
            fetch("./components/footer/foot.html").then(res => {
                if (!res.ok) throw new Error("Footer failed");
                return res.text();
            }),
        ]);
        body.insertAdjacentHTML("beforeend", nav);
        let sections = [];
        if (page === "voyage") {
            sections = await Promise.all([
                fetch("./components/voyage/voyageFirstSection.html").then(res => res.text()),
                fetch("./components/voyage/voyageSecondSection.html").then(res => res.text()),
                fetch("./components/voyage/backToTop.html").then(res => res.text()),
            ]);
        }
        if (page === "profile") {
            sections = await Promise.all([
                fetch("./components/profile/profileFirstSection.html").then(res => res.text()),
                fetch("./components/profile/profileSecondSection.html").then(res => res.text()),
            ]);
        }
        if (page === "contact") {
            sections = await Promise.all([
                fetch("./components/contact/contactFirstSection.html").then(res => res.text()),
                fetch("./components/contact/contactSecondSection.html").then(res => res.text()),
            ]);
        }
        //remove loading screen
        app.innerHTML = "";
        //add page content
        sections.forEach(sec => {app.insertAdjacentHTML("beforeend", sec);});
        body.insertAdjacentHTML("beforeend", foot);
        toggleNavbar();
        timelineIntersecting();
        flyText();
        displayOneletter();
        timelineIntersectingLeft();
        timelineIntersectingRight();
        displayMore();
        boatTimeline();
        backToTop();
        openMobileNav();
        hoverCardDropAnchor();
        if (page === "contact") {
            sendMessage();
        }
    } catch(error) {
        console.error(error);
        app.innerHTML = `
            <div class="error-page">
                <h2>The ship hit a storm!</h2>
                <p>Unable to set sail.</p>
                <button onclick="location.reload()">
                    Sail Again
                </button>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", fetchHTML);

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
    //Break the text into individual span tags
    const characterSpans = [...text].map((char) => {
        const span = document.createElement("span");
        if (char === " ") {
        span.textContent = " "; /*Use a standard normal space instead of &nbsp;*/
        } else {
        span.textContent = char;
        }
        container.appendChild(span);
        return span;
    });
    //Type them out one by one by adding the visual CSS class
    let charIndex = 0;
    const typingSpeed = 20; //Lower numbers mean faster typing (in milliseconds)

    function typeSequence() {
      if (charIndex < characterSpans.length) {
        characterSpans[charIndex].classList.add("revealed");
        charIndex++;
        setTimeout(typeSequence, typingSpeed);
      }
    }
    //Kick off the typing sequence
    typeSequence();
}

function displayMore() {
    const logSections = document.querySelectorAll(".log-section");
    logSections.forEach(section => {
        const btn = section.querySelector(".read-more-btn");
        const text = section.querySelector(".log-text");
        const readMore = section.querySelector(".read-more-btn");
        btn.addEventListener("click", () => {
            if (text.classList.contains("expanded")) {
                text.style.maxHeight = "4.5rem";
                text.classList.remove("expanded");
                readMore.classList.remove("ON");
                readMore.textContent = "Read more";
            } else {
                text.style.maxHeight = text.scrollHeight + "px";
                text.classList.add("expanded");
                readMore.classList.add("ON");
                readMore.textContent = "Read less";
            }
        });
    });
}

function boatTimeline() {
    const boatContainer = document.querySelector(".voyage-ship");
    const boat = document.querySelector(".boat");
    const progressBar = document.querySelector(".timeline-progress-bar");
    if(!boatContainer || !boat || !progressBar) return;
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        const scrollPercent = currentScrollY /
            (document.body.scrollHeight - window.innerHeight);
        boatContainer.style.top = `${50 + scrollPercent}vh`;
        if (currentScrollY > lastScrollY) {
            boat.style.transform = "rotate(0deg)";
            boatContainer.classList.add("down");
            boatContainer.classList.remove("up");
            progressBar.classList.add("down");
            progressBar.classList.remove("up");
        } else {
            boat.style.transform = "rotate(180deg)";
            boatContainer.classList.remove("down");
            boatContainer.classList.add("up");
            progressBar.classList.remove("down");
            progressBar.classList.add("up");
        }
        lastScrollY = currentScrollY;
    });
}

function backToTop() {
    const backToTop = document.getElementById("backToTop");
    if(!backToTop) return;
    let hideTimer;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 2000) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            backToTop.classList.remove("show");
        }, 5000);
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}