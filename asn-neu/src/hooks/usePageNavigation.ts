import { useEffect } from "react";
import { useLocation } from "react-router";

export default function usePageNavigation(title: string) {
    const { key, hash } = useLocation();
    useEffect(() => {
        document.title = title;
        const frame = window.requestAnimationFrame(() => {
            const target = hash ? document.getElementById(hash.slice(1)) : document.querySelector("main h1");
            if (target instanceof HTMLElement) {
                if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
                target.classList.add("navigation-focus-target");
                target.focus({ preventScroll: true });
            }
            // Startseite umfasst auch Infoleiste und Header oberhalb des Hero.
            if (hash === "#start") window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            else if (hash && target) target.scrollIntoView({ behavior: "instant", block: "start" });
            else window.scrollTo({ top: 0, behavior: "instant" });
        });
        return () => window.cancelAnimationFrame(frame);
    }, [key, hash, title]);
}
