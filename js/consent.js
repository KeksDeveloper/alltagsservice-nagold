alert("consent.js wurde geladen");

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const STORAGE_KEY = "alltagsservice-cookie-consent";

    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("cookie-accept");
    const rejectButton = document.getElementById("cookie-reject");
    const settingsButton = document.getElementById("cookie-settings");

    if (!banner) {
        console.error("Cookie-Banner wurde in der HTML-Datei nicht gefunden.");
        return;
    }

    function showBanner() {
        banner.hidden = false;
        banner.classList.add("cookie-banner--visible");
    }

    function hideBanner() {
        banner.classList.remove("cookie-banner--visible");
        banner.hidden = true;
    }

    function startAnalytics() {
        if (typeof loadGoogleAnalytics === "function") {
            loadGoogleAnalytics();
        } else {
            console.warn("Analytics-Funktion wurde nicht gefunden.");
        }
    }

    const consent = localStorage.getItem(STORAGE_KEY);

    if (consent === "accepted") {
        hideBanner();
        startAnalytics();
    } else if (consent === "rejected") {
        hideBanner();
    } else {
        showBanner();
    }

    if (acceptButton) {
        acceptButton.addEventListener("click", function () {
            localStorage.setItem(STORAGE_KEY, "accepted");
            hideBanner();
            startAnalytics();
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener("click", function () {
            localStorage.setItem(STORAGE_KEY, "rejected");
            hideBanner();
        });
    }

    if (settingsButton) {
        settingsButton.addEventListener("click", function () {
            showBanner();
        });
    }
});
