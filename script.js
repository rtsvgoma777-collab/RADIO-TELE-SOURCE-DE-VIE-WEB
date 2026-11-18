document.addEventListener("DOMContentLoaded", function () {

    // Année automatique
 const annee = document.getElementById("year");
  if (annee) {
        annee.textContent = new Date().getFullYear();
    }

    // Lecteur radio
    const audio = document.getElementById("lecteur");
const btn = document.getElementById("btn-play");
const volume = document.getElementById("volume");
const enCours = document.getElementById("en-cours");

btn.addEventListener("click", async () => {
  if (audio.paused) {
    // recharge le flux pour être bien "en direct" (pas de retard cumulé)
    audio.src = audio.src.split("?")[0] + "?t=" + Date.now();
    try {
      await audio.play();
      btn.textContent = "⏸ Pause";
    } catch (e) {
      enCours.textContent = "Impossible de lire le flux pour le moment.";
    }
  } else {
    audio.pause();
    btn.textContent = "▶ Écouter";
  }
});

volume.addEventListener("input", () => (audio.volume = volume.value));

audio.addEventListener("error", () => {
  btn.textContent = "▶ Écouter";
  enCours.textContent = "Flux indisponible, réessayez dans un instant.";
});

// Titre en cours : interroge la route /api/now-playing de Flask
async function majTitre() {
  try {
    const r = await fetch("/api/now-playing");
    const d = await r.json();
    enCours.textContent = d.artist ? `${d.artist} – ${d.title}` : d.title;
  } catch (e) {}
}
majTitre();
setInterval(majTitre, 10000);

    // Formulaire de contact
    const formulaire = document.getElementById("contactForm");
    const statut = document.getElementById("messageStatus");

    if (!formulaire) return;

    formulaire.addEventListener("submit", function (event) {
        event.preventDefault();

        const nom = formulaire.querySelector('[name="nom"]').value.trim();
        const email = formulaire.querySelector('[name="email"]').value.trim();
        const message = formulaire.querySelector('[name="message"]').value.trim();

        const adresseEmail = ""; // Mettre ici l'adresse e-mail officielle

        if (!adresseEmail) {
            statut.textContent = "L'adresse e-mail de la radio doit être configurée.";
            return;
        }

        if (!nom || !email || !message) {
            statut.textContent = "Merci de remplir tous les champs.";
            return;
        }

        const sujet = encodeURIComponent("Message depuis le site TELE-SOURCE DE VIE");
        const contenu = encodeURIComponent(
            "Nom : " + nom + "\r\n" +
            "Email : " + email + "\r\n" +
            "Message : " + message
        );

        statut.textContent = "Ouverture de votre messagerie...";
        window.location.href =
            "mailto:" + adresseEmail + "?subject=" + sujet + "&body=" + contenu;
    document.addEventListener("DOMContentLoaded", () => {
  const logo = document.createElement("img");
  logo.src = "/static/logo.png";
  logo.alt = "Logo Radio Télé Source de Vie";
  logo.className = "logo";

  const entete = document.querySelector("header");
  entete.prepend(logo);   // ajoute le logo au début du header
});
    });
});
