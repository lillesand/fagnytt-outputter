const typeMappings = {
    Presentasjon: 'presenterte',
    Workshop: 'har holdt workshop om',
    Blogpost: 'har skrevet',
    Event: 'har arrangert',
    Podcast: 'har deltatt på podcasten',
    Annet: 'har vært med på [TODO]',
};

function bidragRow(details) {
    return `**${details.names}** ${typeMappings[details.type]} [${details.title}](${details.url}) på [${details.venue}](${details.venueUrl})`;
}


module.exports = {
    bidragRow
};