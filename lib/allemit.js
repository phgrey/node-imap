(function(){
    var loggers = [],
        EventEmitter = require('events').EventEmitter;

    module.exports = function(emitter, name, cb){
        cb = cb || emitter.debug;// || console.log;
        if(!cb) return;
        name = name || emitter.constructor.name;
        emitter.emit = function log_emit(){
            var args = [].slice.apply(arguments).map(JSON.stringify);
            cb(['allemitting', name].concat(args).join(' ').replace(/\n/g, '\\n'));
            EventEmitter.prototype.emit.apply(this, arguments);
        };
        if(loggers.indexOf(cb) == -1) loggers.push(cb);
    };

    // setInterval(function(){
    //     loggers.map(function(cb){cb('still here', Date.now())});
    // }, 1000);
})();