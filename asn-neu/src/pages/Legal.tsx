import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import impressum from "../content/impressum.html?raw";
import datenschutz from "../content/datenschutz.html?raw";
import usePageNavigation from "../hooks/usePageNavigation.ts";

export default function Legal() {
    const { pathname } = useLocation();
    const privacy = pathname === "/datenschutz";
    usePageNavigation(`${privacy ? "Datenschutz" : "Impressum"} – AlltagsService Nagold`);
    useEffect(() => {
        const meta = document.createElement("meta");
        meta.name = "robots";
        meta.content = "noindex, follow";
        document.head.appendChild(meta);
        return () => meta.remove();
    }, []);
    return <section className="legal-page"><div className="legal-container">
        <Link to="/" className="gallery-link">← Zur Startseite</Link>
        {/* Ausschließlich mitgelieferte lokale Inhalte, keine Nutzereingaben. */}
        <article className="legal-content" dangerouslySetInnerHTML={{ __html: privacy ? datenschutz : impressum }} />
    </div></section>;
}
