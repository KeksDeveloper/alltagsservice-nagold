import { ArrowUpRight, Handshake, ImagePlus, MapPin, MessagesSquare } from "lucide-react";

const values = [
    {
        title: "Persönlich im Kontakt",
        description:
            "Wir hören zu und besprechen Ihr Anliegen direkt mit Ihnen.",
        icon: MessagesSquare,
    },
    {
        title: "In der Region zu Hause",
        description:
            "Für Menschen in Nagold und Umgebung da.",
        icon: MapPin,
    },
    {
        title: "Gemeinsam abgestimmt",
        description:
            "Wir klären vorab, was Sie brauchen und was wir übernehmen.",
        icon: Handshake,
    },
];

function About() {
    return (
        <section id="ueber-uns" className="about" aria-labelledby="about-title">
            <div className="about-container">
                <div className="about-heading">
                    <p className="about-eyebrow">Über AlltagsService Nagold</p>
                    <h2 id="about-title" className="about-title">
                        Aus Nagold. Persönlich für Sie da.
                    </h2>
                </div>

                <div className="about-content">
                    <p className="about-intro">
                        AlltagsService Nagold wurde gegründet, um Menschen im
                        Alltag zu entlasten und dort mit anzupacken, wo
                        Unterstützung gebraucht wird.
                    </p>
                    <p className="about-description">
                        Der Gedanke dahinter: praktische Hilfe, so unkompliziert
                        und nahbar wie die Unterstützung eines hilfsbereiten
                        Nachbarn. Von Reinigung und Entrümpelung bis zur
                        Fahrzeugaufbereitung stehen die Aufgaben im Mittelpunkt,
                        die Ihnen Zeit und Kraft abnehmen.
                    </p>
                    <p className="about-description">
                        Bedarf, Umfang und Ablauf werden persönlich besprochen.
                        So entsteht Unterstützung, die zu Ihrem Anliegen passt.
                    </p>
                </div>

                <div className="about-values">
                    {values.map(({ title, description, icon: Icon }) => (
                        <div className="about-value" key={title}>
                            <div className="about-value-icon" aria-hidden="true">
                                <Icon size={24} strokeWidth={1.6} />
                            </div>
                            <h3 className="about-value-title">{title}</h3>
                            <p className="about-value-description">{description}</p>
                        </div>
                    ))}
                </div>
                <section className="about-network" aria-labelledby="about-network-title">
                    <div className="about-network-heading">
                        <p className="about-eyebrow">Menschen & Zusammenarbeit</p>
                        <h3 id="about-network-title">Wer hinter ASN steht.</h3>
                    </div>
                    <div className="about-network-grid">
                        <article className="about-person">
                            <div className="about-person-placeholder" role="img" aria-label="Bildplatzhalter für Daniel Daungauer">
                                <ImagePlus size={28} strokeWidth={1.4} aria-hidden="true" />
                                <span aria-hidden="true">Foto folgt</span>
                            </div>
                            <p className="about-role">Inhaber & Gründer</p>
                            <h4>Daniel Daungauer</h4>
                            <p>Hat ASN mit dem Ziel gegründet, Menschen mit praktischer Hilfe im Alltag zu unterstützen.</p>
                        </article>
                        <article className="about-person">
                            <div className="about-person-placeholder" role="img" aria-label="Bildplatzhalter für Marco Reingen">
                                <ImagePlus size={28} strokeWidth={1.4} aria-hidden="true" />
                                <span aria-hidden="true">Foto folgt</span>
                            </div>
                            <p className="about-role">Arbeitskollege</p>
                            <h4>Marco Reingen</h4>
                            <p>Arbeitet mit Daniel Daungauer bei AlltagsService Nagold zusammen.</p>
                        </article>
                        <article className="about-partner" aria-labelledby="about-partner-title">
                            <p className="about-role">Partnerunternehmen</p>
                            <h4 id="about-partner-title">BüroKLARO</h4>
                            <p className="about-partner-tagline">Bürokratie einfach gemacht.</p>
                            <p>
                                ASN hilft beim praktischen Anpacken, BüroKLARO bei
                                organisatorischen und bürokratischen Aufgaben –
                                etwa mit Formularen, Dokumenten und digitalen Anwendungen.
                            </p>
                            <ul className="about-partner-services">
                                <li>Formularhilfe und Unterlagen auf Vollständigkeit prüfen</li>
                                <li>Dokumente ordnen und Behördenpost verstehen</li>
                                <li>Bewerbungen vorbereiten, Fristen und Termine strukturieren</li>
                                <li>Unterstützung bei Online-Formularen und Kundenportalen</li>
                            </ul>
                            <p>Unterstützung auf Deutsch, Russisch und Englisch.</p>
                            <p className="about-partner-scope">
                                Praktische Organisationshilfe, keine Rechts-, Steuer-
                                oder Sozialleistungsberatung. Weitere Leistungsgrenzen
                                und aktuelle Angebote finden Sie direkt bei BüroKLARO.
                            </p>
                            <a href="https://bueroklaro.de/" className="about-link">
                                BüroKLARO kennenlernen
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </a>
                        </article>
                    </div>
                </section>
            </div>
        </section>
    );
}

export default About;
