import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects.ts";
import ProjectComparison from "./ProjectComparison.tsx";

function Gallery() {
    const featured = projects[0];
    if (!featured) return null;

    return (
        <section id="referenzen" className="gallery" aria-labelledby="gallery-title">
            <div className="gallery-container">
                <div className="gallery-heading">
                    <div><p className="gallery-eyebrow">Einblicke in unsere Arbeit</p><h2 id="gallery-title">Der Unterschied wird sichtbar.</h2></div>
                    <Link to="/projekte" className="gallery-link">Weitere Projekte ansehen<ArrowUpRight size={18} aria-hidden="true" /></Link>
                </div>
                <ProjectComparison project={featured} />
            </div>
        </section>
    );
}

export default Gallery;
