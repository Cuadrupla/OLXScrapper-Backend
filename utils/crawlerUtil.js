const axios = require('axios');
const cheerio = require('cheerio');
const {
    matchRegexWithModel,
    matchRegexWithColor,
    matchRegexWithState,
    matchRegexWithType,
    matchRegexWithYear,
    matchRegexWithProductType
} = require('./regexUtil');

const utilParse = (otherSource, $, preData) => {
    let description = "", image = "";
    if (otherSource) {
        description = $('.offer-description__description').text().trim();
        image = $('.photo-item > img')[0].attribs['data-lazy'];
    } else {
        description = $('div[data-cy="ad_description"] > div').text().trim();
        image = $('.swiper-zoom-container > img')[0].attribs.src;
    }

    return {
        titlu: preData.title,
        descriere: description,
        pret: preData.price,
        negociabil: preData.negociable,
        locatie: preData.location,
        data_postare: preData.posted_on,
        marca: matchRegexWithModel(preData.title, description),
        an: matchRegexWithYear(preData.title, description),
        stare: matchRegexWithState(preData.title, description),
        culoare: matchRegexWithColor(preData.title, description),
        tip: matchRegexWithProductType(preData.title, description),
        tipCarburant: matchRegexWithType(preData.title, description),
        img: image,
    }
}

const dataParse = async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data); // $ = la valoare (jQuery standards)
    let data = [];

     for (const el of $('div[data-cy="l-card"] > a')) {
        const announce_data = {
            title: $(el).find('h6').text(),
            price: $(el).find('p[data-testid="ad-price"]').parent().text()
                    .split($(el).find('h6').text())[1].split('Pre')[0].trim(),
            negociable: !!($(el).find('p[data-testid="ad-price"]').parent().text()
                .split($(el).find('h6').text())[1].split('Pre')[1]),
            location: $(el).find('p[data-testid="location-date"]').text().split('-')[0].trim(),
            posted_on: $(el).find('p[data-testid="location-date"]').text().split('-')[1].trim(),
        }
        try {
            const response = await axios.get(
                el.attribs.href.includes("autovit") ? el.attribs.href : `https://www.olx.ro${el.attribs.href}`
            );
            const $_specific = cheerio.load(response.data);

            data.push(utilParse(el.attribs.href.includes("autovit"), $_specific, announce_data))
            // console.log(utilParse(el.attribs.href.includes("autovit"), $_specific, announce_data));
        } catch (exception) {
            console.error(exception.toString());
        }
    }

    return data;
}

const getCrawledData = async (url) => {
    try {
        return await dataParse(url);
    } catch (exception) {
        console.error(exception.toString());
        return {
            error: exception.toString()
        }
    }
}

module.exports = {
    getCrawledData
}