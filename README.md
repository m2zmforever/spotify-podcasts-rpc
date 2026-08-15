# Spotify Podcast RPC

Spotify's own Discord integration only supports music tracks, not podcasts. This project fills that gap.

## Requirements

- [Node.js](https://nodejs.org/) 16 or newer
- Discord desktop app (running and logged in)
- A Chromium-based browser (Chrome, Edge, Brave, etc.)
- Spotify Web Player: <https://open.spotify.com>

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/m2zmforever/spotify-podcast-rpc.git
cd spotify-podcast-rpc
```

### 2. Run the server

```bash
cd server
npm install
npm start
```

### 3. Load the browser extension

1. Open your browser's extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Opera: `opera://extensions`
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `extension/` folder.
4. Open (or refresh) <https://open.spotify.com> and start playing a podcast.

Your Discord RPC should now show the podcast you're listening to.

## Configuration

### Server port

The default port is `5005`. If you change it, update **both**:

- `server/server.js` — `const PORT = 5005;`
- `extension/content.js` — `const SERVER_URL = "ws://localhost:5005";`
