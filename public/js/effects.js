function playSound(){
    var snd=document.getElementById('noise');
    canPlayMP3 = (typeof snd.canPlayType === "function" && snd.canPlayType("audio/mpeg") !== "");
    snd.src=canPlayMP3?'assets/welcome.mp3':'';
    snd.load();
    snd.play();
}

function playCommand(){
  var snd=document.getElementById('noise');
  canPlayMP3 = (typeof snd.canPlayType === "function" && snd.canPlayType("audio/mpeg") !== "");
  snd.src=canPlayMP3?'assets/command.mp3':'';
  snd.load();
  snd.play();
}
