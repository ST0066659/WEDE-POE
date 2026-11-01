
// website search

async function searchWebsite() {
    const searchInput = document.getElementById("searchInput").value
        .toLowerCase().trim();

    const results = document.getElementById("searchResults");
    results.innerHTML = "";

    if (searchInput === "") {
        results.textContent = "Please enter a search term.";
        return;
    }

    const pages = [
        "index.html",
        "about.html",
        "services.html",
        "enquiry.html",
        "contact.html"
    ];

    for (let page of pages) {
        try {
            const response = await fetch(page);

            if (!response.ok) continue;

            const html = await response.text();

            const pageDocument = new DOMParser().parseFromString(
                html, "text/html"
            );

            const mainContent = pageDocument.querySelector("main");

            if (mainContent &&
                mainContent.innerText.toLowerCase().includes(searchInput)) {
                window.location.href = page;
                return;
            }

        } catch (error) {
            console.log("Could not search " + page, error);
        }
    }

    results.textContent = "Search not found.";
}


// image lightbox

const imageLightbox = document.querySelector("#images-lightbox");
const enlargedImage = document.querySelector("#lightbox-image");
const closeLightboxButton = document.querySelector("#close-lightbox");

const productImages = document.querySelectorAll(".lightbox-images");

if (imageLightbox && enlargedImage && closeLightboxButton) {

    productImages.forEach(function (productImage) {

        productImage.addEventListener("click", function () {

            enlargedImage.src = productImage.src;
            enlargedImage.alt = productImage.alt;

            imageLightbox.showModal();

        });

    });

    closeLightboxButton.addEventListener("click", function () {
        imageLightbox.close();
    });

    imageLightbox.addEventListener("click", function (event) {
        if (event.target === imageLightbox) {
            imageLightbox.close();
        }
    });
}


// Opening hours accordion

document.querySelectorAll(
    ".accordion-button, .according-button"
).forEach((button) => {

    button.addEventListener("click", () => {

        const details = document.getElementById(
            button.getAttribute("aria-controls")
        );

        if (!details) return;

        const willOpen = details.hidden;

        details.hidden = !willOpen;

        button.setAttribute("aria-expanded", String(willOpen));

        button.textContent = willOpen
            ? "Hide Opening Hours"
            : "Show Opening Hours";

    });

});


// enquiry form validation and ajax

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const responseMessage =
            document.getElementById("enquiryResponse");

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        responseMessage.textContent = "Submitting your enquiry...";

        try {

            const response = await fetch(enquiryForm.action, {
                method: "POST",
                body: new FormData(enquiryForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {

                const enquiryType =
                    document.getElementById("enquiry-type").value;

                const messages = {
                    "Adoption": "Thank you for your adoption enquiry. Our team will contact you about animal availability and the adoption process.",
                    "Volunteering": "Thank you for your interest in volunteering. Our team will contact you about available opportunities.",
                    "Sponsorship": "Thank you for your sponsorship enquiry. Our team will contact you about ways to support our organisation.",
                    "Foster Care": "Thank you for your foster care enquiry. Our team will contact you about available opportunities."
                };

                responseMessage.textContent =
                    messages[enquiryType];

                enquiryForm.reset();

            } else {
                responseMessage.textContent =
                    "Your enquiry could not be submitted. Please try again.";
            }

        } catch (error) {

            responseMessage.textContent =
                "An error occurred. Please check your internet connection and try again.";

        }

    });

}


// contact form validation and ajax

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const responseMessage =
            document.getElementById("contactResponse");

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        responseMessage.textContent = "Sending your message...";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {

                responseMessage.textContent =
                    "Thank you for contacting Paws & Hope Animal Rescue. Your message has been sent.";

                contactForm.reset();

            } else {

                responseMessage.textContent =
                    "Your message could not be sent. Please try again.";

            }

        } catch (error) {

            responseMessage.textContent =
                "An error occurred. Please check your internet connection and try again.";

        }

    });

}

