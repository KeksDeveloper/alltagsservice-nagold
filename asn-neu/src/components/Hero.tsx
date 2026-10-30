import viadukt from '../Pictures/Nagolder_Viadukt.jpg';
import { MapPin } from "lucide-react";

function Hero() {
    return (
            <section className="hero">
                <img className="hero-img"
                     src={viadukt}
                     alt="Blick auf das Nagolder Viadukt"
                     draggable={false}
                />
                <div className="hero-content">
                    <p className="hero-eyebrow">aus nagold. für die region</p>
                    <h1 className="hero-title">Mehr Zeit für das, was wirklich zählt.</h1>
                    <p className="hero-description">Ob Reinigung, Entrümplung oder Unterstützung im Alltag  wir kümmern uns zuverlässig um die Dinge, die Ihnen Zeit und Kraft kosten..</p>
                    <div className="hero-btn-section">
                        <a href="#kontakt" className="hero-button">Jetzt Anfragen
                        <span aria-hidden="true"> ↗</span></a>
                        <a href="#leistungen" className="hero-leistung">Leistungen entdecken
                        <span aria-hidden="true"> →</span></a>
                    </div>
                    <div className="hero-location">
                        <MapPin size={18} strokeWidth={1.8} className="pin"/>
                        <span>Persönlich vor Ort in Nagold & Umgebung</span>
                    </div>
                </div>
            </section>
    );
}

export default Hero;