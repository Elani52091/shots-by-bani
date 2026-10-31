document.addEventListener("DOMContentLoaded", function () {

    // GALLERY SEARCH
    const searchInput = document.getElementById("gallerySearch");
    const galleryImages = document.querySelectorAll(".gallery figure");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchText = searchInput.value.toLowerCase();

            galleryImages.forEach(function (image) {
                image.style.display =
                    image.textContent.toLowerCase().includes(searchText)
                    ? ""
                    : "none";
            });
        });
    }

    // GALLERY LIGHTBOX
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    document.querySelectorAll(".gallery img").forEach(function (photo) {
        photo.addEventListener("click", function () {
            if (lightbox && lightboxImage) {
                lightboxImage.src = photo.src;
                lightboxImage.alt = photo.alt;
                lightbox.style.display = "flex";
            }
        });
    });

    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener("click", function () {
            lightbox.style.display = "none";
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // AJAX FORM SUBMISSION
    function connectForm(formId, messageId, subject) {
        const form = document.getElementById(formId);
        const message = document.getElementById(messageId);

        if (!form || !message) return;

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            message.textContent = "Sending your message...";

            const formData = new FormData(form);
            formData.append("_subject", subject);

            try {
                const response = await fetch(
                    "https://formsubmit.co/ajax/Memoriesbyjpegbani@icloud.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

                const result = await response.json();

                if (response.ok && result.success) {
                    message.textContent =
                        "Thank you! Your message has been submitted successfully.";

                    message.style.color = "green";
                    form.reset();
                } else {
                    throw new Error("Submission failed");
                }

            } catch (error) {
                message.textContent =
                    "Sorry, your message could not be sent. Please try again or contact us directly.";

                message.style.color = "red";
            }
        });
    }

    connectForm(
        "enquiryForm",
        "formMessage",
        "New Photography Enquiry"
    );

    connectForm(
        "contactForm",
        "contactFormMessage",
        "New Contact Message"
    );

});
