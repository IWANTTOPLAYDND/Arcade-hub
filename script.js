window.onload = function () {

  // =========================
  // 🔒 CORE ELEMENTS
  // =========================
  const lockscreen = document.getElementById("lockscreen");
  const desktop = document.getElementById("desktop");
  const clock = document.getElementById("clock");

  // safety check (prevents silent breaking)
  if (!lockscreen || !desktop) {
    alert("ERROR: Missing lockscreen or desktop in HTML");
    return;
  }

  // =========================
  // 🔓 UNLOCK SYSTEM
  // =========================
  function unlock() {
    lockscreen.style.opacity = "0";
    lockscreen.style.pointerEvents = "none";

    setTimeout(() => {
      lockscreen.style.display = "none";
      desktop.style.display = "block";
    }, 200);
  }

  lockscreen.onclick = unlock;
  document.addEventListener("keydown", unlock);

  // =========================
  // 🕒 CLOCK
  // =========================
  function updateClock() {
    if (!clock) return;

    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  // =========================
  // 🪟 WINDOW SYSTEM
  // =========================
  let z = 20;

  window.openApp = function (name) {
    const win = document.createElement("div");
    win.className = "window";
    win.style.zIndex = z++;

    let content = "";

    if (name === "library") {
      content = `
        <div class="window-header">
          🎮 Library
          <span class="close" onclick="this.parentElement.parentElement.remove()">✖</span>
        </div>

        <p>Welcome to the game library 👀</p>
        <p>(Games will be added next phase)</p>
      `;
    }

    else if (name === "settings") {
      content = `
        <div class="window-header">
          ⚙ Settings
          <span class="close" onclick="this.parentElement.parentElement.remove()">✖</span>
        </div>

        <p>Control panel coming soon 💜</p>
      `;
    }

    else {
      content = `
        <div class="window-header">
          ❓ App
          <span class="close" onclick="this.parentElement.parentElement.remove()">✖</span>
        </div>

        <p>Unknown app: ${name}</p>
      `;
    }

    win.innerHTML = content;
    document.body.appendChild(win);

    makeDraggable(win);
  };

  // =========================
  // 🖱 DRAG SYSTEM
  // =========================
  function makeDraggable(el) {
    let isDown = false;
    let offsetX = 0;
    let offsetY = 0;

    const header = el.querySelector(".window-header");

    header.addEventListener("mousedown", (e) => {
      isDown = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;

      el.style.zIndex = z++;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      el.style.left = (e.clientX - offsetX) + "px";
      el.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      isDown = false;
    });
  }

};
