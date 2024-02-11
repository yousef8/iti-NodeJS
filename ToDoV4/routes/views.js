const router = require('express').Router();
const viewCtrler = require('../controllers/views');

router.get('/', viewCtrler.getHomePage);

module.exports = router;
