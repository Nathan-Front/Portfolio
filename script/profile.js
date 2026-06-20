function hoverCardDropAnchor() {
   const cards = document.querySelectorAll(".logbook-link");
   if (!cards) return;
   cards.forEach(anchor => {
        anchor.addEventListener("mouseenter", () => {
            document.querySelector(".explored-islands").classList.add("drop");
        });
   });

}