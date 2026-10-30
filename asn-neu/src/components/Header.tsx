import logo from '../Pictures/logosmall.png';
import { Send } from "lucide-react";

function Header() {
    // @ts-ignore
    return(
        <>
            <section className="header">

                <div className="header-left">
                    <div className="header-logo">
                        <img className="header-logo-img" src={logo} alt="" />
                    </div>
                    <div className="header-brand">
                        <h2 className="header-brand-title">Alltagsservice Nagold</h2>
                        <p className="header-brand-subtitle">Nagold & Umgebung</p>
                    </div>
                </div>

                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <li className="header-nav-item">Startseite</li>
                        <li className="header-nav-item">Leistungen</li>
                        <li className="header-nav-item">Über uns</li>
                        <li className="header-nav-item">Referenzen</li>
                    </ul>
                </nav>

                <div className="header-right">
                    <button className="header-cta">
                        <Send size={19} strokeWidth={1.8} />
                        Jetzt Anfragen
                    </button>
                </div>
            </section>
        </>
    )
}

export default Header