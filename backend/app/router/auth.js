const router = require('express').Router()

router.post('/login', function(req, res) {
    const ssn = req.body.ssn
    console.log(ssn)
    res.cookie('ssn', ssn, {
        httpOnly: false
    }).status(200).send({ login: true })
})

router.get('/logout', function(req, res) {
    res.clearCookie('ssn')
    res.status(200).send({ login: false })
})

module.exports = router