import { Link } from "react-router";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/#start" className="footer-brand-name">AlltagsService Nagold<span>Praktische Hilfe. Direkt vor Ort.</span></Link>
                        <p>Reinigung, Entrümpelung, Fahrzeugaufbereitung und Unterstützung im Alltag – für Nagold und Umgebung.</p>
                    </div>
                    <nav className="footer-nav" aria-label="Navigation im Fußbereich">
                        <h2>Entdecken</h2>
                        <Link to="/#leistungen">Leistungen</Link>
                        <Link to="/#ueber-uns">Über uns</Link>
                        <Link to="/projekte">Projekte</Link>
                        <Link to="/#ablauf">So läuft’s ab</Link>
                        <Link to="/#kontakt">Kontakt & Anfrage</Link>
                    </nav>
                    <div className="footer-contact">
                        <h2>Direkt erreichbar</h2>
                        <a href="tel:+4917647065439"><Phone size={16} aria-hidden="true" />0176 47065439</a>
                        <a href="mailto:service@alltagsservice-nagold.de"><Mail size={16} aria-hidden="true" />service@alltagsservice-nagold.de</a>
                        <Link to="/#kontakt" className="footer-inquiry">Ihr Anliegen besprechen<ArrowUpRight size={17} aria-hidden="true" /></Link>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {currentYear} AlltagsService Nagold</p>
                    <nav aria-label="Rechtliche Informationen">
                        <Link to="/impressum">Impressum</Link>
                        <Link to="/datenschutz">Datenschutz</Link>
                    </nav>
                    <Link to="/#start" className="footer-top-link">Nach oben ↑</Link>
                </div>
                <p className="footer-credits">
                    Hero-Foto: <a href="https://commons.wikimedia.org/wiki/File:Nagolder_Viadukt.jpg">„Nagolder Viadukt“ von GillyBerlin</a>,{" "}
                    <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.
                    Für die Darstellung zugeschnitten und mit Farbverläufen überlagert.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
