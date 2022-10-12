const app = require('./app')
const models = require('./models')
const config = require('./config')

config.nodeEnv === 'test' ? models.startTestDb() : models.startDb()

app.listen(config.port, () => console.log("Server running on port", config.port))