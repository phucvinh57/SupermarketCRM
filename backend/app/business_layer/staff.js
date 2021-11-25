const db = require('../data_layer')
const serverError = { msg: 'INTERNAL SERVER ERROR' }

const getCustomer = async function (req, res) {
    const query = req.query.query;
    console.log(query)
    try {
        const customer = await db.Staff.dbQuery(`
            SELECT * FROM CUSTOMER WHERE ssn = ? OR phone = ? or email = ?
        `, [query, query, query])
        res.status(200).send(customer)
    }
    catch (err) {
        res.status(500).send(serverError)
    }
}

const getDonutChartData = async function (req, res) {
    const cssn = req.query.cssn
    console.log(cssn)
    try {
        const donut = await db.Staff.dbQuery(`
            SELECT COUNT(*) as \`buyTimes\`, PRODUCT.categoryName
            FROM TRANSACTS JOIN PRODUCT ON TRANSACTS.productID = PRODUCT.ID
            WHERE purchaseID IN (
                SELECT ID FROM PURCHASE
                WHERE PURCHASE.cssn = ?
            ) 
            GROUP BY PRODUCT.categoryName
            ORDER BY \`buyTimes\` DESC
            LIMIT 5;
        `, [cssn])
        res.status(200).send(donut)
    }
    catch (err) {
        res.status(500).send(serverError)
    }
}

const getBarChartData = async function (req, res) {
    const cssn = req.query.cssn
    const startDate = req.query.start
    const endDate = req.query.end
    const mode = req.query.mode;

    let queryString
    if (mode === 'week') {
        queryString = `
            SELECT
                SUM(totalScore) as \`score\`,
                CONCAT(YEAR(\`time\`), '/', WEEK(\`time\`)) as \`week\`
            FROM PURCHASE
            WHERE \`time\` > ? AND \`time\` < ?
            AND PURCHASE.cssn = ?
            GROUP BY \`week\`;
        `
    } else if (mode === 'month') {
        queryString = `
            SELECT
                SUM(totalScore) as \`score\`,
                CONCAT(YEAR(\`time\`), '/', MONTH(\`time\`)) as \`month\`
            FROM PURCHASE
            WHERE \`time\` > ? AND \`time\` < ?
            AND PURCHASE.cssn = ?
            GROUP BY \`month\`;
        `
    } else if (mode === 'quarter') {
        queryString = `
            SELECT
                SUM(totalScore) as \`score\`,
                CONCAT(YEAR(\`time\`), '/', MONTH(\`time\`) DIV 3 + 1) as \`quarter\`
            FROM PURCHASE
            WHERE \`time\` > ? AND \`time\` < ?
            AND PURCHASE.cssn = ?
            GROUP BY \`quarter\`;
        `
    } else {
        res.status(404).send({ msg: 'invalid mode' })
        return
    }
    try {
        const bar = await db.Staff.dbQuery(
            queryString, 
            [startDate + ' 00:00:00', endDate + ' 23:59:59', cssn]
        )
        res.status(200).send(bar)
    }
    catch (err) {
        res.status(500).send(serverError)
    }
}

const getLineChartData = async function (req, res) {
    const cssn = req.query.cssn
    const startDate = req.query.start
    const endDate = req.query.end
    const mode = req.query.mode;

    let queryString
    if (mode === 'week') {
        queryString = `
            SELECT
                COUNT(*) as 'buyTimes',
                CONCAT(YEAR(\`time\`), '/', WEEK(\`time\`)) as \`week\`
            FROM PURCHASE
            WHERE \`time\` > ? AND \`time\` < ?
            AND PURCHASE.cssn = ?
            GROUP BY \`week\`;
        `
    } else if (mode === 'month') {
        queryString = `
            SELECT
                COUNT(*) as 'buyTimes',
                CONCAT(YEAR(\`time\`), '/', MONTH(\`time\`)) as \`month\`
            FROM PURCHASE
            WHERE \`time\` > ? AND \`time\` < ?
            AND PURCHASE.cssn = ?
            GROUP BY \`month\`;
        `
    } else if (mode === 'quarter') {
        queryString = `
            SELECT
                COUNT(*) as 'buyTimes',
                CONCAT(YEAR(\`time\`), '/', MONTH(\`time\`) DIV 3 + 1) as \`quarter\`
            FROM PURCHASE JOIN CUSTOMER ON PURCHASE.cssn = CUSTOMER.ssn
            WHERE \`time\` > ? AND \`time\` < ?
            AND PURCHASE.cssn = ?
            GROUP BY \`quarter\`;
        `
    } else {
        res.status(404).send({ msg: 'invalid mode' })
        return
    }

    try {
        const line = await db.Staff.dbQuery(queryString, [startDate + ' 00:00:00', endDate + ' 23:59:59', cssn])
        res.status(200).send(line)
    }
    catch (err) {
        res.status(500).send(serverError)
    }
}

module.exports = {
    getCustomer,
    getDonutChartData,
    getBarChartData,
    getLineChartData
}