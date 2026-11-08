import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "src/Pictures/optimized");
await mkdir(output, { recursive: true });

await sharp(path.join(root, "src/Pictures/logosmall.png"))
    .resize({ width: 128, height: 128, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, effort: 5 })
    .toFile(path.join(output, "logo.webp"));

for (const width of [768, 1280, 1920, 2560]) {
    const info = await sharp(path.join(root, "src/Pictures/Nagolder_Viadukt.jpg"))
        .rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 })
        .toFile(path.join(output, `hero-${width}.webp`));
    console.log(`Hero ${width}px: ${Math.round(info.size / 1024)} KB`);
}

const projectRoot = path.join(root, "src/Pictures/vorhernacher");
const metadata = {};
for (const folder of await readdir(projectRoot, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    for (const filename of await readdir(path.join(projectRoot, folder.name))) {
        if (!/\.(jpe?g|png)$/i.test(filename)) continue;
        const name = path.parse(filename).name;
        const source = path.join(projectRoot, folder.name, filename);
        const full = await sharp(source).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
            .webp({ quality: 82, effort: 5 }).toFile(path.join(output, `${name}-full.webp`));
        const small = await sharp(source).rotate().resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
            .webp({ quality: 78, effort: 5 }).toFile(path.join(output, `${name}-small.webp`));
        metadata[name] = { full: { width: full.width, height: full.height, bytes: full.size }, small: { width: small.width, height: small.height, bytes: small.size } };
    }
}
await writeFile(path.join(output, "project-metadata.json"), JSON.stringify(metadata, null, 2) + "\n");
console.log(`${Object.keys(metadata).length} Projektbilder in zwei Größen erstellt. Originale unverändert.`);
