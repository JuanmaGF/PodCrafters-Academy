import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import injectContext from "./store/appContext";

import Contacto from "./pages/contacto";
import SobreNosotros from "./pages/sobreNosotros";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { MiPerfil } from "./pages/miperfil";
import { Privacidad } from "./pages/privacidad";
import { Carrito } from "./pages/carrito";
import { Cursos } from "./pages/cursos";
import { MiCurso } from "./pages/micurso";
import { Modulo } from "./pages/modulo";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { ForgotPassword } from "./pages/forgotPassword";
import { Recover } from "./pages/recover";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Cursos />} path="/cursos" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<MiPerfil />} path="/miperfil" />
                        <Route element={<Privacidad />} path="/privacidad" />
                        <Route element={<Carrito />} path="/carrito" />
                        <Route element={<Contacto />} path="/contacto" />
                        <Route element={<SobreNosotros />} path="/sobreNosotros" />
                        <Route element={<MiCurso />} path="/micurso" />
                        <Route element={<Modulo />} path="/modulo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<ForgotPassword />} path="/forgotPassword" />
                        <Route element={<Recover />} path="/recover" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
