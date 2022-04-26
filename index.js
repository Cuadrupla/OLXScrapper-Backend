const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const join = require('path').join;
const app = express();
const utilGetInformation = require('./utils/crawlerUtil').getCrawledData;
const models = join(__dirname, 'models');

dotenv.config();
let instanceVariable = !(process.env.ENABLE_CRAWLING === "true");

fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));

app.use(express.json());
app.use('/announcements', async (req, res) => {
    if (!instanceVariable) {
        return res.status(500).json({
            exception: "Data hasn't been crawled yet, try again later!",
        });
    }

    try {
        const Announcement = mongoose.model('Announcement');
        const announcements = await Announcement.find({});

        return res.status(200).json({
            data: announcements
        });
    } catch (exception) {
        console.error(exception.toString());

        return res.status(500).json({
            exception: exception.toString(),
        });
    }
});

// bootloader method
startMongoInstance();

function startExpressInstance() {
    const port = process.env.PORT || 3000;
    app.listen(port, async function () {
        console.log('[OLXScrapper]: Listening on port ' + port);

        const Announcement = mongoose.model('Announcement');
        const announcements = await Announcement.find({});

        if (!announcements.length && process.env.ENABLE_CRAWLING === "true") {
            await startCrawlingMethod();
        } else if (announcements.length !== 0 && process.env.ENABLE_CRAWLING === "true") {
            await Announcement.deleteMany({});

            await startCrawlingMethod();
        }
    });
}

async function startCrawlingMethod() {
    let finished = false, page = 25;
    const Announcement = mongoose.model('Announcement');

    while (!finished) {
        try {
            console.log("[Crawling DEBUG]: The current page of crawling is", page);
            const dataCrawled = await utilGetInformation(
                process.env.CRAWLER_OLX_ROUTE + (page++)
            )

            for (const dataAnnouncement of dataCrawled) {
                const announcement = new Announcement(dataAnnouncement);

                await announcement.save();
            }
        } catch (exception) {
            console.error(exception);
            finished = true; break;
        }
    }
    instanceVariable = true;
}

function startMongoInstance() {
    mongoose.connection
                .on('error', console.error)
                .on('disconnected', startMongoInstance)
                .on('open', startExpressInstance);

    return mongoose.connect(process.env.DB_CONNECTION, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
