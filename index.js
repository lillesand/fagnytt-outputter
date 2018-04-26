const Airtable = require('airtable');
const moment = require('moment');
const markdown = require('./src/formatter/markdown');
const BidragGrouper = require('./src/formatter/bidrag-grouper');

const key = process.env.key;

if (key == null) {
    console.error('key må være satt i environment. API-key finner du på https://airtable.com/account. Kjør scriptet med \n' +
        'key=nokkel node index.js');
    return;
}

const base = new Airtable({apiKey: key}).base('appVsxAAJW4qRusNS');

const FROM_DATE = '2018-1-1';
const TO_DATE = '2018-4-22';
const PAGE_SIZE = 100;

let bidragGrouper = new BidragGrouper();

base('Bidrag').select({
    maxRecords: PAGE_SIZE,
    view: "Alle registrerte bidrag",
    sort: [{field: 'Dato', direction: 'asc'}],
    filterByFormula: `AND(IS_BEFORE({Dato}, '${TO_DATE}'), IS_AFTER({Dato}, '${FROM_DATE}'))`,
}).eachPage(function page(records, fetchNextPage) {

    let bidragInPage = records.map((record) => {
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

    bidragInPage.forEach(bidrag => bidragGrouper.add(bidrag));
    if (bidragInPage.length < PAGE_SIZE) {
        bidragGrouper.print();
    }
    
    fetchNextPage();
}, function done(err) {
    if (err) { console.error(err); }
});
