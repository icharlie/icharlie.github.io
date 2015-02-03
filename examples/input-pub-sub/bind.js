var PubSub = function () {
    'use strict';
    this.topics = {};
    this.subUid = -1;
};

PubSub.prototype.publish = function( topic, args ) {
    'use strict';
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
    'use strict';
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
    'use strict';
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
    'use strict';
    var fields = {};
    fields.price = $('#price');
    fields.payment = $('#payment');
    fields.percentage = $('#percentage');
    var values = {
        price: parseFloat(fields.price.val()) || 0,
        payment: parseFloat(fields.payment.val()) || 0 ,
        percentage: parseFloat(fields.percentage.val()) || 0
    };

    var updateEventLog = function(content) {
        var p = '<p>' + content + '</p>';
        $('#event-log').append(p);
    };
    var cleanLog = function() {
        $('#event-log').empty();
    };

    var inputsHandler = new PubSub();


    for(var key in fields) {
        fields[key].change(function(e) {
            values[e.target.name] = parseFloat(e.target.value) || 0;
            inputsHandler.publish(e.target.name);
        });
    }

    inputsHandler.subscribe( 'stateChanged', function() {
        for(var key in values) {
            fields[key].val(values[key]);
        }
        updateEventLog('caculdate result');
    });

    inputsHandler.subscribe( 'price', function() {
        cleanLog();
        updateEventLog('Home of price changed');
        values.payment = values.price * values.percentage / 100;
        updateEventLog('Updated Down Payment value');
        updateEventLog('Publishing update input fields events');
        inputsHandler.publish('stateChanged');
        updateEventLog('Updated input fields');
    });

    inputsHandler.subscribe( 'payment', function() {
        cleanLog();
        updateEventLog('Down Payment changed');
        values.percentage = values.payment / values.price * 100;
        updateEventLog('Updated Down Payment Percent value');
        updateEventLog('Publishing update input fields events');
        inputsHandler.publish('stateChanged');
        updateEventLog('Updated input fields');
    });

    inputsHandler.subscribe( 'percentage', function() {
        cleanLog();
        updateEventLog('Down Payment Percent changed');
        values.payment = values.price * values.percentage / 100;
        updateEventLog('Updated Down Payment value');
        updateEventLog('Publishing update input fields events');
        inputsHandler.publish('stateChanged');
        updateEventLog('Updated input fields');
    });

})();
