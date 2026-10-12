"use strict";


document.addEventListener("DOMContentLoaded", function () {

    const SERVICE_ID = "service_snpabgt";
    const TEMPLATE_ID = "template_6xj23qu";
    const PUBLIC_KEY = "oRzwBG1a6spOsAfZT";

    const CLOUD_NAME = "x8w5zieq";
    const UPLOAD_PRESET = "alltagsservice_anfragen";


    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".navigation");
    const navigationLinks = document.querySelectorAll(".navigation a");

    const requestForm = document.querySelector("#request-form");
    const serviceSelect = document.querySelector("#service");
    const serviceLinks = document.querySelectorAll("[data-service]");

    const submitButton = document.querySelector("#submit-button");
    const formMessage = document.querySelector("#form-message");

    const imageInput = document.querySelector("#images");
    const uploadFileList = document.querySelector("#upload-file-list");

   
    const currentYear = document.querySelector("#current-year");

    const offerPanel = document.getElementById("offer-panel");
    const offerTrigger = document.getElementById("offer-trigger");
    const offerClose = document.getElementById("offer-close");
    const offerButton = document.querySelector(".offer-button");

    const offerDays = document.getElementById("offer-days");
    const offerHours = document.getElementById("offer-hours");
    const offerMinutes = document.getElementById("offer-minutes");
    const offerSeconds = document.getElementById("offer-seconds");

    const offerEndDate = new Date("2026-12-31T23:59:59");

    /* =========================
       EMAILJS STARTEN
    ========================= */

    if (typeof emailjs !== "undefined") {

        emailjs.init({
            publicKey: PUBLIC_KEY
        });

    } else {

        console.error("EmailJS konnte nicht geladen werden.");

    }


    /* =========================
       MOBILE NAVIGATION
    ========================= */

    function closeMenu() {

        if (!menuButton || !navigation) {
            return;
        }

        menuButton.classList.remove("active");
        navigation.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");

    }


    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            const menuIsOpen = navigation.classList.toggle("open");

            menuButton.classList.toggle("active", menuIsOpen);

            menuButton.setAttribute(
                "aria-expanded",
                String(menuIsOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                menuIsOpen
            );

        });


        navigationLinks.forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

    }


    /* =========================
       LEISTUNG AUSWÄHLEN
    ========================= */

    serviceLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const selectedService = link.dataset.service;

            if (!serviceSelect || !selectedService) {
                return;
            }

            serviceSelect.value = selectedService;

        });

    });

   /* =========================
       BILD ZU CLOUDINARY HOCHLADEN
    ========================= */

    async function uploadImage(file) {

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Cloudinary Fehler:", data);

            throw new Error(data.error?.message || "Bild konnte nicht hochgeladen werden.");
        }

        console.log("Bild konnte nicht geladen werden.", data.secure_url);        

        return data.secure_url;
    }


    /* =========================
       FORMULAR SENDEN
    ========================= */

    

    if (requestForm && submitButton && formMessage) {

        requestForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            if (!requestForm.checkValidity()) {

                requestForm.reportValidity();
                return;

            }


            if (typeof emailjs === "undefined") {

                showError(
                    "Der E-Mail-Dienst konnte nicht geladen werden. " +
                    "Bitte laden Sie die Seite neu oder kontaktieren Sie uns direkt."
                );

                return;

            }


            submitButton.disabled = true;
            submitButton.textContent = "Anfrage wird gesendet …";

            formMessage.className = "form-message";
            formMessage.textContent = "";


            try {

                let imageLinks = [];

                if (imageInput && imageInput.files.length > 0) {
                    submitButton.textContent = "Bilder werden hochgeladen ...";

                    const files = Array.from(imageInput.files);

                    imageLinks = await Promise.all (
                        files.map(function (file) {
                            return uploadImage(file);
                        })
                    );
                }

                let imageLinksInput = 
                    requestForm.querySelector('input[name="image_links"]');

                if (!imageLinksInput) {
                    imageLinksInput = document.createElement("input");

                    imageLinksInput.type = "hidden";
                    imageLinksInput.name = "image_links";

                    requestForm.appendChild(imageLinksInput);
                }

                if (imageLinks.length > 0) {
                    imageLinksInput.value = imageLinks.join("\n");
                } else {
                    imageLinksInput.value = "Keine Bilder hochgeladen";
                }

                submitButton.textContent = "Anfrage wird gesendet ...";

                if (imageInput) {
                    imageInput.disabled = true;
                }

                await emailjs.sendForm(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    requestForm,
                    {
                        publicKey: PUBLIC_KEY
                    }
                );


                formMessage.className =
                    "form-message form-message-success";

                formMessage.textContent =
                    "Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. " +
                    "Sie erhalten in Kürze eine Eingangsbestätigung per E-Mail. " +
                    "Wir melden uns anschließend persönlich bei Ihnen.";


                requestForm.reset();

                formMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            } catch (error) {

                console.error("Fehler beim Absenden:", error);

                const errorText = error?.text || error?.message || JSON.stringify(error);
                
                showError(
                    "Fehler: " + errorText
                );

            } finally {

                if (imageInput) {
                    imageInput.disabled = false;
                }

                submitButton.disabled = false;
                submitButton.textContent = "Anfrage absenden";

            }

        });

        if (imageInput && uploadFileList) {
        imageInput.addEventListener("change", function () {
            const files = imageInput.files;

            if(files.length === 0) {
                uploadFileList.textContent = "";
                return;
            }

            uploadFileList.textContent =
                files.length === 1
                ? "1 Bild auswählen"
                : files.length + " Bilder auswählen";
        });
    }
    }


    function showError(message) {

        if (!formMessage) {
            return;
        }

        formMessage.className =
            "form-message form-message-error";

        formMessage.textContent = message;

    }


    /* =========================
       AKTUELLES JAHR
    ========================= */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }
    
    /* =========================
       ANGEBOTS-WIDGET
    ========================= */
    
    function openOffer() {
        offerPanel.hidden = false;
        offerTrigger.setAttribute("aria-expanded", "true");
    }
    function closeOffer() {
        offerPanel.hidden = true;
        offerTrigger.setAttribute("aria-expanded", "false");
    }

    if (offerTrigger) {
        offerTrigger.addEventListener("click", openOffer);
    }

    if (offerClose) {
        offerClose.addEventListener("click", closeOffer);
    }
    
    if (offerButton) {
        offerButton.addEventListener("click", closeOffer);
    }

    function updateCountdown() {
        const now = new Date();
        const distance = offerEndDate - now;

        if (distance <= 0) {
            offerDays.textContent = "00";
            offerHours.textContent = "00";
            offerMinutes.textContent = "00";
            offerSeconds.textContent = "00";
            clearInterval(updateCountdown.intervalId);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / (1000));

        offerDays.textContent = String(days).padStart(2, "0");
        offerHours.textContent = String(hours).padStart(2, "0");
        offerMinutes.textContent = String(minutes).padStart(2, "0");
        offerSeconds.textContent = String(seconds).padStart(2, "0");

        console.log(distance);
    }

    updateCountdown();
    updateCountdown.intervalId = setInterval(updateCountdown, 1000);


});
