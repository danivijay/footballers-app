import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../config'
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

db.sequelize = sequelize
db.Sequelize = sequelize

export default db
