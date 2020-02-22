var router = require('express').Router();
var meetingController = require('./meeting/meetingController');

//Set default API response
router.get('/', function(req, res){
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Cat Rest'
    });
});

//Meeting routes
router.route('/meetings')
    .get(meetingController.index)
    .post(meetingController.new);
    
router.route('/meetings/:meeting_id')
    .get(meetingController.view)
    .patch(meetingController.update)
    .put(meetingController.update)
    .delete(meetingController.delete);

module.exports = router;
