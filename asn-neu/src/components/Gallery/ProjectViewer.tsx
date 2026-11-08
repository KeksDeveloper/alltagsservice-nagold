import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "../../data/projects.ts";

export type ProjectSelection = { index: number; side: "before" | "after" };

type Props = {
    projects: Project[];
    selection: ProjectSelection | null;
    onChange: (selection: ProjectSelection) => void;
    onClose: () => void;
};

export default function ProjectViewer({ projects, selection, onChange, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const project = selection ? projects[selection.index] : undefined;
    const isOpen = Boolean(project);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!isOpen || !dialog) return;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
        };
    }, [isOpen]);

    function switchSide(side: "before" | "after") {
        if (!selection) return;
        onChange({ ...selection, side });
    }

    function switchProject(direction: number) {
        if (!selection) return;
        const index = selection.index + direction;
        if (index < 0 || index >= projects.length) return;
        onChange({ index, side: "before" });
    }

    return (
        <dialog ref={dialogRef} className="project-viewer" aria-labelledby="project-viewer-title" aria-describedby="project-viewer-description" onClose={onClose} onKeyDown={event => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                switchSide(event.key === "ArrowLeft" ? "before" : "after");
            }
        }} onClick={event => {
            if (event.target !== event.currentTarget) return;
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
        }}>
            {project && selection && <>
                <div className="project-viewer-header">
                    <div><p>Vergleich {selection.index + 1} von {projects.length}</p><h2 id="project-viewer-title">{project.title}</h2></div>
                    <button type="button" className="project-viewer-close" aria-label="Bildansicht schließen" autoFocus onClick={() => dialogRef.current?.close()}><X size={24} aria-hidden="true" /></button>
                </div>
                <div className="project-viewer-stage">
                    <img key={project[selection.side].src} src={project[selection.side].src} width={project[selection.side].width} height={project[selection.side].height} alt={project[selection.side].alt} decoding="async" />
                </div>
                <div className="project-viewer-controls">
                    <button type="button" className="project-viewer-arrow" aria-label="Vorher-Bild anzeigen" disabled={selection.side === "before"} onClick={() => switchSide("before")}><ChevronLeft size={24} aria-hidden="true" /></button>
                    <div className="project-viewer-toggle" role="group" aria-label="Ansicht wählen">
                        <button type="button" aria-pressed={selection.side === "before"} onClick={() => onChange({ ...selection, side: "before" })}>Vorher</button>
                        <button type="button" aria-pressed={selection.side === "after"} onClick={() => onChange({ ...selection, side: "after" })}>Nachher</button>
                    </div>
                    <button type="button" className="project-viewer-arrow" aria-label="Nachher-Bild anzeigen" disabled={selection.side === "after"} onClick={() => switchSide("after")}><ChevronRight size={24} aria-hidden="true" /></button>
                </div>
                <div className="project-viewer-pair-navigation" role="group" aria-label="Bildpaar wechseln">
                    <button type="button" className="project-viewer-previous" disabled={selection.index === 0} onClick={() => switchProject(-1)} aria-label="Vorheriges Bildpaar"><span aria-hidden="true">←</span> Vorheriges</button>
                    <button type="button" className="project-viewer-next" disabled={selection.index === projects.length - 1} onClick={() => switchProject(1)} aria-label="Nächstes Bildpaar">Nächstes <span aria-hidden="true">→</span></button>
                </div>
                <p className="project-viewer-status" role="status" aria-live="polite">{selection.side === "before" ? "Vorher" : "Nachher"} · {project.title} · Bildpaar {selection.index + 1} von {projects.length}</p>
                <p id="project-viewer-description" className="project-viewer-description">{project.description}</p>
            </>}
        </dialog>
    );
}
