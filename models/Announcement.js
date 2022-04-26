const mongoose = require("mongoose");

const AnnouncementSchema = mongoose.Schema({
    titlu: { type: String, default: 'Nespecificat', trim: true },
    descriere: { type: String, default: 'Nespecificat', trim: true },
    pret: { type: String, default: 'Nespecificat', trim: true },
    locatie: { type: String, default: 'Nespecificat', trim: true },
    data_postare: { type: String, default: 'Nespecificat', trim: true },
    marca: { type: String, default: 'Nespecificat', trim: true },
    an: { type: String, default: 'Nespecificat', trim: true },
    stare: { type: String, default: 'Nespecificat', trim: true },
    culoare: { type: String, default: 'Nespecificat', trim: true },
    tip: { type: String, default: 'Nespecificat', trim: true },
    tipCarburant: { type: String, default: 'Nespecificat', trim: true },
    img: { type: String, default: 'Nespecificat', trim: true },
    createdAt: { type: Date, default: Date.now }
})

mongoose.model('Announcement', AnnouncementSchema)