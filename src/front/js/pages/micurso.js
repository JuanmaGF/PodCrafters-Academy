import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import mentor1 from "../../img/mentor1.jpg";
import mentor2 from "../../img/mentor2.jpg";
import mentor3 from "../../img/mentor3.jpg";
import "../../styles/micurso.css";

export const MiCurso = () => {
    const { store, actions } = useContext(Context);
    const [checkedStates, setCheckedStates] = useState([]);

    useEffect(() => {
        actions.getModulos();
        actions.getCursos();
    }, []);

    const primerCurso = store.cursos.length > 0 ? store.cursos[0].name : '';
    const modulosCurso = store.modulo ? store.modulo.filter(modulo => modulo.id_curso === 1) : [];
    
    const handleClick = (index) => {
        if (!checkedStates[index]) {
            const newCheckedStates = [...checkedStates];
            newCheckedStates[index] = true;
            setCheckedStates(newCheckedStates);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <p className="display-4" style={{ color: '#9AC0CD' }}>{primerCurso}</p>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-md-4">
                    <div className="text-right">
                        <p style={{ color: '#9AC0CD' }}>Solicitar Mentorías</p>
                        <div>
                            <a href="https://calendly.com/podcraftersacademy/" target="_blank" rel="noopener noreferrer"><img src={mentor1} alt="User Icon" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '5px' }} /></a>
                            <a href="https://calendly.com/podcraftersacademy/" target="_blank" rel="noopener noreferrer"><img src={mentor2} alt="User Icon" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '5px' }} /></a>
                            <a href="https://calendly.com/podcraftersacademy/" target="_blank" rel="noopener noreferrer"><img src={mentor3} alt="User Icon" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '5px' }} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-10 mb-2">
                    {modulosCurso.map((modulo, index) => (
                        <Link to={`/modulo/${modulo.id}`} key={index} className="text-decoration-none">
                            <div className="card rounded-pill mt-2 module-card" style={{ backgroundColor: "#9AC0CD" }} >
                                <div className="card-body row" onClick={() => handleClick(index)}>
                                    <p className="bg-primary text-white rounded-circle p-3 col-md-1 d-flex align-items-center justify-content-center ms-2" style={{ width: '30px', height: '30px', margin: '0' }}>
                                        {index + 1}
                                    </p>
                                    <p className="col-md-9">{modulo.nombre_modulo}</p>
                                    <i className={`fa-solid fa-circle-check col-md-2 fs-2 ${checkedStates[index] ? 'text-primary' : ''} text-end`}></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
