import { useEffect, useRef, useState } from "react";
import {
    ArrowUpRight,
    Car,
    HandHelping,
    Hammer,
    PackageOpen,
    PawPrint,
    ShoppingBag,
    Sparkles,
    X,
} from "lucide-react";

const services = [
    {
        id: "reinigung",
        points: ["Wohnungsreinigung", "Endreinigung", "Umfang nach Absprache"],
        example: "Nach einem Umzug soll die bisherige Wohnung gereinigt werden. Gemeinsam besprechen wir, welche Räume und Aufgaben dazugehören.",
        title: "Reinigung",
        description:
            "Ob Wohnungs- oder Endreinigung: Wir unterstützen Sie dabei, Ihre Räume wieder sauber und gepflegt zu hinterlassen.",
        icon: Sparkles,
        featured: true,
    },
    {
        id: "entruempelung",
        points: ["Räume freimachen", "Unterstützung beim Aussortieren", "Persönliche Abstimmung"],
        example: "Ein vollgestellter Raum soll wieder nutzbar werden. Wir besprechen vorab, was bleiben soll und wobei Sie Unterstützung benötigen.",
        title: "Entrümpelung",
        description:
            "Wenn es Zeit ist, Platz zu schaffen: Wir helfen beim Entrümpeln und besprechen mit Ihnen, was erledigt werden soll.",
        icon: PackageOpen,
        featured: true,
    },
    {
        id: "fahrzeugaufbereitung",
        points: ["Innenaufbereitung", "Außenaufbereitung", "Pflege nach Bedarf"],
        example: "Ihr Auto soll nach intensiver Alltagsnutzung wieder gepflegt aussehen. Wir stimmen mit Ihnen ab, welche Arbeiten innen und außen sinnvoll sind.",
        title: "Fahrzeugaufbereitung",
        description:
            "Innen und außen gepflegt: Wir bereiten Ihr Fahrzeug auf und stimmen den gewünschten Umfang persönlich mit Ihnen ab.",
        icon: Car,
        featured: true,
    },
    {
        id: "alltagshilfe",
        points: ["Hilfe im Haushalt", "Entlastung im Alltag", "Individuelle Aufgaben"],
        example: "Im Alltag bleiben einige Aufgaben liegen. Sie sagen uns, wo Sie Entlastung brauchen, und wir vereinbaren die passende Unterstützung.",
        title: "Haushalts- und Alltagshilfe",
        description:
            "Praktische Unterstützung bei den täglichen Aufgaben – persönlich und passend zu dem, was Sie im Alltag entlastet.",
        icon: HandHelping,
        featured: false,
    },
    {
        id: "einkaufshilfe",
        points: ["Beim Einkauf unterstützen", "Taschen und Einkäufe tragen", "Besorgungen erleichtern"],
        example: "Der Wocheneinkauf ist allein zu beschwerlich. Wir unterstützen Sie beim Einkaufen und beim Tragen der Taschen.",
        title: "Einkaufs- und Tragehilfe",
        description:
            "Wir unterstützen Sie beim Einkaufen und Tragen, damit Besorgungen und schwere Taschen leichter zu bewältigen sind.",
        icon: ShoppingBag,
        featured: false,
    },
    {
        id: "praktische-hilfe",
        points: ["Möbel aufbauen", "Kleine praktische Aufgaben", "Arbeiten nach Absprache"],
        example: "Ein neues Regal steht noch verpackt zu Hause. Wir klären vorab den Aufbau und helfen Ihnen bei der Umsetzung.",
        title: "Möbelaufbau und praktische Hilfe",
        description:
            "Ein neues Möbelstück oder eine kleine Aufgabe zu Hause? Wir helfen beim Aufbau und bei praktischen Arbeiten nach Absprache.",
        icon: Hammer,
        featured: false,
    },
    {
        id: "haustierbetreuung",
        points: ["Unterstützung bei der Betreuung", "Vertraute Routinen beachten", "Aufgaben gemeinsam abstimmen"],
        example: "Sie benötigen zeitweise Hilfe mit Ihrem Haustier. Wir besprechen seine Gewohnheiten und welche Betreuung wir übernehmen können.",
        title: "Haustierbetreuung",
        description:
            "Wenn Sie Unterstützung bei der Betreuung Ihres Haustiers benötigen, stimmen wir die Aufgaben gemeinsam mit Ihnen ab.",
        icon: PawPrint,
        featured: false,
    },
];

