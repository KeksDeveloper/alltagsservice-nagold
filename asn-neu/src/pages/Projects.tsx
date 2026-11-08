import { Link } from "react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Images } from "lucide-react";
import { projects } from "../data/projects.ts";
import ProjectComparison from "../components/Gallery/ProjectComparison.tsx";
import ProjectViewer from "../components/Gallery/ProjectViewer.tsx";
import type { ProjectSelection } from "../components/Gallery/ProjectViewer.tsx";
import useScrollReveal from "../hooks/useScrollReveal.ts";
import usePageNavigation from "../hooks/usePageNavigation.ts";

function Projects() {
    const [selection, setSelection] = useState<ProjectSelection | null>(null);
    usePageNavigation("Projekte – AlltagsService Nagold");
    useScrollReveal();
    return (
        <section className="projects-page" aria-labelledby="projects-title">
            <div className="gallery-container">
                <Link to="/" className="gallery-link"><ArrowLeft size={18} aria-hidden="true" />Zur Startseite</Link>
                <div className="projects-heading">
                    <p className="gallery-eyebrow">AlltagsService Nagold</p>
                    <h1 id="projects-title">Unsere Projekte. Vorher und nachher.</h1>
                    <p>Einblicke in durchgeführte Arbeiten – vom Ausgangszustand bis zum Ergebnis.</p>
                </div>
                {projects.length ? (
                    <div className="projects-list">{projects.map((project, index) => <ProjectComparison key={project.id} project={project} hideAfterInitially={index >= 3} onOpen={side => setSelection({ index, side })} />)}</div>
                ) : (
                    <div className="projects-empty"><Images size={36} strokeWidth={1.3} aria-hidden="true" /><h2>Einblicke folgen.</h2><p>Aktuell sind noch keine Projektbilder veröffentlicht. Bei Fragen zu unseren Leistungen sprechen Sie uns gerne an.</p></div>
                )}
                <div className="projects-contact"><p>Sie möchten ein ähnliches Anliegen besprechen?</p><Link to="/#kontakt" className="gallery-link">Jetzt anfragen<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
            </div>
            <ProjectViewer projects={projects} selection={selection} onChange={setSelection} onClose={() => setSelection(null)} />
        </section>
    );
}

export default Projects;
