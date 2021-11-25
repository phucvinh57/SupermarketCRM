const express = require('express')
const customer = require('../business_layer/customer')
const router = express.Router()

router.get('/info', customer.getPersonalInfo)
router.post('/update', customer.updatePersonalInfo)
router.post('/feedback', customer.sendFeedback)
router.get('/notifs', customer.getNotifications)
router.get('/notifs/length', customer.getNumberOfNotifs)
router.get('/favours', customer.getFavourList)
router.get('/favours/remove', customer.removeFavour)
router.get('/purchases', customer.getPurchases)
router.get('/purchases/length', customer.getNumberOfPurchases)
router.get('/purchases/:purchaseID', customer.getPurchaseDetail)

module.exports = router