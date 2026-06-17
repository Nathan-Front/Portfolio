function timelineIntersectingLeft() {
    const dates = document.querySelectorAll(".timeline-left");
    if(!dates) return;
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
    dates.forEach((date) => observer.observe(date));
}
function timelineIntersectingRight() {
    const dates = document.querySelectorAll(".timeline-right");
    if(!dates) return;
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
    dates.forEach((date) => observer.observe(date));
}

function hoverCardDropAnchor() {
   const cards = document.querySelectorAll(".logbook-link");
   cards.forEach(anchor => {
        anchor.addEventListener("mouseenter", () => {
            document.querySelector(".explored-islands").classList.add("drop");
        });
   });

}