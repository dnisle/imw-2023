//Credits to Gulzaib from Pakistan: https://codepen.io/gulzaib/pen/PoKVmNw
var ticker;

function startTimer(secs) {
  var timeInSecs = parseInt(secs);
  ticker = setInterval(tick, 1000);
  
  function tick() {
    var mins = Math.floor(timeInSecs / 60);
    var secs = timeInSecs % 60;
    
    var pretty = ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs;
    
    document.getElementById("countdown").innerHTML = pretty;
    
    if (timeInSecs <= 0) {
      clearInterval(ticker);
    } else {
      timeInSecs--;
    }
  }
}

startTimer(10);




