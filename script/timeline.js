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

function displayBubbles() {
    const boats = document.querySelectorAll(".boat");
    if(!boats) return;
    let activeBoat = null;
    let closestDistance = Infinity;

    boats.forEach((boat) => {

        const timelineItem =
            boat.closest(".timeline-item");

        const rect =
            timelineItem.getBoundingClientRect();

        const itemCenter =
            rect.top + rect.height / 2;

        const viewportCenter =
            window.innerHeight / 2;

        const distance =
            Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            activeBoat = boat;
        }

    });

    if (activeBoat) {
        createBubbles(activeBoat);
    }

}

function createBubbles(boat){
    const rect = boat.getBoundingClientRect();
    for(let i = 0; i < 5; i++){

        const bubble = document.createElement("div");

        bubble.classList.add("bubble");

        const offsetX =
            (Math.random() - 0.5) * 40;

        const offsetY =
            Math.random() * 20;

        bubble.style.left =
            `${rect.left + rect.width / 2 + offsetX}px`;

        bubble.style.top =
            `${window.scrollY + rect.top - offsetY}px`;

        document.body.appendChild(bubble);

        bubble.addEventListener(
            "animationend",
            () => bubble.remove()
        );
    }
}