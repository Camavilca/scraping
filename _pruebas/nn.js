import React, { useEffect } from "react";
import { json } from "./Preguntas";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import Respuestas from './Respuestas';
import { connect } from "react-redux";
import { addPrueba } from "../../../../actions/Selection"

const LiderazgoGoleman = ({ addPrueba }) => {
	useEffect(() => {
		Survey.StylesManager.applyTheme("default");
		//eslint-disable-next-line
	}, []);

	Survey.StylesManager.applyTheme("default");
	const model = new Survey.Model(json);

	const onComplete = (survey, options) => {
		const { data } = survey;
		let timonel = 0,
			visionario = 0,
			autoritario = 0,
			afiliador = 0,
			democrata = 0,
			coach = 0;
		for (var index in data) {
			const res = data[index];
			switch (res) {
				case "a":
					timonel++;
					break;
				case "b":
					visionario++;
					break;
				case "c":
					autoritario++;
					break;
				case "d":
					afiliador++;
					break;
				case "e":
					democrata++;
					break;
				case "f":
					coach++;
					break;
				default:
					break;
			}
		}
		const rests = [
			{ index: "timonel", value: timonel },
			{ index: "visionario", value: visionario },
			{ index: "autoritario", value: autoritario },
			{ index: "afiliador", value: afiliador },
			{ index: "democrata", value: democrata },
			{ index: "coach", value: coach },
		];
		let max = 0;
		for (let i = 0; i < rests.length; i++) {
			const element = rests[i].value;
			if (element > max) { max = element }
		}

		const values = rests.find(x => { x.value == max });
		const inter = values.find(y => { y.type == Respuestas });


		const detalle = {
			"timonel": timonel,
			"visionario": visionario,
			"autoritario": autoritario,
			"afiliador": afiliador,
			"democrata": democrata,
			"coach": coach
		}



		// addPrueba({
		// 	puntaje: 0,
		// 	interpretacion: Respuestas[patron],
		// 	tipo: "donatello",
		// 	nivel: patron,
		// 	detalle: detalle,
		// });

	};


	const finalAnswer = data => {


		return "";
	}

	return (
		<div className='card z-depth-1' style={{ margin: "75px auto" }}>
			<style>
				{
					".sv_main, .sv_row {background-color:#fff !important} select{height:50px !important}"
				}
			</style>
			<div className='card-content'>
				<Survey.Survey model={model} onComplete={onComplete} />
			</div>
		</div>
	);
};

export default connect(null, { addPrueba })(LiderazgoGoleman);
