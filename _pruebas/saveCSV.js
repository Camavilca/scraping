const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("out.csv");
const { Parser } = require("json2csv");

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
    }
]

const builFileCSV = data => {
    const fields = [
        'url',
        'data.detalle.Lugar de Trabajo:',
        'data.detalle.Publicado:',
        'data.detalle.Salario',
        'data.detalle.Tipo de puesto:',
        'data.detalle.Área:',
    ];
    const json2csvParser = new Parser({ fields, unwind: ['data', 'data.detalle'] });
    const csv = json2csvParser.parse(data);
    fastcsv
        .write(csv, { headers: true })
        .pipe(ws)
}

builFileCSV(data);