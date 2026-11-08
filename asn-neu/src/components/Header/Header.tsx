import { Link, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";
import logo from '../../Pictures/optimized/logo.webp';
import { MapPin, Phone, Send, Menu, X } from "lucide-react";

const navigation = [
    ["Startseite", "#start"],
    ["Leistungen", "#leistungen"],
    ["Über uns", "#ueber-uns"],
    ["Projekte", "/projekte"],
    ["Ablauf", "#ablauf"],
    ["Kontakt", "#kontakt"],
];

function Header() {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButton = useRef<HTMLButtonElement>(null);
    const [activeSection, setActiveSection] = useState("#start");

    useEffect(() => {
        const sections = navigation.map(([, href]) => href.startsWith("#") ? document.getElementById(href.slice(1)) : null);
        let frame = 0;
        function updateActiveSection() {
            frame = 0;
            const readingLine = window.innerHeight * 0.3;
            let current = "#start";
            sections.forEach((section, index) => {
                if (section && section.getBoundingClientRect().top <= readingLine) current = navigation[index][1];
            });
            setActiveSection(current);
        }
        function scheduleUpdate() {
            if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
        }
        updateActiveSection();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        return () => {
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            window.cancelAnimationFrame(frame);
        };
    }, [pathname]);
    return(
        <>
            <div className="header-infobar">
                <p><MapPin size={14} strokeWidth={1.6} aria-hidden="true" />Persönlich vor Ort in Nagold & Umgebung</p>
                <a href="tel:+4917647065439"><Phone size={14} strokeWidth={1.6} aria-hidden="true" /><span>0176 47065439</span></a>
            </div>
            <header className="header" onKeyDown={event => {
                if (event.key === "Escape" && menuOpen) {
                    setMenuOpen(false);
                    menuButton.current?.focus();
                }
            }} onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenuOpen(false);
            }}>

                <Link to="/#start" className="header-left" aria-label="AlltagsService Nagold – Startseite" onClick={() => setMenuOpen(false)}>
                    <div className="header-logo">
                        <img className="header-logo-img" src={logo} alt="" width={46} height={46} />
                    </div>
                    <div className="header-brand">
                        <p className="header-brand-title">AlltagsService Nagold</p>
                        <p className="header-brand-subtitle">Nagold & Umgebung</p>
                    </div>
                </Link>

                <div className="header-right">
                    <Link to="/#kontakt" className="header-cta" onClick={() => setMenuOpen(false)}>
                        <Send size={19} strokeWidth={1.8} aria-hidden="true" />
                        <span>Jetzt anfragen</span>
                    </Link>
                    <button ref={menuButton} type="button" className="header-menu-toggle" aria-controls="header-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} onClick={() => setMenuOpen(open => !open)}>
                        {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>

                <nav id="header-navigation" className={`header-nav${menuOpen ? " is-open" : ""}`} aria-label="Hauptnavigation">
                    <ul className="header-nav-list">
                        {navigation.map(([label, href]) => (
                            <li className={`header-nav-item${(pathname === "/" ? activeSection === href : pathname === href) ? " is-active" : ""}`} key={href}><Link to={href.startsWith("#") ? `/${href}` : href} aria-current={(pathname === "/" ? activeSection === href : pathname === href) ? (href.startsWith("#") ? "location" : "page") : undefined} onClick={() => setMenuOpen(false)}>{label}</Link></li>
                        ))}
                    </ul>
                </nav>

            </header>
        </>
    )
}

export default Header
