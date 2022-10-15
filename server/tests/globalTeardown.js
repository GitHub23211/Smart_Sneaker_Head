const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connection.close()
    } catch(e) {console.log("tried to close connection but got error:", e.toString())}
}