WEBSITE SEARCH

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

