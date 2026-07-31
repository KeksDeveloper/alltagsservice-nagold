"use strict";

const GA_MEASUREMENT_ID = "G-TE2TE8DNJK";

let analyticsLoaded = false;

/**
 * Lädt Google Analytics erst nach ausdrücklicher Zustimmung.
 */
function loadGoogleAnalytics() {
    if (analyticsLoaded) {
        return;
    }

    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());

    window.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
    });

    window.gtag("config", GA_MEASUREMENT_ID, {
        anonymize_ip: true
    });

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src =
        "https://www.googletagmanager.com/gtag/js?id=" +
        encodeURIComponent(GA_MEASUREMENT_ID);

    analyticsScript.onerror = function () {
        console.error("Google Analytics konnte nicht geladen werden.");
        analyticsLoaded = false;
    };

    document.head.appendChild(analyticsScript);
}