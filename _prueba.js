const datos = [
    'Lugar de Trabajo:',
    'Juliaca, Puno',
    'Publicado:',
    'Hoy',
    'Salario',
    'No especificado',
    'Tipo de puesto:',
    'Full-time',
    'Área:',
    'Oficios y Profesiones'
]
let arr = new Object();

for (let i = 0; i < datos.length; i++) {
    if (i % 2 == 0) { arr[datos[i]] }
    else { arr[datos[i - 1]] = datos[i] }
}

console.log(arr);


// var check = ['x', 'y', 'z'];
// console.log(Object.keys(check));

var miObjeto = new Object(),
    cadena = "miCadena",
    aleatorio = Math.random(),
    objeto = new Object();

miObjeto.type = "Sintaxis con punto";
miObjeto["Fecha de creación"] = "Cadena con espacios y acento";
miObjeto[cadena] = "String value";
miObjeto[aleatorio] = "Número Aleatorio";
miObjeto[objeto] = "Objeto";
miObjeto[""] = "Incluso una cadena vacía";

console.log(miObjeto);