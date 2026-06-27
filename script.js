window.onload = function () {

  const lockscreen = document.getElementById("lockscreen");
  const desktop = document.getElementById("desktop");
  const clock = document.getElementById("clock");

  let z = 10;
  const openWindows = {};

  // 🔓 UNLOCK
  function unlock() {
    lockscreen.style.display = "none";
    desktop.style.display = "block";
  }

  lockscreen.onclick = unlock;
  document.addEventListener("keydown", unlock);

  // 🕒 CLOCK
  function updateClock() {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  // 🪟 OPEN APP
  window.openApp = function (name) {

    if (openWindows[name]) {
      bringToFront(openWindows[name]);
      return;
    }

    const win = document.createElement("div");
    win.className = "window";
    win.style.zIndex = z++;

    let content = "";

    if (name === "library") {
      content = `
        <div class="window-header">
          🎮 Library
          <span onclick="this.parentElement.parentElement.remove(); closeWindow('library')">✖</span>
        </div>
        <p>Game Library (coming soon)</p>
      `;
    }

    else if (name === "settings") {
      content = `
        <div class="window-header">
          ⚙ Settings
          <span onclick="this.parentElement.parentElement.remove(); closeWindow('settings')">✖</span>
        </div>
        <p>Settings Panel (coming soon)</p>
      `;
    }

    win.innerHTML = content;
    document.body.appendChild(win);

    makeDraggable(win);
    openWindows[name] = win;
    bringToFront(win);
  };

  // 🔁 TOGGLE
  window.toggleApp = function (name) {
    const win = openWindows[name];

    if (!win) return openApp(name);

    win.style.display =
      win.style.display === "none" ? "block" : "none";
  };

  // 🧠 WINDOW SYSTEM
  function bringToFront(win) {
    win.style.zIndex = z++;
  }

  function closeWindow(name) {
    delete openWindows[name];
  }

  // 🖱 DRAGGING
  function makeDraggable(win) {
    let isDown = false;
    let offsetX, offsetY;

    const header = win.querySelector(".window-header");

    header.addEventListener("mousedown", (e) => {
      isDown = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      bringToFront(win);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      isDown = false;
    });
  }

};
