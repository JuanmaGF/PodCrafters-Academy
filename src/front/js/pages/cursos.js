import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PopupPDI from "../component/popupPDI";
import "../../styles/curso.css";
import PodCrafterIniciacion from "../../../../public/images/PodCrafterIniciacion.jpg";
import PodCrafterIntermedio from "../../../../public/images/PodCrafterIntermedio.jpg";
import PodCrafterExperimentado from "../../../../public/images/PodCrafterExperimentado.jpg";
import PodCrafterMaster from "../../../../public/images/PodCrafterMaster.jpg";

export const Cursos = () => {
    const { store, actions } = useContext(Context);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState(null);

    useEffect(() => {
        actions.getCursos();
    }, []);

    const handleSaberMasClick = (curso) => {
        setPopupOpen(true);
        setSelectedCurso(curso);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 mb-3">
                        <div className="cursoTitulo1">Encuentra un curso</div>
                        <div className="cursoTitulo2">que se adapte a ti</div>
                    </div>
                </div>
                <div className="row">
                    {store.cursos.map((curso, index) => (
                        <div key={index} className="col-md-3 col-sm-6 mb-4">
                            <div className="card curso-card">
                                {index === 0 && <img src={PodCrafterIniciacion} className="card-img-top" alt="PodCrafter Iniciacion" />}
                                {index === 1 && <img src={PodCrafterIntermedio} className="card-img-top" alt="PodCrafter Intermedio" />}
                                {index === 2 && <img src={PodCrafterExperimentado} className="card-img-top" alt="PodCrafter Experimentado" />}
                                {index === 3 && <img src={PodCrafterMaster} className="card-img-top" alt="PodCrafter Master" />}
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{curso.name}</h5>
                                        <p className="card-text">{curso.precio} €</p>
                                    </div>
                                    <button className="btn btn-primary mt-auto" style={{backgroundColor: '#ff7f0e'}} onClick={() => handleSaberMasClick(curso)}>Saber más</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {popupOpen && <PopupPDI curso={selectedCurso} handleClosePopup={handleClosePopup} />}
        </div>
    );
};
