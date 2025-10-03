// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const axios = require("axios");

const { connectDB, getDB } = require('./utils/databaseutils'); // ✅ import the fixed utils

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/public', express.static('public'));

// Set EJS as template engine
app.set('view engine', 'ejs');

const API_KEY = "AIzaSyCrjtZ51PDF8_stjST4qnr5hJ5qfWQqBkQ";

// Home route - Trending Music
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "IN",      // Change to your country code
        videoCategoryId: "10", // 10 = Music
        maxResults: 6,
        key: API_KEY
      }
    });

    const trendingSongs = response.data.items;

    // Example of using DB:
    const db = getDB();
    const collection = db.collection("favorites");
    const favs = await collection.find().toArray();

    res.render("home", { trendingSongs, r: false, favorites: favs ,
      title: "Soundflow - Home"
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("home", { trendingSongs: [], r: false });
  }
});

// Search route
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 9,
        q: query,
        key: API_KEY,
        type: "video"
      }
    });

    const searchResults = response.data.items;
    res.json({ items: searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
});
// Favorites routes
app.post("/favorites", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("favorites");

    const song = req.body;

    // Prevent duplicates
    await collection.updateOne(
      { "id.videoId": song.id?.videoId || song.id }, 
      { $set: song }, 
      { upsert: true }
    );

    res.status(201).json({ message: "Added to favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

app.delete("/favorites/:id", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("favorites");

    await collection.deleteOne({ "id.videoId": req.params.id });

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

// Get all favorites
app.get("/favorites", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("favorites");
    const favorites = await collection.find().toArray();

    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// About page
app.get("/about", (req, res) => {
  res.render("about",{
    title: "About"
  });
});

// ✅ Connect DB first, then start server
const port = 4000;
(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Could not start server:", err);
  }
})();
