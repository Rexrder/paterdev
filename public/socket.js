const socket = io();

socket.on('clientsconnected',function(data) {
  document.getElementById("footerText").innerHTML = data.description;
});

socket.on('askReqConfirm',function() {
  $('#reqConfModal').modal('show');
});

document.getElementById("confReqButton").onclick = function(){
  socket.emit('reqConfirmed', true);
}

document.getElementById("unconfReqButton").onclick = function(){
  socket.emit('reqConfirmed', false);
}
