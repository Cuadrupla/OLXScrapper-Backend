const matchRegexWithModel = (title, description) => {
    const models = {
        "Seat": /seat/gmi,
        "Toyota": /to(y|i)ota?/gmi,
        "Hyundai": /h(y|i|u)u?nda(i|y)?/gmi,
        "Renault": /reno|rena(ul)?t|renau?lt?/gmi,
        "Dacia": /daci(a|e)|logan|sandero/gmi,
        "Skoda": /s(k|c)oda|octavia?|fabia?/gmi,
        "Volkswagen": /vw|volkw|vwasgen|voltsvagh?en?|volksw?agh?en|pass?at|golf|polo/gmi,
        "Audi": /audi?|a\d{1}/gmi,
        "BMW": /be?me?(v|w)e?|(e|f)\d{2}/gmi,
        "Opel": /opel|astra|corsa/gmi,
        "Mercedes-Benz": /mertan|benz[^a-zA-Z]|mercedes|ae?mgh?e?|\w (c|k)lass?/gmi,
        "Ford": /ford|mk\d{1}|fiesta|focus|(c|k)uga/gmi,
        "Citroen": /c\d{1}|cit?roen/gmi,
        "Honda": /honda?|civic/gmi,
        "Peugeot": /peu?geot?|pejou/gmi,
        "Fiat": /fiat|pun?t?to|tipo/gmi,
        "Ferrari": /ferr?ari/gmi,
        "Lamborghini": /lambo/gmi,
        "Tesla": /tesla/gmi,
        "Alfa Romeo": /alfa|romeo/gmi,
        "Bugatti": /bugat?ti/gmi,
        "Jeep": /je?ep/gmi,
        "Land Rover": /land|rover/gmi,
        "Kia": /(c|k)h?ia/gmi,
        "Mazda": /ma(s|z)da/gmi,
        "Nissan": /nis?san/gmi,
        "Saab": /saa?b/gmi,
        "Suzuki": /suzuki|vit?tarr?a/gmi,
        "Volvo": /volvo/gmi,
        "Yamaha": /(i|y)aman?a?ha/gmi,
        "Daewoo": /daewoo?|mati(s|z)/gmi
    }

    for (const key in models) {
        if (title.match(models[key]) || description.match(models[key])) {
            return key;
        }
    }
}

const matchRegexWithColor = (title, description) => {
    const colors = {
        "Rosu": /ros(u|ie)?|red[^a-zA-Z]/gmi,
        "Roz": /roz[^a-zA-Z]/gmi,
        "Negru": /nea?gr(a|u)?|black?/gmi,
        "Alb": /alb|white/gmi,
        "Auriu": /aur(iu)?|gold/gmi,
        "Verde": /verde?|gree?n/gmi,
        "Albastru": /blue|bluemarin|albastr(a|u)?/gmi,
        "Portocaliu": /oran(j|g)?e?|portocal/gmi,
        "Galben": "/galben|yel?low?/gmi",
        "Violet": "/mov|violet|purple?/gmi",
        "Indigo": "/indigo/gmi",
        "Argintiu": "/argint|silver/gmi",
    }

    for (const key in colors) {
        if (title.match(colors[key]) || description.match(colors[key])) {
            return key;
        }
    }
}

const matchRegexWithState = (title, description) => {
    const state = {
        "Noua": /nou|noutat(e|i)?/gmi,
        "Buna": /buna?/gmi,
        "Uzata": /uzata?|ruginit/gmi,
    }

    for (const key in state) {
        if (title.match(state[key]) || description.match(state[key])) {
            return key;
        }
    }
}

const matchRegexWithType = (title, description) => {
    const fuel = {
        "GPL": "/gaz|gpl/gmi",
        "Benzina": "/benzina?/gmi",
        "Motorina": "/motorin|die?z(e|a)l|die?sel/gmi"
    }

    for (const key in fuel) {
        if (title.match(fuel[key]) || description.match(fuel[key])) {
            return key;
        }
    }
}

const matchRegexWithYear = (title, description) => {
    if (title.match(/(19|20)\d{2}[^0-9]?/gmi) === null && description.match(/(19|20)\d{2}[^0-9]?/gmi) === null) {
        return null;
    }
    return (title.match(/(19|20)\d{2}[^0-9]?/gmi) || description.match(/(19|20)\d{2}[^0-9]?/gmi))[0].slice(0, 4)
}

const matchRegexWithProductType = (title, description) => {
    const products = {
        "Jante": /jant(a|e)?/gmi,
        "Roti": /roata|roti/gmi,
        "Anvelope": /anvelop(a|e)?/gmi,
        "Piese Dezmembrare": /dezmemb?r|pies(a|e)/gmi,
        "Bara": /bar(a|e)?/gmi,
        "Ventilator": /ventila/gmi,
        "Aripa": /arip(i|a)?/gmi,
        "Capace": /capace?/gmi,
        "Motor": /motor|inject/gmi,
        "Planetara": /planetar/gmi,
        "Centura": /centur/gmi,
        "Boxe": /box/gmi,
        "Cutie de viteza": /schimbator|cutie\s?(de)?\s?viteza/gmi,
        "Compresor": /(k|c)ompres?sor/gmi,
        "Mocheta": /mochet/gmi,
        "Filtru": /filtr/gmi,
        "Amortizor": /amorti(s|z)/gmi,
        "Calculator / Computer": /calculator|computer\s?(de)?\s?bord|computer/gmi,
        "Interior": /interior/gmi,
        "Scaune": /scaune?/gmi,
        "Alternator": /alternator/gmi,
        "Turbina": /turb(o|ina?)/gmi,
        "Conducta / Teava": /tub|teava|esapament|conducta|evacua|admisie/gmi,
        "Airbag": /airbag/gmi,
        "Incalzitor": /incalzi/gmi,
        "Usi": /us(i|a)/gmi,
        "Portbagaj": /portbagaj/gmi,
        "Lumini": /stop|far[^a-zA-Z]|faruri|farul|ceata/gmi,
        "Stergatoare": /sterga/gmi,
        "Parbriz": /parbriz/gmi,
        "Aparatura de bord / Senzori": /metru/gmi,
        "KIT-uri": /kit/gmi,
        "Oglinda": /oglind/gmi,
    }

    for (const key in products) {
        if (title.match(products[key]) || description.match(products[key])) {
            return key;
        }
    }
}

module.exports = {
    matchRegexWithModel,
    matchRegexWithColor,
    matchRegexWithState,
    matchRegexWithType,
    matchRegexWithYear,
    matchRegexWithProductType
}