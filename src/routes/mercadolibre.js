const scraper = require('../services/scraper');

async function get(req, res) {
    try {
        const pageTitle = await scraper.getPageTitle('https://www.mercadolibre.com.co','Tarjeta Grafica');
        res.writeJSONResponse({ data: { pageTitle } }, 200);
    } catch (err) {
        res.writeJSONResponse({ data: null, err: err.message }, 500);
    }
}

module.exports = {
    get,
};