const detalles = [
    {
        tipo: 'autoritario',
        porcentaje: 1
    },
    {
        tipo: 'timonel',
        porcentaje: 2
    },
    {
        tipo: 'visionario',
        porcentaje: 3
    },
    {
        tipo: 'afiliador',
        porcentaje: 5
    },
    {
        tipo: 'democrata',
        porcentaje: 8
    },
    {
        tipo: 'coach',
        porcentaje: 6
    }
];



const respuesta = (detalles, max) => {
    const value = detalles.find(x => { return x.porcentaje == max });
    const index = detalles.indexOf(value);
    console.log(":::::::::::::::::::::::::::::")
    console.log(":::::::::::::::::::::::::::::")
    console.log(index);
    console.log(":::::::::::::::::::::::::::::")
    // return Respuestas[];
}


respuesta(detalles, 3)