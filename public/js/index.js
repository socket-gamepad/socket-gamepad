const rAF = window.requestAnimationFrame;

var socket = io();

socket.emit('controlclientjoin', {room: room});

/* https://www.smashingmagazine.com/2015/11/gamepad-api-in-web-games/ */
window.addEventListener("gamepadconnected", function(e) {
  // Gamepad connected
  var gamepad = navigator.getGamepads()[0];
  socket.emit('gamepadjoined', {room: room, gamepad: buildGp(gamepad)});
  rAF(gameloop);
});

window.addEventListener("gamepaddisconnected", function(e) {
  // Gamepad disconnected
  socket.emit('gamepadleft', {room: room});
  console.log("Gamepad disconnected", e.gamepad);
});

const applyDeadzone = function(number, threshold){
   percentage = (Math.abs(number) - threshold) / (1 - threshold);

   if(percentage < 0)
      percentage = 0;

   return percentage * (number > 0 ? 1 : -1);
}

function buildGp(gpad) {

    var gpbuttons = [];
    
    for(var i = 0; i < gpad.buttons.length; i++) {
        gpbuttons.push({value: gpad.buttons[i].value});
    }

    var gp = {
      id: gpad.id,
      index: gpad.index,
      mapping: gpad.mapping,
      buttons: gpbuttons,
      axes: gpad.axes
  }
  return gp;
}

function gameloop() {
  const gamepad = navigator.getGamepads()[0];
  // console.log(gamepad);
  if (gamepad) {
    var gp = buildGp(gamepad);
    gp.axes[0]  = applyDeadzone(gp.axes[0], 0.25);
    gp.axes[1] = applyDeadzone(gp.axes[1], 0.25);
    socket.emit('sendgamepad', {gamepad: gp});
  }
  rAF(gameloop);
}