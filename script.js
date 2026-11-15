// CONFIGURATION : remplacez ces valeurs par les informations officielles de la radio.
const RADIO_STREAM_URL = ""; // Exemple : https://serveur-radio.example/live
const RADIO_EMAIL = "";      // Exemple : contact@votreradio.cd

const audio = document.getElementById("radioAudio");
const playButton = document.getElementById("playButton");
const playerStatus = document.getElementById("playerStatus");
const playerMessage = document.getElementById("playerMessage");
const equalizer = document.querySelector(".equalizer");

document.getElementById("year").textContent = new Date().getFullYear();

playButton.addEventListener("click", async () => {
  if (!RADIO_STREAM_URL) {
    playerStatus.textContent = "Flux audio à configurer";
    playerMessage.textContent = "Ajoutez l'adresse du flux radio dans le fichier script.js pour activer l'écoute en direct.";
    return;
  }
  if (audio.paused) {
    audio.src = RADIO_STREAM_URL;
    try {
      await audio.play();
      playButton.textContent = "Ⅱ";
      playButton.setAttribute("aria-label", "Mettre en pause");
      playerStatus.textContent = "Vous écoutez TELE-SOURCE DE VIE";
      playerMessage.textContent = "Direct radio";
      equalizer.classList.add("playing");
    } catch (error) {
      playerStatus.textContent = "Connexion impossible";
      playerMessage.textContent = "Vérifiez l'adresse du flux audio ou réessayez plus tard.";
    }
  } else {
    audio.pause();
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Lire le direct");
    playerStatus.textContent = "Lecture en pause";
    playerMessage.textContent = "Appuyez sur lecture pour reprendre.";
    equalizer.classList.remove("playing");
  }
});

audio.addEventListener("ended", () => {
  playButton.textContent = "▶";
  equalizer.classList.remove("playing");
});
audio.addEventListener("error", () => {
  playerStatus.textContent = "Flux indisponible";
  playerMessage.textContent = "Le serveur radio ne répond pas. Réessayez ultérieurement.";
  playButton.textContent = "▶";
  equalizer.classList.remove("playing");
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.textContent = opened ? "✕" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const note = document.getElementById("formNote");
  if (!RADIO_EMAIL) {
    note.textContent = "Configurez d'abord RADIO_EMAIL dans script.js avec l'adresse officielle de la radio.";
    return;
  }
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent("Message depuis le site TELE-SOURCE DE VIE/GOMA");
  const body = encodeURIComponent(`Nom : ${data.get("name")}\nE-mail : ${data.get("email")}\n\nMessage :\n${data.get("message")}`);
  window.location.href = `mailto:${RADIO_EMAIL}?subject=${subject}&body=${body}`;
});
