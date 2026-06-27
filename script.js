const lockscreen = document.getElementById("lockscreen");
const desktop = document.getElementById("desktop");
const clock = document.getElementById("clock");

/* 🔓 UNLOCK SYSTEM */
function unlock(){
  lockscreen.style.display = "none";
  desktop.style.display = "block";
}

lockscreen.addEventListener("click", unlock);
window.addEventListener("keydown", unlock);

/* 🧭 OPEN APP (placeholder for later) */
function openApp(name){
  alert(name + " app coming next phase 👀");
}

/* 🕒 CLOCK */
function updateClock(){
  const now = new Date();
  clock.innerText = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

setInterval(updateClock, 1000);
updateClock();
