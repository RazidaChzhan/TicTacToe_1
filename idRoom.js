// Model
var roomId,
	dataRoomInit,
	dataGameInfo, 
	dataUpDateField, 
	dataSwitchCurrentPlayer, 
	dataGameStart,
	socket = io('ws://localhost:3001');

var idRoomBtn = document.getElementById('idRoom');
var idRoomMsg = document.getElementById('message');
var idRoomTxt = document.getElementById('roomIdTxt');
var idRoomBtnToServer = document.getElementById('roomIdBtn');
var idRoomBtn = document.getElementById('idRoom');

var receiveвMsg = document.getElementById('messageId');
var messageTxt = document.getElementById('messageIdTxt');
var messageBtn = document.getElementById('messageIdBtn');


//Controller

if (socket != null){
	console.log(`Server Socket: ${socket}`);
} else {
	alert ('Подключитесь к серверу!');
}
	// Подписка на сервисы сервера
socket.on ('action', (data) => { 
		switch(data.type){
		case 'roomInit': dataRoomInit = data;
		console.log('server data dataRoomInit', dataRoomInit);
		break;
		case 'gameInfo': dataGameInfo = data;
		console.log('server data dataGameInfo', dataGameInfo);
		break;
		case 'updateField': dataUpDateField = data;
		console.log('server data dataUpdateField', dataUpDateField);
		break;
		case 'switchCurrentPlayer': dataSwitchCurrentPlayer = data;
		console.log('server data dataSwitchCurrentPlayer', dataSwitchCurrentPlayer);
		break;
		case 'gameStart': dataGameStart = data;
		console.log('server data dataGameStart', dataGameStart);
		break;
	}	
});

	// Listeners
idRoomBtn.addEventListener("click", getRoomId);
idRoomBtnToServer.addEventListener("click", connectToRoom);
messageBtn.addEventListener("click", messageToRoom);


// Functions
function getRoomId () {
	roomId = dataRoomInit.data.id;
	idRoomMsg.innerText = "Ваш номер комнаты: " + roomId;
}

function connectToRoom () {
	var room = idRoomTxt.value;
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

function messageToRoom () {
	//var message = messageTxt.value;
	roomId = dataRoomInit.data.id;
	console.log('Send message');
	console.log('Send.message.roomid', roomId);
	socket.emit('action', {       
		type: 'message',
		data: {
			roomId: roomId,
			message: 'Tic-Tac-Toe',
			cb: function(data) {
				console.log(data);
			}
		}
	});
}
