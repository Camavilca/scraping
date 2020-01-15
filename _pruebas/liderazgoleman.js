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
        // const values = [
        // 	{ index: 0, value: autoritario },
        // 	{ index: 1, value: timonel },
        // 	{ index: 2, value: visionario },
        // 	{ index: 3, value: afiliador },
        // 	{ index: 4, value: democrata },
        // 	{ index: 5, value: coach },
        // ];

        // const detalle = {
        // 	"autoritario": autoritario,
        // 	"timonel": timonel,
        // 	"visionario": visionario,
        // 	"afiliador": afiliador,
        // 	"democrata": democrata,
        // 	"coach": coach
        // }


        const detalles = [
            {
                tipo: 'autoritario',
                porcentaje: autoritario
            },
            {
                tipo: 'timonel',
                porcentaje: timonel
            },
            {
                tipo: 'visionario',
                porcentaje: visionario
            },
            {
                tipo: 'afiliador',
                porcentaje: afiliador
            },
            {
                tipo: 'democrata',
                porcentaje: democrata
            },
            {
                tipo: 'coach',
                porcentaje: coach
            }
        ];



        const max = maxValue(detalles);
        const resultado = respuesta(detalles, max);

        addPrueba({
            ...resultado,
            porcentaje: 0,
            puntaje: max,
            tipo: "goleman",
            detalle: detalles,
        });

    };

    const maxValue = detalles => {
        let max = 0;
        for (let i = 0; i < detalles.length; i++) {
            const value = detalles[i].porcentaje;
            if (value > max) { max = value }
        }
        return max;
    }

    const respuesta = (detalles, max) => {
        const value = detalles.find(x => { return x.porcentaje == max });
        const index = detalles.indexOf(value);
        return Respuestas[index];
    }

    // const maxValue = values => {
    // 	let max = 0;
    // 	for (let i = 0; i < values.length; i++) {
    // 		const value = values[i].value;
    // 		if (value > max) { max = value }
    // 	}
    // 	return max;
    // }
    // const respuesta = (values, max) => {
    // 	const value = values.find(x => { return x.value == max });
    // 	return Respuestas[value.index];
    // }

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
