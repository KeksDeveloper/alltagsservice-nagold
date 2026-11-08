import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Anfrage stellen",
        description: "Beschreiben Sie kurz, wobei Sie Unterstützung brauchen und wo der Einsatz stattfinden soll.",
    },
    {
        number: "02",
        title: "Details klären",
        description: "Wir besprechen Ihr Anliegen und klären gemeinsam, welche Aufgaben und welcher Umfang dazugehören.",
    },
    {
        number: "03",
        title: "Angebot & Termin",
        description: "Auf dieser Grundlage stimmen wir die Kosten und einen passenden Termin mit Ihnen ab.",
    },
    {
        number: "04",
        title: "Wir packen an",
        description: "Zum vereinbarten Termin kümmern wir uns um die besprochenen Aufgaben – und Sie haben wieder mehr Freiraum.",
    },
];

function Process() {
    return (
        <section id="ablauf" className="process" aria-labelledby="process-title">
            <div className="process-container">
                <div className="process-heading">
                    <div>
                        <p className="process-eyebrow">So läuft’s ab</p>
                        <h2 id="process-title" className="process-title">
                            Von Ihrer Anfrage zum erledigten Auftrag.
                        </h2>
                    </div>
                    <p className="process-description">
                        Sie müssen noch nicht alle Details kennen. Erzählen Sie
                        uns, was ansteht – den Rest klären wir gemeinsam.
                    </p>
                </div>

                <ol className="process-steps">
                    {steps.map(({ number, title, description }) => (
                        <li className="process-step" key={number}>
                            <span className="process-number" aria-hidden="true">{number}</span>
                            <h3 className="process-step-title">{title}</h3>
                            <p className="process-step-description">{description}</p>
                        </li>
                    ))}
                </ol>

                <div className="process-footer">
                    <p>Was können wir Ihnen abnehmen?</p>
                    <Link to="/#kontakt" className="process-link">
                        Jetzt anfragen
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Process;
