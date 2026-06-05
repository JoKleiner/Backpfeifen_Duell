document.body.insertAdjacentHTML("afterbegin", `
  <div class="burger" onclick="toggleMenu()">☰</div>

  <div id="menu" class="menu">
    <a href="index.html">Startseite</a>
    <a href="character.html">Charaktere</a>
    <a href="#about">About</a>
  </div>
`);

function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}