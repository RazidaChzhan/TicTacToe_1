// Model
var roomId,
	dataRoomInit,
	dataGameInfo, 
	dataUpDateField, 
	dataSwitchCurrentPlayer, 
	dataGameStart,
	dataNewMessage,
	socket = io('ws://localhost:3001');

var currentRoomId;

var idRoomBtn = document.getElementById('idRoom');
var idRoomMsg = document.getElementById('roomId');
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
		case 'newMessage': dataNewMessage = data;
		console.log ('server data dataNewMessage', dataNewMessage);
		printMessage();
		break;
	}	
});

	// Listeners
idRoomBtn.addEventListener("click", getRoomId);
idRoomBtnToServer.addEventListener("click", connectToRoom);
messageBtn.addEventListener("click", sendMessageToRoom);


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

function printMessage () {
	console.log ('Message', dataNewMessage.data.message);
	receiveвMsg.innerText = "Полученные сообщения: " + dataNewMessage.data.message;
}

function sendMessageToRoom () {
	var currentMessageTxt = messageTxt.value;	
	currentRoomId = dataGameStart.data.id;
	console.log('Send.message.roomid', currentRoomId);
	console.log('Send.message.currentMessageTxt', currentMessageTxt);
	socket.emit('action', {       
		type: 'message',
		data: {
			roomId: currentRoomId,
			message: currentMessageTxt,
			cb: function(data) {
				console.log(data);
			}
		}
	});
}
