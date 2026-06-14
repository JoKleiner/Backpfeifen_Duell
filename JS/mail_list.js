const emailInput = document.getElementById("email");
const msg = document.getElementById("msg");
const btn = document.getElementById("btn");
const consentCheckbox = document.getElementById("consent");

const supabaseLib = typeof supabase !== "undefined" ? supabase : window.supabase;

if (!supabaseLib) {
  msg.innerText = "❌ Supabase konnte nicht geladen werden. Bitte prüfe die CDN-Verbindung.";
  msg.style.color = "red";
  throw new Error("Supabase library is not available");
}

// NUR EINMAL!
const supabaseClient = supabaseLib.createClient(
  "https://qjvifrsnrnqrivblfibn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqdmlmcnNucm5xcml2YmxmaWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTkzNDcsImV4cCI6MjA5NjU5NTM0N30.yUSX4aMxNx1A42r7vM9t4-53P19mtB9oJI5vtO6WKok"
);

btn.addEventListener("click", async () => {
  try {
    const email = emailInput.value.trim().toLowerCase();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    if (!isValid) {
      msg.innerText = "❌ Ungültige E-Mail";
      msg.style.color = "red";
      return;
    }

    if (!consentCheckbox || !consentCheckbox.checked) {
      msg.innerText = "❌ Bitte akzeptiere die Datenschutzerklärung.";
      msg.style.color = "red";
      return;
    }

    msg.innerText = "⏳ wird gespeichert...";
    msg.style.color = "black";

    const { error } = await supabaseClient
      .from("subscribers")
      .insert([{ email, status: "pending" }]);

    if (error) {
      msg.innerText = "❌ Fehler: " + error.message;
      msg.style.color = "red";
    } else {
      msg.innerText = "✅ Erfolgreich gespeichert!";
      msg.style.color = "green";
      emailInput.value = "";
    }
  } catch (err) {
    msg.innerText = "❌ Unerwarteter Fehler: " + (err.message || err);
    msg.style.color = "red";
    console.error(err);
  }
});