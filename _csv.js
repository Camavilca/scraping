const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
        { id: 'url', title: 'Ruta' },
        { id: 'data.detalle.Lugar de Trabajo:', title: 'Ruta' },
    ]
});

const data = [
    {
        "url": "https://www.bumeran.com.pe/empleos/jefe-de-seguridad-en-el-trabajo-para-mina-en-chincha-dinet-1113777264.html?indiceAviso=18",
        "data": {
            "detalle": {
                "Lugar de Trabajo:": "Lima, Lima",
                "Publicado:": "Publicado hace 4 días",
                "Salario": "No especificado",
                "Tipo de puesto:": "Full-time",
                "Área:": "Mineria/Petroleo/Gas"
            },
            "empresa": [
                {
                    "title": "Jefe de Seguridad en el trabajo / Para mina en Chincha",
                    "empresa": "DINET"
                }
            ]
        }
    },
];

csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));