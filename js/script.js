"use strict";


document.addEventListener("DOMContentLoaded", function () {

    const SERVICE_ID = "service_snpabgt";
    const TEMPLATE_ID = "template_6xj23qu";
    const PUBLIC_KEY = "oRzwBG1a6spOsAfZT";


    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".navigation");
    const navigationLinks = document.querySelectorAll(".navigation a");

    const requestForm = document.querySelector("#request-form");
    const serviceSelect = document.querySelector("#service");
    const serviceLinks = document.querySelectorAll("[data-service]");

    const submitButton = document.querySelector("#submit-button");
    const formMessage = document.querySelector("#form-message");

    const currentYear = document.querySelector("#current-year");

    const offerPanel = document.getElementById("offer-panel");
    const offerTrigger = document.getElementById("offer-trigger");
    const offerClose = document.getElementById("offer-close");
    const offerButton = document.querySelector(".offer-button");

    const offerDays = document.getElementById("offer-days");
    const offerHours = document.getElementById("offer-hours");
    const offerMinutes = document.getElementById("offer-minutes");
    const offerSeconds = document.getElementById("offer-seconds");

    const offerEndDate = new Date("2026-09-30T23:59:59");

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

                console.error("EmailJS-Fehler:", error);

                showError(
                    "Die Anfrage konnte leider nicht gesendet werden. " +
                    "Bitte versuchen Sie es erneut oder schreiben Sie direkt an " +
                    "service@alltagsservice-nagold.de."
                );

            } finally {

                submitButton.disabled = false;
                submitButton.textContent = "Anfrage absenden";

            }

        });

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

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / (1000));

        offerDays.textContent = days;
        offerHours.textContent = hours;
        offerMinutes.textContent = minutes;
        offerSeconds.textContent = seconds;

        console.log(distance);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
