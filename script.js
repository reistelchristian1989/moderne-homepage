// --- 1. SCREEN-WECHSEL & HINTERGRUND-STEUERUNG ---
function changeScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    if (screenId === 'tv-screen' || screenId === 'player-screen') {
        document.body.classList.add('tv-mode');
    } else {
        document.body.classList.remove('tv-mode');
    }
}

// --- 2. USER & NAMEN-SPEICHERUNG ---
function saveName() {
    const inputField = document.getElementById('name-input');
    if (!inputField) return;
    const userName = inputField.value;

    if (userName.trim() !== "") {
        localStorage.setItem('radioUser', userName);
        displayWelcomeMessage(userName);
        inputField.value = "";
    }
}

function displayWelcomeMessage(name) {
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.innerText = `Schön, dass du da bist, ${name}!`;
    }
}

function checkSavedName() {
    const savedName = localStorage.getItem('radioUser');
    if (savedName) {
        displayWelcomeMessage(savedName);
    }
}

// --- 3. AUDIO PLAYER LOGIK ---
let audioPlayer = new Audio();

function selectStation(stationName, streamUrl) {
    stopTvStream();
    audioPlayer.pause();

    // Android Fallback: Versuche Original-URL direkt, wenn HTTPS fehlschlägt
    audioPlayer.src = streamUrl;
    audioPlayer.volume = 1.0;

    audioPlayer.play().catch(error => {
        console.log("Play Error, retry with SSL replace:", error);
        let fallbackUrl = streamUrl.replace("http://", "https://");
        audioPlayer.src = fallbackUrl;
        audioPlayer.play().catch(err => console.log("Final Audio Error:", err));
    });
}

// --- 4. INTRO VIDEO LOGIK ---
document.addEventListener("DOMContentLoaded", () => {
    checkSavedName();

    const videoOverlay = document.getElementById("video-overlay");
    const introVideo = document.getElementById("intro-video");
    const skipBtn = document.getElementById("skip-btn");
    const unmuteBtn = document.getElementById("unmute-btn");

    // Skip-Button SOFORT sichern, falls Video auf Android gar nicht erst lädt
    if (skipBtn) {
        skipBtn.classList.remove("hidden");
    }

    if (introVideo) {
        introVideo.muted = true;
        introVideo.play().catch(e => {
            console.log("Autoplay blockiert oder Datei fehlt:", e);
            // Wenn Video fehlschlägt, Overlay automatisch einklappen
            if (videoOverlay) videoOverlay.style.display = "none";
        });
    }

    if (unmuteBtn && introVideo) {
        unmuteBtn.addEventListener("click", () => {
            introVideo.muted = false;
            introVideo.volume = 1.0;
            unmuteBtn.style.display = "none";
        });
    }

    if (skipBtn) {
        skipBtn.addEventListener("click", () => {
            if (introVideo) introVideo.pause();
            if (videoOverlay) videoOverlay.style.display = "none";
        });
    }
});

// --- 5. TV-STREAM LOGIK ---
let hlsPlayer = null;

function playTvStream(stationName, streamUrl) {
    const tvPlayer = document.getElementById("tv-player");
    const tvTitle = document.getElementById("tv-title");

    if (audioPlayer) audioPlayer.pause();
    if (tvTitle) tvTitle.innerText = stationName;

    if (hlsPlayer) {
        hlsPlayer.destroy();
        hlsPlayer = null;
    }

    changeScreen('player-screen');

    if (tvPlayer) {
        if (typeof Hls !== "undefined" && Hls.isSupported()) {
            hlsPlayer = new Hls();
            hlsPlayer.loadSource(streamUrl);
            hlsPlayer.attachMedia(tvPlayer);
            hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => tvPlayer.play());
        } else if (tvPlayer.canPlayType('application/vnd.apple.mpegurl')) {
            tvPlayer.src = streamUrl;
            tvPlayer.play();
        }
    }
}

function stopTvStream() {
    const tvPlayer = document.getElementById("tv-player");
    if (hlsPlayer) {
        hlsPlayer.destroy();
        hlsPlayer = null;
    }
    if (tvPlayer) {
        tvPlayer.pause();
        tvPlayer.src = "";
    }
}