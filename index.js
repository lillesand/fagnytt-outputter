const Airtable = require('airtable');
const moment = require('moment');
const markdown = require('./src/formatter/markdown');

const key = process.env.key;

if (key == null) {
    console.error('key må være satt i environment. Typisk kjør scriptet med \n' +
        'key=nokkel node index.js');
    return;
}

const base = new Airtable({apiKey: key}).base('appVsxAAJW4qRusNS');

const FROM_DATE = '2017-9-10';
const TO_DATE = '2018-1-1';


base('Bidrag').select({
    maxRecords: 100,
    view: "Alle registrerte bidrag",
    sort: [{field: 'Dato', direction: 'asc'}],
    filterByFormula: `AND(IS_BEFORE({Dato}, '${TO_DATE}'), IS_AFTER({Dato}, '${FROM_DATE}'))`,
}).eachPage(function page(records, fetchNextPage) {

    let alleBidrag = records.map((record) => {
        return {
            names: record.get('Involverte BEKKere'),
            title: record.get('Tittel'),
            venue: record.get('Hvor'),
            venueUrl: record.get('URL til Hvor'),
            url: record.get('URL til Tittel'),
            type: record.get('Hva'),
            date: moment(record.get('Dato')),
        }
    });

    console.log(alleBidrag.map(bidrag => `  * ${markdown.bidragRow(bidrag)}`).join('\n'));

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); }
});