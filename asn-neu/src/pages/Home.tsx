import usePageNavigation from "../hooks/usePageNavigation.ts";
import About from "../components/About/About.tsx";
import Hero from "../components/Hero/Hero.tsx";
import Services from "../components/Services/Services.tsx";
import Gallery from "../components/Gallery/Gallery.tsx";
import Process from "../components/Process/Process.tsx";
import Contact from "../components/Contact/Contact.tsx";
import useScrollReveal from "../hooks/useScrollReveal.ts";

function Home() {
    usePageNavigation("AlltagsService Nagold – Hilfe im Alltag");
    useScrollReveal();
    return <><Hero /><Services /><About /><Gallery /><Process /><Contact /></>;
}

export default Home;
