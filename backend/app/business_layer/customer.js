const db = require('../data_layer')
const serverError = { msg: 'INTERNAL SERVER ERROR' }

const getPersonalInfo = async function (req, res) {
    const cssn = req.cookies['ssn'];
    console.log(cssn)
    try {
        const info = await db.Customer.dbQuery(
            'SELECT * FROM CUSTOMER WHERE SSN = ?',
            [cssn]
        );
        res.status(200).send(info)
    } catch (err) {
        res.status(500).send(serverError)
    }
}

const updatePersonalInfo = async function (req, res) {
    const cssn = req.cookies['ssn'];
    const info = req.body;
    console.log(info)
    try {
        await db.Customer.dbQuery(`
            UPDATE CUSTOMER
            SET fName = ?,
                lName = ?,
                phone = ?,
                email = ?,
                birthday = ?,
                favorite = ?,
                imageUrl = ?
            WHERE SSN = ?
        `, [info.fname, info.lname, info.phone, info.email, info.birthday,
        info.favorite, info.imageUrl, cssn])

        res.status(200).send({ msg: 'Updated successfully !' })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: 'Update Failed' })
    }
}

const sendFeedback = async function (req, res) {
    const cssn = req.cookies['ssn'];
    const feedback = req.body;
    console.log(feedback);
    const currTime = new Date();
    const dateTimeStr = `${currTime.getFullYear()}-${currTime.getMonth()}-${currTime.getDate()} ${currTime.toLocaleString('en-GB').substr(12)}`
    try {
        await db.Customer.dbQuery(
            `INSERT INTO FEEDBACK VALUES (?, ?, ?, ?, ?)`
            , [cssn, dateTimeStr, feedback.stars, feedback.title, feedback.content])
        res.send({ message: 'Chúng tôi đã tiếp nhận phản hồi của bạn !' })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Lỗi hệ thống' })
    }
}

const getNotifications = async function (req, res) {
    const ssn = req.cookies['ssn']
    const numPerPage = req.query.num
    const offset = req.query.offset
    console.log(numPerPage)
    try {
        const notifList = await db.Customer.dbQuery(
            'CALL GET_NOTIFICATION_LIST(?, ?, ?)'
            , [ssn, offset, numPerPage]
        )
        res.status(200).send(notifList)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(serverError)
    }
}

const getNumberOfNotifs = async function (req, res) {
    const ssn = req.cookies['ssn']
    try {
        const notifListLength = await db.Customer.dbQuery(
            `SELECT COUNT(*) AS \`length\` FROM NOTICES 
            JOIN RECEIVES ON (NOTICES.ass_ssn = RECEIVES.ass_ssn AND NOTICES.\`time\` = RECEIVES.\`time\`)
            WHERE RECEIVES.cssn = ?`
            , [ssn]
        )
        res.status(200).send(notifListLength)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(serverError)
    }
}

const getFavourList = async function (req, res) {
    const ssn = req.cookies['ssn']
    try {
        const faList = await db.Customer.dbQuery(
            `
                SELECT
                    VOUCHER_COUPON.\`code\` as \`code\`,
                    VOUCHER_COUPON.\`type\` as \`type\`,
                    FAVOUR.\`name\` as \`name\`,
                    FAVOUR.content as content,
                    FAVOUR.startDate as startDate,
                    FAVOUR.endDate as endDate, 
                    FAVOUR.discount as discount
                FROM VOUCHER_COUPON JOIN FAVOUR ON VOUCHER_COUPON.favourID = FAVOUR.ID
                WHERE VOUCHER_COUPON.code IN (
                    SELECT OWNS.vcode FROM OWNS
                    WHERE OWNS.cssn = ?
                ) AND VOUCHER_COUPON.isUsed = 'n'
                AND FAVOUR.\`status\` = 'applying';
            `, [ssn]
        )
        res.status(200).send(faList)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(serverError)
    }
}

const removeFavour = async function(req, res) {
    const ssn = req.cookies['ssn'];
    const code = req.query.code
    console.log(code)
    try {
        const result = await db.Customer.dbQuery(`
            DELETE FROM OWNS WHERE vcode = ? AND cssn = ?;
        `, [parseInt(code), parseInt(ssn)])
        res.status(200).send(result)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(serverError)
    }
}

const getPurchases = async function(req, res) {
    const ssn = req.cookies['ssn']
    const numPerPage = req.query.num
    const offset = req.query.offset
    try {
        const pList = await db.Customer.dbQuery(
            'CALL GET_PURCHASE_LIST(?, ?, ?)'
            , [ssn, offset, numPerPage]
        )
        res.status(200).send(pList)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(serverError)
    }
}

const getNumberOfPurchases = async function(req, res) {
    const ssn = req.cookies['ssn']
    try {
        const pLength = await db.Customer.dbQuery(
            `SELECT COUNT(*) AS \`length\` FROM PURCHASE 
            WHERE cssn = ?`
            , [ssn]
        )
        res.status(200).send(pLength)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(serverError)
    }
}

const getPurchaseDetail = async function(req, res) {
    const ssn = req.cookies['ssn']
    const purchaseID = req.params.purchaseID
    try {
        const details = await db.Customer.dbQuery(`
            SELECT
                TRANSACTS.productID as productID,
                PRODUCT.\`name\` as productName,
                PRODUCT.origin as origin,
                PRODUCT.mdate as mDate,
                PRODUCT.edate as eDate,
                TRANSACTS.price as price,
                TRANSACTS.score as score,
                TRANSACTS.numberOfProducts as numberOfProducts,
                TRANSACTS.discount as discount
            FROM TRANSACTS
                JOIN PURCHASE ON PURCHASE.ID = TRANSACTS.purchaseID
                JOIN PRODUCT ON PRODUCT.ID = TRANSACTS.productID
            WHERE PURCHASE.cssn = ? AND PURCHASE.ID = ?;
        `, [ssn, purchaseID])
        res.status(200).send(details)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(serverError)
    }
}

module.exports = {
    getPersonalInfo,
    updatePersonalInfo,
    sendFeedback,
    getNotifications,
    getNumberOfNotifs,
    getFavourList,
    removeFavour,
    getNumberOfPurchases,
    getPurchases,
    getPurchaseDetail
}
