"use strict";

const CONSENT_STORAGE_KEY = "alltagsservice-cookie-consent";

document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const acceptButton = document.getElementById("cookie-accept");
    const rejectButton = document.getElementById("cookie-reject");
    const settingsButton = document.getElementById("cookie-settings");

    if (!banner || !acceptButton || !rejectButton) {
        console.error("Elemente des Cookie-Banners wurden nicht gefunden.");
        return;
    }

    const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);

    if (savedConsent === "accepted") {
    hideCookieBanner();

    if (typeof loadGoogleAnalytics === "function") {
        loadGoogleAnalytics();
    }
    }   else if (savedConsent === "rejected") {
        hideCookieBanner();
    } else {
        showCookieBanner();
    }

    acceptButton.addEventListener("click", function () {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    hideCookieBanner();

    if (typeof loadGoogleAnalytics === "function") {
        loadGoogleAnalytics();
    } else {
        console.error("Google Analytics konnte nicht geladen werden.");
    }
    });

    rejectButton.addEventListener("click", function () {
        localStorage.setItem(CONSENT_STORAGE_KEY, "rejected");
        removeAnalyticsCookies();
        hideCookieBanner();
    });

    if (settingsButton) {
        settingsButton.addEventListener("click", function () {
            showCookieBanner();
        });
    }

    function showCookieBanner() {
        banner.hidden = false;

        window.requestAnimationFrame(function () {
            banner.classList.add("cookie-banner--visible");
        });
    }

    function hideCookieBanner() {
        banner.classList.remove("cookie-banner--visible");

        window.setTimeout(function () {
            banner.hidden = true;
        }, 250);
    }
});

function removeAnalyticsCookies() {
    const cookieNames = document.cookie
        .split(";")
        .map(function (cookie) {
            return cookie.split("=")[0].trim();
        })
        .filter(function (name) {
            return name === "_ga" || name.startsWith("_ga_");
        });

    cookieNames.forEach(function (name) {
        deleteCookie(name, "/");
        deleteCookie(name, "/", window.location.hostname);
        deleteCookie(name, "/", "." + window.location.hostname);
    });
}

function deleteCookie(name, path, domain) {
    let cookie =
        name +
        "=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" +
        path +
        "; SameSite=Lax";

    if (domain) {
        cookie += "; domain=" + domain;
    }

    if (window.location.protocol === "https:") {
        cookie += "; Secure";
    }

    document.cookie = cookie;
}