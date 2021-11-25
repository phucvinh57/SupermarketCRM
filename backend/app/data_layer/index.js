const dbConfig = require('../config/db.config')
const setupUser = require('./setupUser')

const db = {}

db.Customer = setupUser(dbConfig.customer)
db.Staff = setupUser(dbConfig.staff)
db.Manager = setupUser(dbConfig.manager)

module.exports = db;
