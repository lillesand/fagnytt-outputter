const Airtable = require('airtable');

const key = process.env.key;

if (key == null) {
    console.error('key må være satt i environment. Typisk kjør scriptet med \n' +
        'key=nokkel node index.js');
    return;
}

const base = new Airtable({apiKey: key}).base('appVsxAAJW4qRusNS');
const TO_DATE = '2017-11-1';
const FROM_DATE = '2017-10-1';


base('Bidrag').select({
    maxRecords: 100,
    view: "Alle registrerte bidrag",
    sort: [{field: 'Dato', direction: 'asc'}],
    filterByFormula: `AND(IS_BEFORE({Dato}, '${TO_DATE}'), IS_AFTER({Dato}, '${FROM_DATE}'))`,
}).eachPage(function page(records, fetchNextPage) {

    let bidrag = records.map((record) => {
        return {
            names: record.get('Involverte BEKKere'),
            title: record.get('Tittel'),
            date: record.get('Dato')
        }
    });

    console.log(bidrag);

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); }
});