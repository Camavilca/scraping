



const rests = [12, 3, 5, 34, -3, 2];
const detalle = {
    "timonel": 12,
    "visionario": 3,
    "autoritario": 5,
    "afiliador": 34,
    "democrata": 0,
    "coach": 2
}

let max = 0;
for (let i = 0; i < rests.length; i++) {
    const element = rests[i];
    if (element > max) { max = element }
}

console.log(max);



// console.log(
//     "timonel: " + timonel,
//     "visionario: " + visionario,
//     "autoritario: " + autoritario,
//     "afiliador: " + afiliador,
//     "democrata: " + democrata,
//     "coach: " + coach
// );
