import { Link } from "react-router";
import heroSmall from '../../Pictures/optimized/hero-768.webp';
import heroMedium from '../../Pictures/optimized/hero-1280.webp';
import heroLarge from '../../Pictures/optimized/hero-1920.webp';
import heroWide from '../../Pictures/optimized/hero-2560.webp';
import { MapPin } from "lucide-react";

function Hero() {
    return (
            <section id="start" className="hero">
                <img className="hero-img"
                     src={heroLarge}
                     srcSet={`${heroSmall} 768w, ${heroMedium} 1280w, ${heroLarge} 1920w, ${heroWide} 2560w`}
                     sizes="(max-width: 640px) 1100px, 100vw"
                     width={1920}
                     height={1440}
                     fetchPriority="high"
                     loading="eager"
                     alt="Blick auf das Nagolder Viadukt"
                     draggable={false}
                />
                <div className="hero-content">
                    <p className="hero-eyebrow">aus nagold. für die region</p>
                    <h1 className="hero-title">Mehr Zeit für das, was wirklich zählt.</h1>
                    <p className="hero-description">Ob Reinigung, Entrümplung oder Unterstützung im Alltag  wir kümmern uns zuverlässig um die Dinge, die Ihnen Zeit und Kraft kosten..</p>
                    <div className="hero-btn-section">
                        <Link to="/#kontakt" className="hero-button">Jetzt Anfragen
                        <span aria-hidden="true"> ↗</span></Link>
                        <Link to="/#leistungen" className="hero-leistung">Leistungen entdecken
                        <span aria-hidden="true"> →</span></Link>
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
