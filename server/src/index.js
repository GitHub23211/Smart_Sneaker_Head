const app = require('./app')
const models = require('./models')
const config = require('./config')

models.startDb()

app.listen(config.port, () => console.log("Server running on port", config.port))