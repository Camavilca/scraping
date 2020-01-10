const puppeteer = require("puppeteer");
const jsonfile = require("jsonfile");
const jsonexport = require("jsonexport");

let JSONPush = [];

const init = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const paginations = await page.evaluate(() =>
    [...document.querySelectorAll('ul.pagination li>a')].map(e =>
      e.href
    )
  );
  await page.close();
  await browser.close();
  const sizep = sizePagina(paginations);
  const rutas = builRuta(sizep, url);
  for (let i = 0; i < rutas.length; i++) {
    console.log(rutas[i]);
    await scraper(rutas[i]);
  }
}

const sizePagina = paginations => {
  const arrayFirst = paginations[paginations.length - 2].split('/');
  const arraySecond = arrayFirst[arrayFirst.length - 1].split('-');
  return arraySecond[arraySecond.length - 1].split('.')[0];
}

const builRuta = async (paginas, url) => {
  var rutas = [];
  var ruta = "";
  var part = "\-pagina\-"
  var firstURL = url.split('.html')[0];
  rutas.push(firstURL + "\.html")
  for (let i = 2; i <= paginas; i++) {
    ruta = firstURL + part + i + "\.html";
    rutas.push(ruta);
  }
  jsonfile.writeFile("rutas.json", rutas);
  return rutas;
}



const scraper = async (url) => {
  let JSONData = await URLResponse(url);
  console.log(JSONData);
  let JSONdetalle;
  for (let i = 0; i < JSONData.length; i++) {
    const { url } = JSONData[i];
    JSONdetalle = await URLSecond(url);
    JSONPush.push({ url: url, data: JSONdetalle });
  }
};


const URLResponse = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const node = await page.evaluate(() => {
    var div = "div";
    var type = "\.";
    var clearfix = "clearfix";
    var a = "a";
    var name = ".logo\-empresa";
    return [...document.querySelectorAll(div + type + clearfix + " " + a + name)].map(elem => ({
      url: elem.href,
      type: "link"
    }))
  }
  );
  await page.close();
  await browser.close();
  jsonfile.writeFile("url.json", node);
  return node;
}

const URLSecond = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 0 });
  const detalles = await page.evaluate(() =>
    [...document.querySelectorAll('div.aviso_specs h2')].map(elem =>
      elem.innerText
    )
  );
  const JSONEmpresa = await page.evaluate(() =>
    [...document.querySelectorAll('div.aviso_header')].map(elem => ({
      title: document.querySelector('h1.aviso_title').innerText,
      empresa: document.querySelector('span.aviso_company').innerText
    }))
  );

  let arr = new Object();
  for (let i = 0; i < detalles.length; i++) {
    if (i % 2 == 0) { arr[detalles[i]] }
    else { arr[detalles[i - 1]] = detalles[i] }
  }
  const node = {
    detalle: arr,
    empresa: Object.values({ ...JSONEmpresa })
  }
  console.log(node);
  await page.close();
  await browser.close();
  return node;
}

const builJSON = (JSONPush) => {
  jsonfile.writeFile("example.json", JSONPush);
}

init("https://www.bumeran.com.pe/empleos-busqueda-jefe-de-sistemas.html");

// builJSON(JSONPush);

/**
 * ------------------------------------------------------------
 *  NAVEGADOR QUERY
 *  Array.from(document.querySelectorAll("div.aviso_specs h2")).map((x) => x.innerText)
 * ------------------------------------------------------------
 * ------------------------------------------------------------
 * QUERY DIFERENT
 * [...document.querySelectorAll('div.aviso_specs h2')].map(elem => ({
 *   [elem.innerText]: elem.innerText
 * }));
 * -------------------------------------------------------------
 */

/**
 * LINK DE DOCUMENTACION
 *
 * https://github.com/puppeteer/puppeteer/issues/489
 * https://www.youtube.com/watch?v=pixfH6yyqZk
 *
 */