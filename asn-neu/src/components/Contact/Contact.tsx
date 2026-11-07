import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Car, Check, HandHelping, Hammer, Mail, PackageOpen, PawPrint, Phone, ShoppingBag, Sparkles, Upload } from "lucide-react";

const serviceOptions = ["Reinigung", "Entrümpelung", "Fahrzeugaufbereitung", "Haushalts- und Alltagshilfe", "Einkaufs- und Tragehilfe", "Möbelaufbau und praktische Hilfe", "Haustierbetreuung", "Individuelle Anfrage"];
const serviceIcons = [Sparkles, PackageOpen, Car, HandHelping, ShoppingBag, Hammer, PawPrint, Mail];
const stepTitles = ["Wobei brauchen Sie Hilfe?", "Was steht bei Ihnen an?", "Wie erreichen wir Sie?"];

// Bestehende öffentliche Konfiguration aus der bisherigen Website.
const emailConfig = {
    service_id: "service_snpabgt",
    template_id: "template_6xj23qu",
    user_id: "oRzwBG1a6spOsAfZT",
};

async function uploadImage(file: File): Promise<string> {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "alltagsservice_anfragen");
    const response = await fetch("https://api.cloudinary.com/v1_1/x8w5zieq/image/upload", {
        method: "POST", body: data, signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) throw new Error("upload");
    const result = await response.json();
    if (typeof result.secure_url !== "string" || !result.secure_url.startsWith("https://")) throw new Error("upload");
    return result.secure_url;
}

