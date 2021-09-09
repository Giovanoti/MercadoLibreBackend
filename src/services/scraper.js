  
const puppeteer = require('puppeteer');

/**
 * Go to url and return the page title
 * @param {string} url
 * @returns {string}
 */
async function getPageTitle(url,TipoBusqueda) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.type('body > header > div > form > input',TipoBusqueda); // body > header > div > form > input
	await page.screenshot({ path:'BarraBusqueda.png'});
	await page.click('[type=submit]');
 	await page.screenshot({ path:'busqueda.png'});
	const link= await page.evaluate(()=>{
		return document.querySelector("#root-app > div > div > section > div.ui-search-view-options__container > div > div > div > div.ui-search-sort-filter > div > div > div > ul > li:nth-child(2) > a").href
	})
	await page.goto(link);
	await page.screenshot({ path:'MenorPrecio.png'});
	const Tabla = await page.evaluate(() => Array.from(document.querySelectorAll('div > div > section > ol > li'), element => element.innerText));
	let Devolver = [], Aux;
	for(var i = 0; i < 15; i++){
		Aux = Tabla[i];
		Aux = Aux.substring(0, Aux.indexOf("en\n"));
		Aux = Aux.replace(/\n/g, '');
		Devolver.push(Aux);
	}
	console.log(Devolver);
	


 //#root-app > div > div > section > ol > li > div > div > div > div > div> div > a > div > div > span > span.price-tag-amount > span.price-tag-fraction

	await browser.close();
	return Devolver;
	
}
//**   */
/* async function getPageBody(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	const links = await page.evaluate(() => {
		const elements = document.querySelectorAll('[class="my-3 col-lg-2 col-md-3 col-sm-4 col-6"] a')
		const links = []
		for (let element of elements) {
			links.push(element.href) // Query selector All
		}
		return links
	});

	const films = []
	for (const link of links) {
		console.log(link)
		await page.goto(link, { waitUntil: 'networkidle0' });
		await page.waitForTimeout(800)
		await page.click('[class="img gaussian"]')
		await page.waitForTimeout(800)
		const film = await page.evaluate(() => {
			const main = document.querySelector('[class="row"]')
			const image = main.children[0].children[0].children[0].style.backgroundImage.slice(4, -1).replace(/"/g, "");
			const main2 = main.children[1].children[1].children[1]
			const props = main2.children[2].children[0].children
			const synopsisMain = main2.children[0]
			const synopsisP1 = synopsisMain.innerText
			const synopsisP2 = synopsisMain.childNodes[2].innerText
			const end = synopsisP2.indexOf('\n\n')
			const sypnopsis = synopsisP1.substring(0, synopsisP1.length - 11) + synopsisP2.substring(0, end)
			const trailer = document.getElementById('player').children[0].children[0].src
			var film
			for (var i = 0, len = props.length; i < len; i++) {
				film = {
					originalTitle: props[1].children[1].innerText,
					title: props[0].children[1].innerText,
					synopsis: sypnopsis,
					starred: props[2].children[1].innerText,
					director: props[3].children[1].innerText,
					porterPhoto: image,
					trailer: trailer
				}
			}
			return film
		});

		film.trailer = parseToUrlNormal(film.trailer)
		films.push(film)
	}

	await browser.close();

	return films;
} */

function parseToUrlNormal(url) {
	//\\/[A-Za-z0-9\\_] inicia 30 termina ? https://www.youtube.com/embed/
	const start = 30
	const end = url.indexOf('?')
	const parsedURL = 'https://www.youtube.com/watch?v=' + url.substring(start, end)
	return parsedURL

}

module.exports = {
	getPageTitle,
	/* getPageBody */
};