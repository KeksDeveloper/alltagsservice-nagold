import type { Project, ProjectImage } from "../../data/projects.ts";
import { useState } from "react";
import { Eye } from "lucide-react";

function PreviewImage({ image }: { image: ProjectImage }) {
    return <img src={image.thumbnail} srcSet={image.thumbnail + " " + image.thumbnailWidth + "w, " + image.src + " " + image.width + "w"} sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1296px) calc((100vw - 96px) / 2), 600px" width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />;
}

type Props = {
    project: Project;
    onOpen?: (side: "before" | "after") => void;
    hideAfterInitially?: boolean;
};

function ProjectComparison({ project, onOpen, hideAfterInitially = false }: Props) {
    const [revealed, setRevealed] = useState(false);
    const afterHidden = hideAfterInitially && !revealed;
    return (
        <article className="project-comparison" aria-labelledby={`project-${project.id}`}>
            <div className="project-pictures">
                <figure>
                    {onOpen ? <button type="button" className="project-image-button" aria-label={`${project.title}: Vorher-Bild vergrößern`} aria-haspopup="dialog" onClick={() => onOpen("before")}><PreviewImage image={project.before} /><span className="project-image-hint">Vergrößern ↗</span></button> : <PreviewImage image={project.before} />}
                    <figcaption>Vorher</figcaption>
                </figure>
                <figure>
                    {afterHidden ? (
                        <button type="button" className="project-reveal" aria-label={`${project.title}: Nachher-Bild aufdecken`} onClick={() => setRevealed(true)}>
                            <Eye size={32} strokeWidth={1.3} aria-hidden="true" />
                            <span>Wie sieht es danach aus?</span>
                            <span className="project-reveal-action">Nachher aufdecken ↗</span>
                        </button>
                    ) : onOpen ? <button type="button" className="project-image-button" aria-label={`${project.title}: Nachher-Bild vergrößern`} aria-haspopup="dialog" onClick={() => onOpen("after")}><PreviewImage image={project.after} /><span className="project-image-hint">Vergrößern ↗</span></button> : <PreviewImage image={project.after} />}
                    <figcaption>Nachher</figcaption>
                </figure>
            </div>
            <div className="project-caption">
                {hideAfterInitially && <p className="project-reveal-status" role="status">{revealed ? "Nachher-Bild aufgedeckt. Zum Vergrößern auf das Bild klicken." : ""}</p>}
                <p className="project-category">{project.category}</p>
                <h3 id={`project-${project.id}`}>{project.title}</h3>
                <p>{project.description}</p>
            </div>
        </article>
    );
}

export default ProjectComparison;
