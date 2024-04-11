import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import loginImg from "../../../../public/images/login.png";
import {gapi} from "gapi-script"
import GoogleLogin from "react-google-login" 
export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLoginSubmit(e) {
        e.preventDefault();
        actions.login(email, password, navigate);
    }

    function handleSignupClick() {
        navigate('/signup');
    }

    const clientID = '303124886371-sbe93u3udv073ggddo3tnmhiblt1nf19.apps.googleusercontent.com'
    const [user, setUser] = useState({})
    useEffect(() =>{
       const start = () => {
        gapi.auth2.init({
            clientId: clientID,
        })
       }
       gapi.load("client:auth2", start)
    })
    
    const onSuccess = (response) => {
        setUser(response.profileObj);
    }

    const onFailure = () => {
        console.log("Algo salio mal")
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <div className="card">
                        <div className="row cardContainer">
                            <div className="col-6">
                                <div className="card-body">
                                    <div className="mb-5">
                                        <h1 className="text-center mt-5">¡Bienvenido de nuevo!</h1>
                                    </div>
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className="d-flex flex-row align-items-center mb-2">
                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div className="form-floating flex-fill mb-0">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="test@test.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="email" className="form-label">Tu correo electronico</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-floating flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Contraseña"
                                                        required
                                                    />
                                                    <label htmlFor="password" className="form-label">Tu contraseña</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col mt-3 ms-2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" name="remember_me" />
                                                <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                    Mantener sesión inciada
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col mt-4">
                                            <div className="d-grid">
                                                <button className="btn btnIniciarSesion" type="submit">Iniciar sesión</button>
                                            </div>
                                            <div className="d-grid mt-2">
                                              
                                                <GoogleLogin 
                                                    clientId={clientID}
                                                    onSuccess={onSuccess}
                                                    onFailure={onFailure}
                                                    cookiePolicy={"single_host_policy"}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                    <div className="d-flex gap-5 flex-row justify-content-center mt-4">
                                        <Link to="/signup" className="text-decoration-none linksContraseña">Crear una cuenta nueva</Link>
                                        <Link to="/forgotPassword" className="text-decoration-none linksContraseña">He olvidado mi contraseña </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <img className="w-100 h-100 object-fit-cover" loading="lazy" src={loginImg} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};