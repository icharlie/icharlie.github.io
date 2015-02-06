// From Javascript Design Patterns
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/

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

    var state = {
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

    /**
     * Using the input field's namte attribute as a topic.
     * When input change event happens, it will pusblic its' topic.
     * So, all subscribers will do their jobs correspond with the input change.
     */
    for(var key in fields) {
        fields[key].change(function(e) {
            state[e.target.name] = parseFloat(e.target.value) || 0;
            inputsHandler.publish(e.target.name);
        });
    }

    var stateChangedSubscriber = function() {
        for(var key in state) {
            fields[key].val(state[key]);
        }
        updateEventLog('Input fields have been updated');
    };
    /**
     * the state changed subscribe function.
     * It is going to update the input fields' values.
     */
    inputsHandler.subscribe('stateChanged', stateChangedSubscriber);

    inputsHandler.subscribe( 'price', function() {
        cleanLog();
        updateEventLog('Home of price changed');
        state.payment = state.price * state.percentage / 100;
        updateEventLog('Updated Down Payment value');
        updateEventLog('Publishing state change event');
        inputsHandler.publish('stateChanged');
        updateEventLog('Updated input fields');
    });

    inputsHandler.subscribe( 'payment', function() {
        cleanLog();
        updateEventLog('Down Payment changed');
        state.percentage = state.payment / state.price * 100;
        updateEventLog('Updated Down Payment Percent value');
        updateEventLog('Publishing state change event');
        inputsHandler.publish('stateChanged');
        updateEventLog('Updated input fields');
    });

    inputsHandler.subscribe( 'percentage', function() {
        cleanLog();
        updateEventLog('Down Payment Percent changed');
        state.payment = state.price * state.percentage / 100;
        updateEventLog('Updated Down Payment value');
        updateEventLog('Publishing state change event');
        inputsHandler.publish('stateChanged');
        updateEventLog('Updated input fields');
    });

})();
