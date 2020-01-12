const puppeteer = require("puppeteer");
const jsonfile = require("jsonfile");
const jsonexport = require("jsonexport");

let JSONPush = [];
let JSONItemPage = [];

const init = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const arrayURL = await page.evaluate(() =>
    [...document.querySelectorAll("ul.pagination li>a")].map(e => e.href)
  );
  await page.close();
  await browser.close();
  const sizepaginaciones = funSizePaginacion(arrayURL);
  const paginaciones = await builRutasPaginacion(sizepaginaciones, url);
  builFile(paginaciones, "paginaciones");
  let urlItems;
  for (let i = 0; i < paginaciones.length; i++) {
    urlItems = await URLItemsPage(paginaciones[i]);
    JSONItemPage.push(urlItems);
  }
  builFile(JSONItemPage, "urls");
};

// const scraper = async url => {
//   let urls = await URLItemsPage(url);
//   let JSONdetalle;
//   for (let i = 0; i < JSONData.length; i++) {
//     const { url } = JSONData[i];
//     JSONdetalle = await URLSecond(url);
//     JSONPush.push({ url: url, data: JSONdetalle });
//   }
// };

const URLItemsPage = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const node = await page.evaluate(() => {
    return [...document.querySelectorAll("div.wrapper a")].map(elem => ({
      url: elem.href,
      type: "link"
    }));
  });
  await page.close();
  await browser.close();
  return node;
};

const URLSecond = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 0 });
  const detalles = await page.evaluate(() =>
    [...document.querySelectorAll("div.aviso_specs h2")].map(
      elem => elem.innerText
    )
  );
  const JSONEmpresa = await page.evaluate(() =>
    [...document.querySelectorAll("div.aviso_header")].map(elem => ({
      title: document.querySelector("h1.aviso_title").innerText,
      empresa: document.querySelector("span.aviso_company").innerText
    }))
  );

  let arr = new Object();
  for (let i = 0; i < detalles.length; i++) {
    if (i % 2 == 0) {
      arr[detalles[i]];
    } else {
      arr[detalles[i - 1]] = detalles[i];
    }
  }
  const node = {
    detalle: arr,
    empresa: Object.values({ ...JSONEmpresa })
  };
  console.log(node);
  await page.close();
  await browser.close();
  return node;
};

const builFile = (data, name) => {
  jsonfile.writeFile(name + ".json", data);
};

const funSizePaginacion = urlPaginacion => {
  const arrayFirst = urlPaginacion[urlPaginacion.length - 2].split("/");
  const arraySecond = arrayFirst[arrayFirst.length - 1].split("-");
  return arraySecond[arraySecond.length - 1].split(".")[0];
};

const builRutasPaginacion = async (paginas, url) => {
  var rutas = [];
  var ruta = "";
  var part = "-pagina-";
  var firstURL = url.split(".html")[0];
  rutas.push(firstURL + ".html");
  for (let i = 2; i <= paginas; i++) {
    ruta = firstURL + part + i + ".html";
    rutas.push(ruta);
  }
  return rutas;
};

init("https://www.bumeran.com.pe/empleos-busqueda-jefe-de-sistemas.html");

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
