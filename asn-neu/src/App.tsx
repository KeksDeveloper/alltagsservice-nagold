import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";

const Projects = lazy(() => import("./pages/Projects.tsx"));

function App() {

  return (
    <>
        <Header />
        <main id="main-content">
            <Suspense fallback={<p className="route-loading" role="status">Projektübersicht wird geladen …</p>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projekte" element={<Projects />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </main>
        <Footer />
    </> 
  )
}

export default App
