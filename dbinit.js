const mongoose = require('mongoose')

const connectDB = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI);
	console.log(`mongoDB connected to: ${conn.connection.db.databaseName}`);
}

module.exports = connectDB;