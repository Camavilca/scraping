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