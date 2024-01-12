import { sequelize } from '../src/model.js'

await sequelize.sync({force: true})
await sequelize.close()