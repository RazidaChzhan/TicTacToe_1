var idRoomBtn = document.getElementById('idRoom');
var idRoomMsg = document.getElementById('roomId');
var idRoomTxt = document.getElementById('roomIdTxt');
var idRoomBtnToServer = document.getElementById('roomIdBtn');


idRoomBtn.addEventListener("click", getRoomId);
idRoomBtnToServer.addEventListener("click", sentRoomIdToServer);

function getRoomId () {
	var roomId;
	var socket = io('ws://localhost:3001');
	console.log(socket);
	
	socket.on('action', (data) => { 
	  console.log('server data', data);
	  roomId = data.data.id;
      console.log(`id room: ${roomId}`);
      	idRoomMsg.innerText = "Ваш номер комнаты: " + roomId;
	});
}

function sentRoomIdToServer () {
	var socket = io('ws://localhost:3001');
	var room = idRoomTxt.value;
	console.log (room);
		socket.emit('action', {       
			type: 'connectToRoom',
			data: {
				roomId: room,
				cb: function(data) {
				console.log(data);
			}
		}
	});
}
