import metadata from "../Pictures/optimized/project-metadata.json";
import before1 from "../Pictures/optimized/1.1-full.webp";
import after1 from "../Pictures/optimized/1.2-full.webp";
import before2 from "../Pictures/optimized/2.1-full.webp";
import after2 from "../Pictures/optimized/2.2-full.webp";
import before3 from "../Pictures/optimized/3.1-full.webp";
import after3 from "../Pictures/optimized/3.3-full.webp";
import before4 from "../Pictures/optimized/4.1-full.webp";
import after4 from "../Pictures/optimized/4.2-full.webp";
import before5 from "../Pictures/optimized/5.1-full.webp";
import after5 from "../Pictures/optimized/5.5-full.webp";
import before6 from "../Pictures/optimized/6.1-full.webp";
import after6 from "../Pictures/optimized/6.6-full.webp";
import before7 from "../Pictures/optimized/7.1-full.webp";
import after7 from "../Pictures/optimized/7.7-full.webp";
import before8 from "../Pictures/optimized/8.1-full.webp";
import after8 from "../Pictures/optimized/8.8-full.webp";
import before9 from "../Pictures/optimized/9.1-full.webp";
import after9 from "../Pictures/optimized/9.9-full.webp";

export type ProjectImage = {
    src: string;
    thumbnail: string;
    alt: string;
    width: number;
    height: number;
    thumbnailWidth: number;
};

const thumbnails = import.meta.glob<string>("../Pictures/optimized/*-small.webp", { eager: true, query: "?url", import: "default" });

function projectImage(src: string, name: keyof typeof metadata, alt: string): ProjectImage {
    const sizes = metadata[name];
    return { src, alt, thumbnail: thumbnails["../Pictures/optimized/" + name + "-small.webp"], width: sizes.full.width, height: sizes.full.height, thumbnailWidth: sizes.small.width };
}

export type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    before: ProjectImage;
    after: ProjectImage;
};

// Nur freigegebene Kundenarbeiten eintragen. Das erste Projekt erscheint auf der Startseite.
// src: importierte Bilddatei oder Pfad in public; alt: tatsächlicher Bildinhalt.
export const projects: Project[] = [
    {
        id: "treppenbereich",
        title: "Wieder Platz unter der Treppe",
        category: "Entrümpelung & Reinigung",
        description: "Der Bereich unter der Wendeltreppe im Vorher-/Nachher-Vergleich: von abgestellten Säcken und Gegenständen zur freien Bodenfläche.",
        before: projectImage(before1, "1.1", "Säcke und Gegenstände unter einer hölzernen Wendeltreppe vor der Räumung"),
        after: projectImage(after1, "1.2", "Freigeräumte Bodenfläche unter der Wendeltreppe"),
    },
    {
        id: "wendeltreppe",
        title: "Die Wendeltreppe im Vergleich",
        category: "Entrümpelung & Reinigung",
        description: "Ein weiterer Blick auf den Treppenbereich: Die vorherigen Ablagerungen und Gegenstände sind entfernt, der Zugang ist wieder frei.",
        before: projectImage(before2, "2.1", "Holzstufen einer Wendeltreppe mit Schmutz, Blättern und herumliegenden Gegenständen"),
        after: projectImage(after2, "2.2", "Wendeltreppe mit freiem Bodenbereich nach der Räumung"),
    },
    {
        id: "treppenabsatz",
        title: "Freier Durchgang am Treppenabsatz",
        category: "Entrümpelung & Reinigung",
        description: "Der geflieste Bereich neben der Treppe vor und nach dem Freiräumen und Reinigen.",
        before: projectImage(before3, "3.1", "Gefliester Treppenabsatz mit Verpackungen, Blättern, Pflanztopf und Staubsauger"),
        after: projectImage(after3, "3.3", "Freier, gereinigter Fliesenboden am Treppenabsatz"),
    },
    {
        id: "zimmer-dachschraege",
        title: "Ein Zimmer wird wieder nutzbar",
        category: "Entrümpelung & Reinigung",
        description: "Kartons, Textilien und lose Gegenstände weichen einer freien Bodenfläche im Zimmer unter der Dachschräge.",
        before: projectImage(before4, "4.1", "Zimmer unter einer Dachschräge mit Kartons, Textilien und Gegenständen auf dem Boden"),
        after: projectImage(after4, "4.2", "Dasselbe Zimmer mit freigeräumtem, gereinigtem Boden"),
    },
    {
        id: "fensterbereich",
        title: "Mehr Freiraum am Fenster",
        category: "Entrümpelung & Reinigung",
        description: "Der Fensterbereich im Detail: Tisch und lose Gegenstände sind entfernt, der Boden ist wieder frei.",
        before: projectImage(before5, "5.1", "Bereich unter einem Fenster mit Tisch, Verpackungen und Textilien auf dem Boden"),
        after: projectImage(after5, "5.5", "Freier Bodenbereich unter dem Fenster nach der Räumung"),
    },
    {
        id: "waschplatz",
        title: "Ein sauberer Waschplatz",
        category: "Reinigung",
        description: "Waschbecken und Ablageflächen im Vergleich: Gegenstände und Verschmutzungen wurden entfernt.",
        before: projectImage(before6, "6.1", "Verschmutztes Waschbecken mit Verpackungen, Flaschen und Dosen auf den Ablageflächen"),
        after: projectImage(after6, "6.6", "Gereinigtes Waschbecken mit freien Ablageflächen"),
    },
    {
        id: "badewanne",
        title: "Freie Flächen rund um die Badewanne",
        category: "Reinigung",
        description: "Die Badewanne und ihre Ablagen vor und nach dem Entfernen der Gegenstände und der Reinigung.",
        before: projectImage(before7, "7.1", "Badewanne mit Karton, Kleidung und weiteren Gegenständen auf den umliegenden Ablagen"),
        after: projectImage(after7, "7.7", "Gereinigte Badewanne mit freien Ablagen und freiem Fliesenboden"),
    },
    {
        id: "kueche",
        title: "Die Küche wieder im Blick",
        category: "Reinigung",
        description: "Arbeitsflächen, Spüle und Kochfeld vor und nach dem Aufräumen und Reinigen der Küche.",
        before: projectImage(before8, "8.1", "Küche mit roten Fronten und belegten, verschmutzten Arbeitsflächen"),
        after: projectImage(after8, "8.8", "Küche mit roten Fronten, freien Arbeitsflächen und gereinigtem Kochfeld"),
    },
    {
        id: "zimmerecke",
        title: "Aus einer Ablagefläche wird wieder Raum",
        category: "Entrümpelung & Reinigung",
        description: "Säcke, Kartons und lose Gegenstände sind aus der Zimmerecke entfernt. Der Vergleich zeigt die wieder freie Bodenfläche.",
        before: projectImage(before9, "9.1", "Zimmerecke mit Säcken, Kartons und Flaschen vor der Räumung"),
        after: projectImage(after9, "9.9", "Freigeräumte Zimmerecke mit sichtbarem Boden nach der Räumung"),
    },
];
