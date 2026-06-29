"use strict";

/* =========================
   🧠 NEON OS CORE
========================= */

const NeonOS = {
  z: 10,

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.cache();
      this.lockSetup();
      this.restoreWallpaper();
      console.log("NeonOS Core loaded 💜");
    });
  },

  /* =========================
     📦 CACHE ELEMENTS
  ========================= */
  cache() {
    this.lock = document.getElementById("lockscreen");
    this.desktop = document.getElementById("desktop");
  },

  /* =========================
     🔒 LOCK SCREEN
  ========================= */
  lockSetup() {
    if (!this.lock || !this.desktop) return;

    const unlock = () => {
      this.lock.style.display = "none";
      this.desktop.style.display = "block";
    };

    this.lock.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock);
  },

  /* =========================
     🪟 WINDOW SYSTEM
  ========================= */
  createWindow(title, content) {
    const win = document.createElement("div");
    win.className = "window";
    win.style.zIndex = this.z++;

    win.innerHTML = `
      <div class="window-header">
        ${title}
        <span onclick="this.closest('.window').remove()">✖</span>
      </div>
      <div class="window-body">
        ${content}
      </div>
    `;

    document.body.appendChild(win);
    this.makeDraggable(win);

    return win;
  },

  bringToFront(win) {
    win.style.zIndex = this.z++;
  },

  makeDraggable(win) {
    const header = win.querySelector(".window-header");
    if (!header) return;

    let dragging = false;
    let ox = 0;
    let oy = 0;

    header.addEventListener("mousedown", (e) => {
      dragging = true;
      ox = e.clientX - win.offsetLeft;
      oy = e.clientY - win.offsetTop;
      this.bringToFront(win);
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      win.style.left = (e.clientX - ox) + "px";
      win.style.top = (e.clientY - oy) + "px";
    });

    document.addEventListener("mouseup", () => {
      dragging = false;
    });
  },

  /* =========================
     🎮 APPS
  ========================= */
  openLibrary() {
    this.createWindow("🎮 Library", `
      <button onclick="NeonOS.openGame('clicker')">🖱 Clicker</button>
      <button onclick="NeonOS.openGame('guess')">🎲 Guess</button>
      <button onclick="NeonOS.openGame('reaction')">⚡ Reaction</button>
    `);
  },

  openSettings() {
    this.createWindow("⚙ Settings", `
      <h3>Wallpapers</h3>

      <button onclick="NeonOS.setWallpaper('wallpapers/purple.jpg')">💜 Purple</button>
      <button onclick="NeonOS.setWallpaper('wallpapers/blue.jpg')">💙 Blue</button>
      <button onclick="NeonOS.setWallpaper('wallpapers/galaxy.jpg')">🌌 Galaxy</button>

      <h3>Effects</h3>

      <button onclick="DesktopFX.set('stars')">⭐ Stars</button>
      <button onclick="DesktopFX.set('rain')">🌧 Rain</button>
      <button onclick="DesktopFX.set('particles')">✨ Particles</button>
    `);
  },

  /* =========================
     🎮 GAME LAUNCHER
  ========================= */
  openGame(type) {

    let content = "";

    if (type === "clicker") {
      let count = 0;

      content = `
        <p id="c">${count}</p>
        <button id="btn">Click</button>
      `;

      const win = this.createWindow("🖱 Clicker", content);

      const p = win.querySelector("#c");
      const b = win.querySelector("#btn");

      b.onclick = () => {
        count++;
        p.textContent = count;
      };
    }

    if (type === "guess") {
      const secret = Math.floor(Math.random() * 5) + 1;

      const win = this.createWindow("🎲 Guess", `
        <input id="g">
        <button id="b">Check</button>
        <p id="o"></p>
      `);

      win.querySelector("#b").onclick = () => {
        const val = +win.querySelector("#g").value;
        win.querySelector("#o").textContent =
          val === secret ? "Correct 🎉" : "Nope 💀";
      };
    }

    if (type === "reaction") {

      let start = Date.now();

      const win = this.createWindow("⚡ Reaction", `
        <button id="b">Click</button>
        <p id="o"></p>
      `);

      win.querySelector("#b").onclick = () => {
        const t = Date.now() - start;
        win.querySelector("#o").textContent = t + "ms";
        start = Date.now();
      };
    }
  },

  /* =========================
     🌌 WALLPAPER
  ========================= */
  setWallpaper(path) {
    const d = document.getElementById("desktop");
    if (!d) return;

    d.style.backgroundImage = `url('${path}')`;
    localStorage.setItem("wallpaper", path);
  },

  restoreWallpaper() {
    const saved = localStorage.getItem("wallpaper");
    if (saved) this.setWallpaper(saved);
  }
};

NeonOS.init();
