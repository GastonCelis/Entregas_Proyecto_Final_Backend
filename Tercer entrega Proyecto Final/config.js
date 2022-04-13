const dbHost = process.env.DBHOST
const dbOptions = process.env.DBOPTIONS

const config = {
    host: dbHost,
    options: {dbOptions}
}

module.exports = config