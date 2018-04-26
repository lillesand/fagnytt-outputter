const moment = require('moment');

moment.updateLocale('no', {
    months : [
        "januar", "februar", "mars", "april", "mai", "juni", "juli",
        "august", "september", "oktober", "november", "desember"
    ]
});

moment.locale('no');

const typeMappings = {
    Presentasjon: 'presenterte',
    Workshop: 'har holdt workshop om',
    Blogpost: 'har skrevet',
    Event: 'har arrangert',
    Podcast: 'har deltatt på podcasten',
    Annet: 'har vært med på [TODO]',
};

function bidragRow(details) {
    const title = details.url !== undefined ? `[${details.title}](${details.url}` : details.title;
    const venue = details.venueUrl !== undefined ? `[${details.venue}](${details.venueUrl})` : details.venue;
    

    return `  * ${details.date.format('D.MMMM')} – **${details.names}** ${typeMappings[details.type]} ${title} på ${venue}`;
}

function h2(text) {
    return `## ${text}\n`;
}


module.exports = {
    bidragRow, h2
};