Meeting = require('./meetingModel');

exports.index = function(req,res) {
    Meeting.get(function(err, meetings) {
        if (err) {
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: 'success',
            message: 'Meetings retrieved successfully',
            data: meetings
        })
    })
};

exports.new = function(req, res) {
    var meeting = new Meeting();
    meeting.title = req.body.title ? req.body.title : meeting.title;
    meeting.start = req.body.start ? req.body.start : meeting.start;
    meeting.end = req.body.end ? req.body.end : meeting.end;

    meeting.save(function(err) {
        if (err){
            res.json({
                status: 'error',
                message: err,
            })
        }
        res.json({
            status: 'success',
            message: 'New meeting created',
            data: meeting
        })
    });
};

// Handle view meeting info
exports.view = function (req, res) {
    Meeting.findById(req.params.meeting_id, function (err, meeting) {
        if (err){
            res.json({
                status: 'error',
                message: err,
            })
        }
        res.json({
            status: 'success',
            message: 'Meeting details loading..',
            data: meeting
        });
    });
};
// Handle update meeting info
exports.update = function (req, res) {
    Meeting.findById(req.params.meeting_id, function (err, meeting) {
        if (err){
            res.json({
                status: 'error',
                message: err,
            })
        }

        meeting.title = req.body.title ? req.body.title : meeting.title;
        meeting.start = req.body.start ? req.body.start : meeting.start;
        meeting.end = req.body.end ? req.body.end : meeting.end;
        // save the meeting and check for errors
        meeting.save(function (err) {
            if (err){
                res.json({
                    status: 'error',
                    message: err,
                })
            }
            res.json({
                status: 'success',
                message: 'Meeting details updated',
                data: meeting
            });
        });
    });
};

// Handle delete meeting
exports.delete = function (req, res) {
    Meeting.remove({
        _id: req.params.meeting_id
    }, 
    function (err, meeting) {
        if (err){
            res.json({
                status: 'error',
                message: err,
            })
        }
        res.json({
            status: "success",
            message: 'Meeting deleted'
        });
    });
};