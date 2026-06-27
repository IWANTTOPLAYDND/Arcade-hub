window.onload = function () {

  const lockscreen = document.getElementById("lockscreen");
  const desktop = document.getElementById("desktop");
  const clock = document.getElementById("clock");

  // 🧪 SAFETY CHECK (visible fallback)
  if (!lockscreen || !desktop) {
    alert("ERROR: Missing lockscreen or desktop in HTML");
    return;
  }

  // 🔓 UNLOCK FUNCTION (FORCED VISUAL CHANGE)
  function unlock() {
    lockscreen.style.opacity = "0";
    lockscreen.style.pointerEvents = "none";

    setTimeout(() => {
      lockscreen.style.display = "none";
      desktop.style.display = "block";
    }, 200);
  }

  // CLICK + KEY SUPPORT
  lockscreen.onclick = unlock;
  document.addEventListener("keydown", unlock);

  // 🕒 CLOCK
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

};
