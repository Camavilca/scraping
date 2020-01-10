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
