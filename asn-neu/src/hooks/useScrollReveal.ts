import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const selectors = [
    ".services-heading", ".services-card", ".services-note",
    ".about-heading", ".about-content", ".about-value",
    ".about-network-heading", ".about-person", ".about-partner",
    ".process-heading", ".process-step", ".process-footer",
    ".contact-information", ".contact-form", ".footer-top",
    ".gallery-heading", ".project-comparison", ".projects-heading",
].join(", ");

export default function useScrollReveal() {
    const { hash } = useLocation();
    const hashRef = useRef(hash);
    useEffect(() => { hashRef.current = hash; }, [hash]);
    useEffect(() => {
        // Inhalte bleiben jederzeit sichtbar, auch ohne Animationsunterstützung.
        if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const animations = new Map<Element, Animation>();
        const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors));
        const revealed = new WeakSet<Element>();

        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                observer.unobserve(entry.target);
                if (revealed.has(entry.target) || reducedMotion.matches) continue;
                revealed.add(entry.target);

                // Tastaturfokus und direkte Sprungziele bleiben sofort sichtbar.
                const hashTarget = document.getElementById(hashRef.current.slice(1));
                if (entry.target.contains(document.activeElement) ||
                    (hashTarget && (hashTarget.contains(entry.target) || entry.target.contains(hashTarget)))) continue;

                const siblings = elements.filter(element => element.parentElement === entry.target.parentElement);
                const delay = Math.min(siblings.indexOf(entry.target as HTMLElement), 3) * 55;
                const animation = entry.target.animate([
                    { opacity: 0, transform: "translateY(18px)" },
                    { opacity: 1, transform: "translateY(0)" },
                ], {
                    duration: 550,
                    delay,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "backwards",
                });
                animations.set(entry.target, animation);
                animation.onfinish = () => animations.delete(entry.target);
            }
        }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

        function configureMotion() {
            observer.disconnect();
            for (const animation of animations.values()) animation.cancel();
            animations.clear();
            if (!reducedMotion.matches) {
                for (const element of elements) {
                    if (!revealed.has(element)) observer.observe(element);
                }
            }
        }

        function revealFocusedContent(event: FocusEvent) {
            if (!(event.target instanceof Node)) return;
            for (const [element, animation] of animations) {
                if (element.contains(event.target)) {
                    animation.cancel();
                    animations.delete(element);
                }
            }
        }

        configureMotion();
        reducedMotion.addEventListener("change", configureMotion);
        document.addEventListener("focusin", revealFocusedContent);

        return () => {
            observer.disconnect();
            reducedMotion.removeEventListener("change", configureMotion);
            document.removeEventListener("focusin", revealFocusedContent);
            for (const animation of animations.values()) animation.cancel();
        };
    }, []);
}
