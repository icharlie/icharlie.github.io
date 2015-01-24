function PubSub() {
    this.topics = {};
    this.subUid = -1;
};

PubSub.prototype.publish = function( topic, args ) {

    if ( !this.topics[topic] ) {
        return false;
    }

    var subscribers = this.topics[topic],
        len = subscribers ? subscribers.length : 0;

    while (len--) {
        subscribers[len].func( topic, args );
    }

    return this;
};

// Subscribe to events of interest
// with a specific topic name and a
// callback function, to be executed
// when the topic/event is observed
PubSub.prototype.subscribe = function( topic, func ) {

    if (!this.topics[topic]) {
        this.topics[topic] = [];
    }

    var token = ( ++this.subUid ).toString();
    this.topics[topic].push({
        token: token,
        func: func
    });
    return token;
};

// Unsubscribe from a specific
// topic, based on a tokenized reference
// to the subscription
PubSub.prototype.unsubscribe = function( token ) {
    for ( var m in this.topics ) {
        if ( this.topics[m] ) {
            for ( var i = 0, j = this.topics[m].length; i < j; i++ ) {
                if ( this.topics[m][i].token === token) {
                    this.topics[m].splice( i, 1 );
                    return token;
                }
            }
        }
    }
    return this;
};

(function(){
    var fields = {};
    fields.homeOfPrice = $('#homeOfPrice');
    fields.downPayment = $('#downPayment');
    fields.downPaymentPercent = $('#downPaymentPercent');
    fields.loanTerm = $('#loanTerm');
    fields.amount = $('#amount');
    var mortgage = {
            homeOfPrice: parseFloat(fields.homeOfPrice.val()) || 0,
            downPayment: parseFloat(fields.downPayment.val()) || 0 ,
            downPaymentPercent: parseFloat(fields.downPaymentPercent.val()) || 0,
            loanTerm: parseFloat(fields.loanTerm.val()) || 0,
            amount: parseFloat(fields.amount.val()) || 0
        };

    var mortgagaHandler = new PubSub();


    for(var key in fields) {
        fields[key].change(function(e) {
            mortgage[e.target.name] = parseFloat(e.target.value) || 0;
            mortgagaHandler.publish(e.target.name);
        })
    }

    mortgagaHandler.subscribe( 'updateInputFields', function() {
        for(var key in mortgage) {
            fields[key].val(mortgage[key]);
        }
    });

    mortgagaHandler.subscribe( 'updateMortgageCalculation', function() {

    });

    mortgagaHandler.subscribe( 'homeOfPrice', function() {
        mortgage.downPayment = mortgage.homeOfPrice * mortgage.downPaymentPercent / 100;
        mortgagaHandler.publish('updateInputFields');
    });

    mortgagaHandler.subscribe( 'downPayment', function() {
        mortgage.downPaymentPercent = mortgage.downPayment / mortgage.homeOfPrice * 100;
        mortgagaHandler.publish('updateInputFields');
    });

    mortgagaHandler.subscribe( 'downPaymentPercent', function() {
        mortgage.downPayment = mortgage.homeOfPrice * mortgage.downPaymentPercent / 100;
        mortgagaHandler.publish('updateInputFields');
    });

})();
