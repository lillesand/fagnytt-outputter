const markdown = require('./markdown');

class BidragGrouper {
    
    constructor() {
        this.alleBidrag = {};
    }
    
    add(bidrag) {
        const type = bidrag['type'];
        if (!this.alleBidrag[type]) {
            this.alleBidrag[type] = [];
        }

        this.alleBidrag[type].push(bidrag);
    }

    print() {
        Object.keys(this.alleBidrag).forEach(type => {
            console.log(markdown.h2(type));
            
            this.alleBidrag[type].map(markdown.bidragRow).forEach(row => console.log(row));
            console.log('\n');
        })
    }

}

module.exports = BidragGrouper;