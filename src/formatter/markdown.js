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
    let title = details.url !== undefined ? `[${details.title}](${details.url}` : details.title;
    let venue = details.venueUrl !== undefined ? `[${details.venue}](${details.venueUrl})` : details.venue;

    return `${details.date.format('D.MMMM')} – **${details.names}** ${typeMappings[details.type]} ${title} på ${venue}`;
}


module.exports = {
    bidragRow
};