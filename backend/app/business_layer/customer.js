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
        info.favourite, info.imageUrl, cssn])

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
    catch(err) {
        console.log(err)
        res.status(500).send({ message: 'Lỗi hệ thống' })
    }
}

module.exports = {
    getPersonalInfo,
    updatePersonalInfo,
    sendFeedback
}