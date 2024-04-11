import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import VideoHomePage from "../../../../public/video/videoHomePage.mp4"
import VideoPodCrafters from "../../../../public/video/PodCrafters_Academy.mp4";
import podcasterSobreNosotrosMain from "../../../../public/images/podcasterSobreNosotrosMain.jpg";
import testim1 from "../../../../public/images/testim1.jpg";
import testim2 from "../../../../public/images/testim2.jpg";
import testim3 from "../../../../public/images/testim3.jpg";
import PodCrafterIniciacion from "../../../../public/images/PodCrafterIniciacion.jpg";
import PodCrafterIntermedio from "../../../../public/images/PodCrafterIntermedio.jpg";
import PodCrafterExperimentado from "../../../../public/images/PodCrafterExperimentado.jpg";
import PodCrafterMaster from "../../../../public/images/PodCrafterMaster.jpg";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const videoRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setTimeout(() => {
						videoRef.current.play();
					}, 1000);
				} else {
					videoRef.current.pause();
				}
			},
			{
				threshold: 0.5,
			}
		);

		observer.observe(videoRef.current);
		return () => {
			observer.unobserve(videoRef.current);
		};
	}, []);


	return (
		<div>
			<div className="heroVideo">
				<video
					autoPlay
					muted
					loop
					style={{
						position: "absolute",
						width: "100%",
						left: "50%",
						top: "50%",
						height: "100%",
						objectFit: "cover",
						transform: "translate(-50%, -50%)",
						zIndex: "-1"
					}}
				>
					<source src={VideoHomePage} type="video/mp4" />
				</video>
				<div className="heroMain">
					<div className="container">
						<div className="heroText">
							<div className="heroOpiniones">
								4.8/5 de 1000+ opiniones 🔥
							</div>
							<h1 className="heroTitle">
								Tu voz, nuestro compromiso.
							</h1>
							<div className="Pod">PodCrafters Academy</div>
							<div className="heroButton">
								<a href="#dirCurso" className="btn btnHero">Ver cursos</a>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div className="sobreNosotrosMain">
				<div className="container">
					<div className="row mb-4">
						<div className="col-6">
							<div className="sobreNosotrosTitulo1">
								Aprende con los mejores..
								<br />¡Aprende con PodCrafters!
							</div>
							<div className=" sobreNosotrosInfo">
								Inscríbete ahora en nuestra formación en vivo, probada y especializada en podcasting.
								<p>Únete a la industria del podcasting y alcanza tus metas profesionales.</p>
								<br />
								<a href="/signup" className="sobreNosotrosBtn">¡Tu futuro comienza aquí!</a>
							</div>
						</div>
						<div className="col-6 ">
							<video
								ref={videoRef}
								muted
								controls
								autoPlay
								style={{
									width: "100%",
									left: "50%",
									top: "50%",
									height: "100%",
									objectFit: "cover",
								}}
							>
								<source src={VideoPodCrafters} type="video/mp4" />
							</video>
						</div>
					</div>
					<div className="row">
						<div className="col-4 sobreNosotrosCards">
							<div >
								<img
									src={podcasterSobreNosotrosMain}
									alt="Sobre Nosotros"
									style={{ width: '400px', height: '400px' }}
									className="sobreNosotrosImg"
								/>
							</div>
						</div>
						<div className="col-4 sobreNosotrosCards">
							<div className="sobreNosotrosCardContainer">
								<div className="sobreNosotrosCard1">
									Obteniendo una  puntuación promedio de 4.8 sobre 5, nuestros cursos demuestran nuestro compromiso con la excelencia en PodCrafters Academy.
								</div>
								<div className="d-flex sobreNosotrosCard2">
									4.8/5
								</div>
								<div className="sobreNosotrosStars">
									★★★★☆
								</div>

							</div>
						</div>
						<div className="col-4 sobreNosotrosCards">
							<div className="sobreNosotrosCardContainer">
								<div className="sobreNosotrosCard1">
									¡Únete a una comunidad de éxito! Formada por más de 1000 graduados altamente satisfechos que han pasado por nuestros cursos.
								</div>
								<div className="sobreNosotrosCard2">
									1145+
									<div className="sobreNosotrosCard2sub">Alumnos graduados</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="dirCurso" className="cursosMain">
				<div className="container">
					<div className="cursosTitle">
						Explora nuestros cursos de vanguardia
					</div>
					<div className="cursosBody container">
						<div className="row justify-content-around primeraFilaCurso">
							<div className="card col-4 cardBody" >
								<img src={PodCrafterIniciacion} className="card-img-top" alt="..." />
								<div className="cardText">
									<h5 className="cardTitle">PodCrafter Iniciación</h5>
									<p className="cardSubTitle">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								</div>
								<a href="/cursos" className="btn btnMainCurso">Saber más</a>
							</div>
							<div className="card col-4 cardBody" >
								<img src={PodCrafterIntermedio} className="card-img-top" alt="..." />
								<div className="cardText">
									<h5 className="cardTitle">PodCrafter Intermedio</h5>
									<p className="cardSubTitle">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								</div>
								<a href="/cursos" className="btn btnMainCurso">Saber más</a>
							</div>
						</div>

						<div className="row justify-content-around segundaFilaCurso">
							<div className="card col-4 cardBody" >
								<img src={PodCrafterExperimentado} className="card-img-top" alt="..." />
								<div className="cardText">
									<h5 className="cardTitle">PodCrafter Experimentado</h5>
									<p className="cardSubTitle">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								</div>
								<a href="/cursos" className="btn btnMainCurso">Saber más</a>
							</div>
							<div className="card col-4 cardBody" >
								<img src={PodCrafterMaster} className="card-img-top" alt="..." />
								<div className="cardText">
									<h5 className="cardTitle">PodCrafter <br /> Master</h5>
									<p className="cardSubTitle">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								</div>
								<a href="/cursos" className="btn btnMainCurso">Saber más</a>
							</div>
						</div>
					</div>

				</div >

			</div >

			<div className="testimoniosMain">
				<div className="container">
					<div className="testimoniosTitle">
						Lo que nuestros estudiantes dicen
					</div>
					<div className="testimoniosBody">
						<div className="row justify-content-between">
							<div className="col-4" >
								<div className="testimonioText">
									"PodCrafters Academy ha sido mi mejor inversión. Los cursos son claros, prácticos y llenos de valor. ¡No podría estar más satisfecho! Lo recomiendo a todo el mundo."
									<br />
									<br />
									<div>- Andrea G.</div>
									<div><img className="testimonioImg" src={testim1} alt="..." /></div>
								</div>
							</div>
							<div className="col-4" >
								<div className="testimonioText">
									"Gracias a PodCrafters Academy, he lanzado mi podcast y recibido comentarios increíbles. ¡Estoy emocionado por seguir aprendiendo y creciendo!"
									<br />
									<br />
									<div>- Bamidele A.</div>
									<div><img className="testimonioImg" src={testim2} alt="..." /></div>
								</div>
							</div>
							<div className="col-4" >
								<div className="testimonioText">
									"Increíble experiencia de aprendizaje en PodCrafters Academy. Los cursos son directos al grano y la comunidad es muy solidaria. Recomendado al 100%."
									<br />
									<br />
									<div>- Marta P.</div>
									<img className="testimonioImg" src={testim3} alt="..." />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};