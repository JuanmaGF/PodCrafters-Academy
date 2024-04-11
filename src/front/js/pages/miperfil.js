import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PodCrafterIniciacion from "../../../../public/images/PodCrafterIniciacion.jpg";
import { Link } from "react-router-dom";
import "../../styles/miperfil.css";
import ReactModal from 'react-modal';

export const MiPerfil = () => {
    const { store, actions } = useContext(Context);
    const [newPassword, setNewPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);

    // Profile picture state
    const [profilePicture, setProfilePicture] = useState(null);

    // Estados para la edición del perfil
    const [editProfile, setEditProfile] = useState(false);
    const [editedUserName, setEditedUserName] = useState(store.user?.userName || '');
    const [editedFirstName, setEditedFirstName] = useState(store.user?.firstName || '');
    const [editedLastName, setEditedLastName] = useState(store.user?.lastName || '');
    const [editedTelephone, setEditedTelephone] = useState(store.user?.telephone || '');

    // Función para manejar la actualización del perfil
    const handleUpdateProfile = () => {
        actions.updateProfile(editedUserName, editedFirstName, editedLastName, editedTelephone);
        setEditProfile(false);
    };

    const handleChangePassword = () => {
        actions.changePassword(store.user.email, newPassword);
        setShowChangePassword(false);
        setNewPassword('');
    };

    // Function to handle profile picture upload
    const handleProfilePictureUpload = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    useEffect(() => {
        actions.verifyIdentity();
        actions.getCursos();
    }, []);

    if (!store.user) {
        return <p>No hay usuario autenticado</p>;
    }

    const { email, telephone, firstName, lastName } = store.user;

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-5">
                    <div className="perfil_top rounded py-3 px-3">
                        <div className="row">
                            <div className="foto-perfil mb-3 position-relative">
                                <div className="profile-picture-container">
                                    {profilePicture ? (
                                        <img src={URL.createObjectURL(profilePicture)} alt="User Icon" className="profile-picture" />
                                    ) : (
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="User Icon" className="profile-picture" />
                                    )}
                                </div>
                                <label htmlFor="file-input" className="edit-icon">
                                    <i className="fas fa-edit"></i>
                                </label>
                                <input id="file-input" type="file" onChange={handleProfilePictureUpload} accept="image/*" className="file-input" style={{ display: "none" }} />
                            </div>
                            <div className="titulo_perfil">¡Hola {store.user.userName}!</div>
                            <div className="info_perfil">
                                <p><strong>Nombre:</strong> {firstName}</p>
                                <p><strong>Apellidos:</strong> {lastName}</p>
                                <p><strong>Correo Electrónico:</strong> {email}</p>
                                <p><strong>Teléfono:</strong> {telephone}</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="botones_editar_perfil">
                                <button
                                    className="btn btn_modificar"
                                    onClick={() => {
                                        setEditProfile(!editProfile);
                                        setShowChangePassword(false);
                                    }}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>Modificar Perfil
                                </button>
                                <button
                                    className="btn btn_cambiar_contraseña"
                                    onClick={() => {
                                        setShowChangePassword(!showChangePassword);
                                        setEditProfile(false);
                                    }}
                                >
                                    <i className="fa-solid fa-lock"></i>Cambiar contraseña
                                </button>
                            </div>
                        </div>
                        {showChangePassword && (
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="btn btn-success"
                                    style={{ backgroundColor: '#5CB85C', borderColor: '#4CAE4C' }}
                                    onClick={handleChangePassword}
                                >
                                    Confirmar cambio de contraseña
                                </button>
                            </div>
                        )}
                        <ReactModal
                            isOpen={editProfile}
                            onRequestClose={() => setEditProfile(false)}
                            contentLabel="Editar Perfil"
                            style={{
                                content: {
                                    width: '400px',
                                    height: '600px',
                                    margin: 'auto',
                                    backgroundColor: '#9ac0cd',
                                },
                            }}
                        >
                            <button onClick={() => setEditProfile(false)} style={{ position: 'absolute', right: '10px', top: '10px' }}>X</button>
                            <div className="col-12 mt-3">
                                <div className="mb-3">
                                    <label htmlFor="editedUserName" className="form-label">Nombre de usuario</label>
                                    <input type="text" id="editedUserName" value={editedUserName} onChange={(e) => setEditedUserName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editedFirstName" className="form-label">Nombre</label>
                                    <input type="text" id="editedFirstName" value={editedFirstName} onChange={(e) => setEditedFirstName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editedLastName" className="form-label">Apellidos</label>
                                    <input type="text" id="editedLastName" value={editedLastName} onChange={(e) => setEditedLastName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editedTelephone" className="form-label">Telefono</label>
                                    <input type="text" id="editedTelephone" value={editedTelephone} onChange={(e) => setEditedTelephone(e.target.value)} />
                                </div>
                                <button className="btn_modificar" onClick={handleUpdateProfile}>Guardar cambios</button>
                            </div>
                        </ReactModal>
                    </div>
                </div>
                <div className="col-7">
                    <div className="perfil_cursos">
                        <div className="titulo_cursos">Mis Cursos</div>
                        {store.cursos.map((curso, index) => (
                            <div key={index} className="card curso">
                                <img src={PodCrafterIniciacion} className="card-img-top card-images p-2" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{curso.name}</h5>
                                    <p className="card-text">¡Entra para empezar con tu curso!</p>
                                    <Link to="/micurso" className="btn btn-outline-light">Ir al curso</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};
