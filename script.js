function unlock(){
  lockscreen.style.opacity = "0";
  lockscreen.style.pointerEvents = "none";

  setTimeout(() => {
    lockscreen.style.display = "none";
    desktop.style.display = "flex";
  }, 200);
}

lockscreen.addEventListener("click", unlock);
window.addEventListener("keydown", unlock);
