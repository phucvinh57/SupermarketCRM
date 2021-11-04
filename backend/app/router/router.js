var express = require('express');
var tutorialCtrler = require('../controller/tutorial.controller');
var router = express.Router();

router.get('/tutorials/:id', tutorialCtrler.findOne);
router.get('/tutorials', tutorialCtrler.findAll);
router.post('/tutorials', tutorialCtrler.create);
router.put('/tutorials/:id', tutorialCtrler.update);
router.delete('/tutorials/:id', tutorialCtrler.remove);
router.delete('/tutorials', tutorialCtrler.removeAll);
router.get('/tutorials/published', tutorialCtrler.findAllPublished);
router.get('/', function(req, res) {
    res.json({message: 'Test API'})
})

module.exports = router;