function Services() {
    const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!selectedService) return;
        const dialog = dialogRef.current;
        if (!dialog) return;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
        };
    }, [selectedService]);

    const DetailIcon = selectedService?.icon;

    return (
        <section
            id="leistungen"
            className="services"
            aria-labelledby="services-title"
        >
            <div className="services-container">
                <div className="services-heading">
                    <p className="services-eyebrow">Unsere Leistungen</p>
                    <h2 id="services-title" className="services-title">
                        Die passende Hilfe für Ihren Alltag.
                    </h2>
                    <p className="services-description">
                        Reinigung, Entrümpelung und Fahrzeugaufbereitung innen
                        und außen – unsere Schwerpunkte in Nagold und Umgebung.
                        Auch bei weiteren Aufgaben im Alltag unterstützen wir Sie
                        nach Absprache.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service) => {
                        const { id, title, points, icon: Icon, featured } = service;
                        return (
                        <article
                            key={id}
                            className={`services-card services-card-${id}${featured ? " services-card-featured" : " services-card-compact"}`}
                            aria-labelledby={`service-${id}-title`}
                        >
                            <div className="services-card-icon" aria-hidden="true">
                                <Icon size={28} strokeWidth={1.6} />
                            </div>
                            {featured && (
                                <p className="services-card-eyebrow">
                                    {id === "reinigung"
                                        ? "Saubere Räume"
                                        : id === "entruempelung"
                                          ? "Platz für Neues"
                                          : "Innen & außen"}
                                </p>
                            )}
                            <h3
                                id={`service-${id}-title`}
                                className="services-card-title"
                            >
                                {title}
                            </h3>
                            <ul className="services-card-description services-card-points">
                                {points.map((point) => <li key={point}>{point}</li>)}
                            </ul>
                            <div className="services-card-actions">
                            <a
                                href="#kontakt"
                                className="services-card-link"
                                aria-label={`${title} anfragen`}
                                onClick={() => window.dispatchEvent(new CustomEvent("asn:select-service", { detail: title }))}
                            >
                                Jetzt anfragen
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </a>
                            <button
                                type="button"
                                className="services-card-details"
                                aria-label={`Details zu ${title} ansehen`}
                                aria-haspopup="dialog"
                                onClick={() => setSelectedService(service)}
                            >
                                Details ansehen
                                <ArrowUpRight
                                    size={18}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </button>
                            </div>
                        </article>
                        );
                    })}
                </div>

                <p className="services-note">
                    Ihr Anliegen ist nicht dabei? Weitere Unterstützung ist nach
                    Absprache möglich.{" "}
                    <a href="#kontakt" className="services-note-link">
                        Sprechen Sie uns an.
                    </a>
                </p>
            </div>
            <dialog
                ref={dialogRef}
                className="services-dialog"
                aria-labelledby="service-detail-title"
                aria-describedby="service-detail-description"
                onClose={() => setSelectedService(null)}
                onClick={(event) => {
                    if (event.target !== event.currentTarget) return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    if (event.clientX < bounds.left || event.clientX > bounds.right ||
                        event.clientY < bounds.top || event.clientY > bounds.bottom) {
                        event.currentTarget.close();
                    }
                }}
            >
                {selectedService && DetailIcon && (
                    <>
                        <button
                            type="button"
                            className="services-dialog-close"
                            aria-label="Details schließen"
                            autoFocus
                            onClick={() => dialogRef.current?.close()}
                        >
                            <X size={22} aria-hidden="true" />
                        </button>
                        <div className={`services-dialog-visual services-dialog-visual-${selectedService.id}`} aria-hidden="true">
                            <DetailIcon size={96} strokeWidth={1} />
                            <Sparkles className="services-dialog-sparkle" size={28} strokeWidth={1.4} />
                        </div>
                        <div className="services-dialog-content">
                            <p className="services-eyebrow">Ihre Unterstützung vor Ort</p>
                            <h2 id="service-detail-title">{selectedService.title}</h2>
                            <p id="service-detail-description">{selectedService.description}</p>
                            <ul className="services-card-points">
                                {selectedService.points.map((point) => <li key={point}>{point}</li>)}
                            </ul>
                            <div className="services-dialog-example">
                                <h3>Zum Beispiel</h3>
                                <p>{selectedService.example}</p>
                            </div>
                            <a href="#kontakt" className="services-card-link" onClick={() => {
                                window.dispatchEvent(new CustomEvent("asn:select-service", { detail: selectedService.title }));
                                dialogRef.current?.close();
                            }}>
                                {selectedService.title} anfragen
                                <ArrowUpRight size={18} aria-hidden="true" />
                            </a>
                        </div>
                    </>
                )}
            </dialog>
        </section>
    );
}

export default Services;