function Contact() {
    const [step, setStep] = useState(0);
    const [service, setService] = useState("");
    const [preferredContact, setPreferredContact] = useState("E-Mail");
    const [summary, setSummary] = useState({ location: "", message: "" });
    const formRef = useRef<HTMLFormElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const focusNextStep = useRef(false);
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState("");
    const [failed, setFailed] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const sendingRef = useRef(false);
    // Bereits hochgeladene Bilder bei einem erneuten Versandversuch wiederverwenden.
    const uploadCache = useRef(new Map<File, string>());

    useEffect(() => {
        function selectService(event: Event) {
            const value = (event as CustomEvent<string>).detail;
            if (sendingRef.current || !serviceOptions.includes(value)) return;
            setService(value);
            setStep(0);
            setStatus("");
        }
        window.addEventListener("asn:select-service", selectService);
        return () => window.removeEventListener("asn:select-service", selectService);
    }, []);

    useEffect(() => {
        if (focusNextStep.current) {
            headingRef.current?.focus();
            focusNextStep.current = false;
        }
    }, [step]);

    function changeStep(next: number) {
        setStatus("");
        setFailed(false);
        focusNextStep.current = true;
        setStep(next);
    }

    function validateStep() {
        const fields = formRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[data-step="${step}"] input, [data-step="${step}"] textarea, [data-step="${step}"] select`);
        for (const field of fields ?? []) {
            if (!field.reportValidity()) return false;
        }
        if (step === 1 && (files.length > 5 || files.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024))) {
            setFailed(true);
            setStatus("Bitte wählen Sie höchstens 5 JPG-, PNG- oder WEBP-Bilder mit jeweils maximal 5 MB aus.");
            return false;
        }
        return true;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sendingRef.current) return;
        const form = event.currentTarget;
        if (!validateStep()) return;
        if (step < 2) {
            if (step === 1) {
                const details = new FormData(form);
                setSummary({ location: String(details.get("location") ?? ""), message: String(details.get("message") ?? "") });
            }
            changeStep(step + 1);
            return;
        }
        // Bei ungültigen früheren Feldern zuerst den passenden Schritt öffnen.
        for (const field of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")) {
            if (!field.checkValidity()) {
                changeStep(Number(field.closest("[data-step]")?.getAttribute("data-step") ?? 2));
                return;
            }
        }
        const data = new FormData(form);
        if (data.get("website")) return;
        setFailed(false);
        if (files.length > 5 || files.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024)) {
            setFailed(true);
            setStatus("Bitte wählen Sie höchstens 5 Bilder im Format JPG, PNG oder WEBP mit jeweils maximal 5 MB aus.");
            return;
        }
        sendingRef.current = true;
        setBusy(true);
        try {
            setStatus(files.length ? "Bilder werden hochgeladen …" : "Anfrage wird gesendet …");
            const links: string[] = [];
            for (const file of files) {
                let url = uploadCache.current.get(file);
                if (!url) {
                    url = await uploadImage(file);
                    uploadCache.current.set(file, url);
                }
                links.push(url);
            }
            const params = Object.fromEntries(
                Array.from(data.entries()).filter(([key, value]) => key !== "images" && key !== "website" && typeof value === "string"),
            );
            setStatus("Anfrage wird gesendet …");
            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...emailConfig, template_params: { ...params, image_links: links.length ? links.join("\n") : "Keine Bilder hochgeladen" } }),
                signal: AbortSignal.timeout(30000),
            });
            if (!response.ok) throw new Error("send");
            setStatus("Vielen Dank! Ihre Anfrage wurde übermittelt. Wir melden uns persönlich bei Ihnen.");
            form.reset();
            setService("");
            setPreferredContact("E-Mail");
            setSummary({ location: "", message: "" });
            focusNextStep.current = true;
            setStep(0);
            setFiles([]);
            uploadCache.current.clear();
        } catch {
            setFailed(true);
            setStatus("Die Übermittlung konnte nicht bestätigt werden. Ihre Eingaben bleiben erhalten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch oder per E-Mail.");
        } finally {
            sendingRef.current = false;
            setBusy(false);
        }
    }

    return (
        <section id="kontakt" className="contact" aria-labelledby="contact-title">
            <div className="contact-container">
                <div className="contact-information">
                    <p className="contact-eyebrow">Kontakt & Anfrage</p>
                    <h2 id="contact-title">Was steht bei Ihnen an?</h2>
                    <p className="contact-intro">Ob konkrete Aufgabe oder erste Frage: Erzählen Sie uns, wobei Sie Unterstützung brauchen. Wir klären die nächsten Schritte gemeinsam.</p>
                    <div className="contact-direct">
                        <a href="tel:+4917647065439"><Phone size={22} aria-hidden="true" /><span><small>Rufen Sie uns an</small>0176 47065439</span></a>
                        <a href="mailto:service@alltagsservice-nagold.de"><Mail size={22} aria-hidden="true" /><span><small>Schreiben Sie uns</small>service@alltagsservice-nagold.de</span></a>
                    </div>
                    <p className="contact-region">Für Sie vor Ort in Nagold und Umgebung.</p>
                </div>

                <form ref={formRef} className="contact-form" onSubmit={handleSubmit} aria-busy={busy} noValidate>
                    <div className="contact-progress-header"><span>Ihre unverbindliche Anfrage</span><span>Schritt {step + 1} von 3</span></div>
                    <ol className="contact-progress" aria-label="Anfrageschritte">
                        {["Leistung", "Ihr Anliegen", "Kontakt"].map((label, index) => (
                            <li key={label} className={index <= step ? "is-active" : ""} aria-current={index === step ? "step" : undefined}>
                                <span>{index < step ? <Check size={14} aria-hidden="true" /> : index + 1}</span>{label}
                            </li>
                        ))}
                    </ol>
                    <div className="contact-form-body">
                    <h3 ref={headingRef} tabIndex={-1} className="contact-question">{stepTitles[step]}</h3>
                    <p className="contact-form-note">{step === 0 ? "Wählen Sie die Leistung aus, die zu Ihrem Anliegen passt." : step === 1 ? "Ein paar Angaben reichen für den Anfang. Pflichtfelder sind mit * markiert." : "Fast geschafft. Prüfen Sie Ihre Anfrage und ergänzen Sie Ihre Kontaktdaten."}</p>
                    <fieldset disabled={busy}>
                        <div data-step="0" hidden={step !== 0}>
                            <fieldset className="contact-choices">
                                <legend className="contact-choice-legend">Gewünschte Leistung *</legend>
                                {serviceOptions.map((option, index) => {
                                    const Icon = serviceIcons[index];
                                    return <label className="contact-choice" key={option}>
                                        <input type="radio" name="service" value={option} checked={service === option} onChange={() => setService(option)} required />
                                        <span className="contact-choice-face"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span>{option}</span><span className="contact-choice-check" aria-hidden="true">{service === option && <Check size={14} />}</span></span>
                                    </label>;
                                })}
                            </fieldset>
                        </div>
                        <div data-step="1" hidden={step !== 1}>
                        <p className="contact-selected-service">{service || "Ihre Leistung"}</p>
                        <div className="contact-field"><label htmlFor="contact-message">{service === "Fahrzeugaufbereitung" ? "Was soll innen oder außen gemacht werden? *" : service === "Entrümpelung" ? "Was möchten Sie freimachen lassen? *" : service === "Reinigung" ? "Welche Räume sollen gereinigt werden? *" : "Wobei können wir helfen? *"}</label><textarea id="contact-message" name="message" required rows={4} maxLength={5000} placeholder="Beschreiben Sie kurz Ihr Anliegen." /></div>
                        <div className="contact-field"><label htmlFor="contact-location">Einsatzort</label><input id="contact-location" name="location" maxLength={200} placeholder="Zum Beispiel Nagold" /></div>
                        <div className="contact-upload">
                            <label htmlFor="contact-images"><Upload size={20} aria-hidden="true" />Bilder hinzufügen · optional</label>
                            <p id="contact-upload-help">Bis zu 5 Bilder, je maximal 5 MB. JPG, PNG oder WEBP. Fotos helfen uns, den Aufwand einzuschätzen.</p>
                            <input id="contact-images" name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple aria-describedby="contact-upload-help" onChange={event => { setFiles(Array.from(event.target.files ?? [])); uploadCache.current.clear(); }} />
                            {files.length > 0 && <ul>{files.map((file, index) => <li key={`${file.name}-${index}`}>{file.name}</li>)}</ul>}
                        </div>
                        </div>
                        <div data-step="2" hidden={step !== 2}>
                        <div className="contact-summary">
                            <div><h4>Ihre Anfrage im Überblick</h4><button type="button" onClick={() => changeStep(1)}>Bearbeiten</button></div>
                            <p className="contact-summary-service">{service}</p>
                            <p className="contact-summary-message">{summary.message}</p>
                            <p>{summary.location || "Einsatzort noch offen"} · {files.length ? `${files.length} Bild${files.length === 1 ? "" : "er"}` : "Ohne Bilder"}</p>
                        </div>
                        <div className="contact-row">
                            <div className="contact-field"><label htmlFor="contact-name">Name *</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder="Vor- und Nachname" /></div>
                            <div className="contact-field"><label htmlFor="contact-email">E-Mail-Adresse *</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Ihre E-Mail-Adresse" /></div>
                        </div>
                        <div className="contact-row">
                            <div className="contact-field"><label htmlFor="contact-phone">Telefonnummer{preferredContact !== "E-Mail" ? " *" : ""}</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={50} required={preferredContact !== "E-Mail"} placeholder={preferredContact === "E-Mail" ? "Optional" : "Ihre Telefonnummer"} /></div>
                            <div className="contact-field"><label htmlFor="contact-preferred">Bevorzugter Kontaktweg</label><select id="contact-preferred" name="preferred_contact" value={preferredContact} onChange={event => setPreferredContact(event.target.value)}><option>E-Mail</option><option>Telefon</option><option>WhatsApp</option></select></div>
                        </div>
                        <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
                        <label className="contact-privacy"><input type="checkbox" name="Datenschutz akzeptiert" value="Ja" required /><span>Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. Beim Absenden werden die Formulardaten an EmailJS und ausgewählte Bilder an Cloudinary übertragen. *</span></label>
                        </div>
                        <div className="contact-step-actions">
                            {step > 0 && <button type="button" className="contact-back" onClick={() => changeStep(step - 1)}><ArrowLeft size={16} aria-hidden="true" />Zurück</button>}
                            <button className="contact-submit" type="submit">{busy ? "Wird übermittelt …" : step < 2 ? "Weiter" : "Anfrage absenden"}<ArrowUpRight size={18} aria-hidden="true" /></button>
                        </div>
                    </fieldset>
                    <p className={`contact-status${failed ? " contact-status-error" : ""}`} role="status" aria-live="polite">{status}</p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;
