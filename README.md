Here’s a polished and informative **README.md** for your Soundflow project, Abdhija! It highlights your tech stack, features, setup instructions, and future plans—all tailored to your current progress and goals.

---

## 🎧 Soundflow

**Soundflow** is a dynamic music discovery web app that lets users explore trending songs, search YouTube videos, and interact with content using a heart-based like system. Built with Node.js, EJS, and MongoDB, it emphasizes smooth user experience, persistent likes, and voice-powered search.

---

### 🚀 Features

- 🔥 **Trending Music**: Displays the most popular music videos in India using YouTube’s API.
- 🔍 **Search Functionality**: Users can search for any song or video via YouTube.
- ❤️ **Like Songs**: Toggle heart icons to like songs—likes persist across searches using MongoDB.
- 🎙️ **Voice Search**: Use your microphone to search songs by speaking.
- 🧠 **MongoDB Integration**: Stores liked songs with video ID, title, and thumbnail.
- 📱 **Responsive UI**: Clean layout optimized for desktop and mobile.

---

### 🛠️ Tech Stack

| Layer        | Tools Used                      |
|--------------|----------------------------------|
| Frontend     | HTML, CSS, JavaScript, EJS       |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB (native driver)          |
| APIs         | YouTube Data API v3              |
| Voice Input  | Web Speech API                   |

---

### 📦 Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/soundflow.git
   cd soundflow
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set your YouTube API key**  
   In `server.js`, replace the placeholder with your actual API key:
   ```js
   const API_KEY = "YOUR_YOUTUBE_API_KEY";
   ```

4. **Start the server**  
   ```bash
   node server.js
   ```

5. **Visit the app**  
   Open [http://localhost:4000](http://localhost:4000) in your browser.

---

### 🗄️ MongoDB Setup

- Uses MongoDB Atlas or local MongoDB instance.
- Connection is handled via native driver in `utils/databaseutils.js`.
- Liked songs are stored in the `likedSongs` collection.

---

### 🎤 Voice Search Notes

- Works best in **Chrome** or **Edge**.
- Requires **HTTPS** or `localhost`.
- Mic permissions must be granted.

---

### 📌 Future Enhancements

- 👤 User login and personalized likes
- 📂 “Liked Songs” playlist view
- 🌐 Multi-language voice search
- 🎨 UI animations and transitions

---

### 🙌 Credits

Created by Abdhija Nigam  
Powered by Node.js,Express.js, MongoDB, and YouTube Data API

---
