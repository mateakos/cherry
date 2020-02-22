var mongoose = require('mongoose');

var meetingSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: hourFromNow
    }
});

var hourFromNow = function(){
    var now = Date.now();
    now.setHours(1);
}

var Meeting = module.exports = mongoose.model('meeting', meetingSchema);

module.exports.get = function(callback,limit) {
    Meeting.find(callback).limit(limit);
}