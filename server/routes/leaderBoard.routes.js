const Router = require('express');
const router = new Router();
const leaderBoardController = require('../controllers/leaderBoardController');

router.get('/leaderBoard', leaderBoardController.getAllLeaders);
router.post('/leaderBoard', leaderBoardController.createLeader);

module.exports = router;
