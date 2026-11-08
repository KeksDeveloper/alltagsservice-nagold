import { Link } from "react-router";
import usePageNavigation from "../hooks/usePageNavigation.ts";

export default function NotFound() {
    usePageNavigation("Seite nicht gefunden – AlltagsService Nagold");
    return <section className="projects-page"><div className="gallery-container"><p className="gallery-eyebrow">Seite nicht gefunden</p><h1>Hier gibt es gerade nichts zu sehen.</h1><Link className="gallery-link" to="/">Zur Startseite</Link></div></section>;
}
