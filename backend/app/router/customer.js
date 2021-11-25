const express = require('express')
const customer = require('../business_layer/customer')
const router = express.Router()

router.get('/info', customer.getPersonalInfo)
router.post('/update', customer.updatePersonalInfo)
router.post('/feedback', customer.sendFeedback)

module.exports = router