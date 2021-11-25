const router = require('express').Router()
const staff = require('../business_layer/staff')

router.get('/cinfo', staff.getCustomer)
router.get('/stat/donut', staff.getDonutChartData)
router.get('/stat/bar', staff.getBarChartData)
router.get('/stat/line', staff.getLineChartData)

module.exports = router