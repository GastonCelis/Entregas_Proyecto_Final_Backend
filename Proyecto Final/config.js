const config = {
    host: process.env.DBHOST,
    options: {
        useNewUrlParser: process.env.DBOPTIONSUSENEW,
        useUnifiedTopology: process.env.DBOPTIONSUSEUNI,
        serverSelectionTimeoutMS: process.env.DBOPTIONSSERVER
    }
}

module.exports = config