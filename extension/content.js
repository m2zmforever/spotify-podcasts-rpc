let socket;
let lastPayload = "";

const SERVER_URL = "ws://localhost:5005";
const RECONNECT_DELAY = 3000;
const POLL_INTERVAL = 2000;

function connect() {
    socket = new WebSocket(SERVER_URL);

    socket.onopen = () => {
        console.log("Connected to RPC server");
        sendData();
    };

    socket.onclose = () => {
        console.log("Server disconnected. Retrying...");
        setTimeout(connect, RECONNECT_DELAY);
    };

    socket.onerror = () => socket.close();
}

function getText(selector) {
    return document.querySelector(selector)?.textContent?.trim() || null;
}

function getPodcastData() {
    const url = document.querySelector("[data-testid='context-item-link']")?.href;
    if (!url || !url.includes("/episode/")) {
        return null;
    }

    const playButton = document.querySelector("[data-testid='control-button-playpause']");
    const playLabel = playButton?.getAttribute("aria-label") || "";

    return {
        type: "podcast",
        episode: getText("[data-testid='context-item-info-title']"),
        show: getText("[data-testid='context-item-info-show']"),
        image: document.querySelector("[data-testid='cover-art-image']")?.src || null,
        url,
        progress: getText("[data-testid='playback-position']"),
        duration: getText("[data-testid='playback-duration']"),
        playing: playLabel.includes("Duraklat") || playLabel.includes("Pause")
    };
}

function sendData() {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    const data = getPodcastData();
    if (!data) {
        socket.send(JSON.stringify({ type: "clear" }));
        return;
    }

    const payload = JSON.stringify(data);
    if (payload === lastPayload) return;

    lastPayload = payload;
    socket.send(payload);
}

const observer = new MutationObserver(sendData);
observer.observe(document.body, { childList: true, subtree: true });

connect();
setInterval(sendData, POLL_INTERVAL);
