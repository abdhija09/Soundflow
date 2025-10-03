// utils/databaseutils.js
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://abdhijanigam2609_db_user:1126@soundflow.6o7ajtz.mongodb.net/";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("soundflow"); // ✅ your DB name
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

function getDB() {
  if (!db) {
    throw new Error("⚠️ Database not connected. Call connectDB() first.");
  }
  return db;
}

module.exports = { connectDB, getDB };
