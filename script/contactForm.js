function sendMessage() {
    const form = document.querySelector("#contact-form");
    if (!form) return; //Prevent sending blank form to emailJS when loading the page
    const sendBtn = document.querySelector(".send-button");
    let lastSent = 0;
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const trap = form.querySelector(".honeypot");
        if (trap.value !== "") {
            return;
        }
        const now = Date.now();
        if (now - lastSent < 30000) {
            alert("Please wait before sending another bottle!");
            return;
        }
        lastSent = now;
        sendBtn.disabled = true;
        const spinner = form.querySelector(".spinner");
        spinner.classList.add("activeSpinner");
        const templateParams = {
            name: document.querySelector("#fname").value,
            email: document.querySelector("#fmail").value,
            subject: document.querySelector("#fsubject").value,
            message: document.querySelector("#fmessage").value,
        };
        try {
            await emailjs.send("service_xpzqxxe", "template_0k389n9", templateParams);
            alert("Bottle sent! \n\nCheck your email for new voyage.");
            form.reset();
        } catch (error) {
            console.log("FAILED...", error);
            alert("Iceberg ahead. Change course.");
        } finally {
            spinner.classList.remove("activeSpinner");
            sendBtn.disabled = false;
        }
    });
}