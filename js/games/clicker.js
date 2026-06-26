let clicks = Save.get("clicks", 0);

function clickerGame(){

  window.addClick = function(){
    clicks++;
    Save.set("clicks", clicks);
    document.getElementById("count").innerText = clicks;
  };

  return `
    <div class="card">
      <h2>Clicker</h2>
      <p id="count">${clicks}</p>
      <button onclick="addClick()">Click</button>
    </div>
  `;
}
