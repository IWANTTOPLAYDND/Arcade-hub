"use strict";

/* =========================
   🧠 SAFE START
========================= */
document.addEventListener("DOMContentLoaded", () => {

  console.log("NeonOS JS loaded");

  /* =========================
     🔒 ELEMENTS
  ========================= */
  const lockscreen = document.getElementById("lockscreen");
  const desktop = document.getElementById("desktop");
  const clock = document.getElementById("clock");

  if (!lockscreen || !desktop) {
    console.error("Missing lockscreen or desktop in HTML");
    return;
  }

  let zIndex = 10;

  /* =========================
     🔓 UNLOCK SYSTEM
  ========================= */
  function unlock() {
    lockscreen.style.display = "none";
    desktop.style.display = "block";
  }

  lockscreen.addEventListener("click", unlock);
  document.addEventListener("keydown", unlock);

  /* =========================
     🕒 CLOCK (SAFE OPTIONAL)
  ========================= */
  function updateClock() {
    if (!clock) return;

    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  /* =========================
     🪟 WINDOW SYSTEM
  ========================= */

  function bringToFront(win) {
    win.style.zIndex = zIndex++;
  }

  function makeDraggable(win) {
    const header = win.querySelector(".window-header");
    if (!header) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      bringToFront(win);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  window.closeWindow = function (el) {
    const win = el.closest(".window");
    if (win) win.remove();
  };

  /* =========================
     🪟 OPEN APP SYSTEM
  ========================= */
  window.openApp = function (name) {

    const existing = document.querySelector(`.window[data-app="${name}"]`);

    if (existing) {
      existing.style.display = "block";
      bringToFront(existing);
      return;
    }

    const win = document.createElement("div");
    win.className = "window";
    win.setAttribute("data-app", name);

    let content = "";

    if (name === "library") {
      content = `
        <div class="window-header">
          🎮 Library
          <span onclick="closeWindow(this)">✖</span>
        </div>

        <div class="game-grid">
          <div class="game" onclick="loadGame('clicker')">🖱 Clicker</div>
          <div class="game" onclick="loadGame('guess')">🎲 Guess</div>
          <div class="game" onclick="loadGame('reaction')">⚡ Reaction</div>
        </div>
      `;
    }

    else if (name === "settings") {
      content = `
        <div class="window-header">
          ⚙ Settings
          <span onclick="closeWindow(this)">✖</span>
        </div>

        <p>Settings coming soon 💜</p>
      `;
    }

    win.innerHTML = content;
    document.body.appendChild(win);

    makeDraggable(win);
    bringToFront(win);
  };

  window.toggleApp = function (name) {
    const win = document.querySelector(`.window[data-app="${name}"]`);

    if (!win) {
      openApp(name);
      return;
    }

    if (win.style.display === "none") {
      win.style.display = "block";
      bringToFront(win);
    } else {
      win.style.display = "none";
    }
  };

  /* =========================
     🎮 GAME ENGINE (SAFE)
  ========================= */
  window.loadGame = function (type) {

    const win = document.createElement("div");
    win.className = "window";

    let content = "";

    // 🖱 CLICKER
    if (type === "clicker") {

      let count = 0;

      content = `
        <div class="window-header">
          🖱 Clicker
          <span onclick="closeWindow(this)">✖</span>
        </div>

        <p id="clickVal">0</p>
        <button id="clickBtn">Click</button>
      `;

      win.innerHTML = content;
      document.body.appendChild(win);

      const val = win.querySelector("#clickVal");
      const btn = win.querySelector("#clickBtn");

      btn.addEventListener("click", () => {
        count++;
        val.textContent = count;
      });
    }

    // 🎲 GUESS
    else if (type === "guess") {

      const secret = Math.floor(Math.random() * 5) + 1;

      content = `
        <div class="window-header">
          🎲 Guess
          <span onclick="closeWindow(this)">✖</span>
        </div>

        <input id="guessInput" placeholder="1-5">
        <button id="guessBtn">Check</button>
        <p id="guessOut"></p>
      `;

      win.innerHTML = content;
      document.body.appendChild(win);

      const input = win.querySelector("#guessInput");
      const out = win.querySelector("#guessOut");

      win.querySelector("#guessBtn").addEventListener("click", () => {
        out.textContent =
          Number(input.value) === secret ? "Correct 🎉" : "Nope 💀";
      });
    }

    // ⚡ REACTION
    else if (type === "reaction") {

      let start = Date.now();

      content = `
        <div class="window-header">
          ⚡ Reaction
          <span onclick="closeWindow(this)">✖</span>
        </div>

        <p>Click fast!</p>
        <button id="reactBtn">Click</button>
        <p id="reactOut"></p>
      `;

      win.innerHTML = content;
      document.body.appendChild(win);

      const btn = win.querySelector("#reactBtn");
      const out = win.querySelector("#reactOut");

      btn.addEventListener("click", () => {
        const time = Date.now() - start;
        out.textContent = time + "ms";
        start = Date.now();
      });
    }

    document.body.appendChild(win);
    makeDraggable(win);
    bringToFront(win);
  };

});
