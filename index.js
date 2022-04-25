const express = require('express');
const app = express();

// load the helper functions
const utilGetInformation = require('./utils/crawlerUtil').getCrawledData;

app.use(express.json());
app.use('/crawler/:page?', async (req, res) => {
    try {
        const dataCrawled = await utilGetInformation(
            `https://www.olx.ro/d/piese-auto/?page=${req.params.page ?? 1}`
        )

        return res.status(200).json({
            data: dataCrawled
        })
    } catch (exception) {
        console.error(exception.toString());

        return res.status(500).json({
            exception: exception.toString(),
        })
    }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('[OLXScrapper]: Listening on port ' + port);
});
