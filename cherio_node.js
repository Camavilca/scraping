const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request('https://www.bumeran.com.pe/empleos-busqueda-jefe-de-sistemas.html', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    paginations($);
  }
});

const paginations = $ => {
  let values = [];
  let first;
  $('.pagination').each((i, el) => {
    $(el).find('li').each((x, y) => {
      const max = $(y).find('a').text()
      first = $(y).find('a').attr('href');
      values.push(max);
    });
  });
  maxnum(values, first);
};

const maxnum = (array, first) => {
  console.log(first);
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i]
  }
  return max;
}


// $('.aviso').each((i, el) => {
//   const link = $(el).find('a').attr('href')
//   const title = $(el).find('.titulo-aviso').text();
//   const empresa = $(el).find('.empresa_nombre_link').text().replace(/\s\s+/g, '');;
//   const ubicacion = $(el).find('.ubicacion_link').text().replace(/\s\s+/g, '');;
//   const data = {
//     link: link,
//     title: title,
//     nombre: empresa,
//     ubicacion: ubicacion,
//   }
//   console.log(data);
// });