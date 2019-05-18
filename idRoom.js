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
var currentStep;

var idRoomBtn = document.getElementById('idRoom');
var idRoomMsg = document.getElementById('roomId');
var idRoomTxt = document.getElementById('roomIdTxt');
var idRoomBtnToServer = document.getElementById('roomIdBtn');
var idRoomBtn = document.getElementById('idRoom');

var receiveвMsg = document.getElementById('messageId');
var messageTxt = document.getElementById('messageIdTxt');
var messageBtn = document.getElementById('messageIdBtn');
var allMessage = '';

var fields;
var currentStepTxt = document.getElementById('message');
var currentStepBtn = document.getElementsByClassName('color');


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
		fields = dataUpDateField.data;
		console.log('server data dataUpdateField', dataUpDateField);
		console.log('field_0', fields[0]);
		console.log('field_1', fields[1]);
		console.log('field_2', fields[2]);
		console.log('field_3', fields[3]);
		break;
		case 'switchCurrentPlayer': dataSwitchCurrentPlayer = data;
		console.log('server data dataSwitchCurrentPlayer', dataSwitchCurrentPlayer);
		break;
		case 'gameStart': dataGameStart = data;
			console.log('server data dataGameStart', dataGameStart);
			if (idRoomTxt.value === dataGameStart.data.id) {
				alert ('Ура! Вы подключились к комнате, можно начинать игру.')
			}
			currentRoomId = dataGameStart.data.id;
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
//currentStepBtn.addEventListener("click", doStep);

for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", doStep);
}

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
	allMessage = allMessage + dataNewMessage.data.name + ': ' + dataNewMessage.data.message + '\n';
	receiveвMsg.innerText = "Полученные сообщения: \n" + allMessage;
}

function sendMessageToRoom () {
	var currentMessageTxt = messageTxt.value;	
	//currentRoomId = dataGameStart.data.id;
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

function doStep () {
	console.log(`roomId: ${currentRoomId}`);

	var num = +this.getAttribute("btn-num");
	console.log('btnNum', num);	
	var fieldRow, fieldCell;
	switch (num) {
		case 0: fieldRow = 0; fieldCell = 0; break;
		case 1: fieldRow = 0; fieldCell = 1; break;
		case 2: fieldRow = 0; fieldCell = 2; break;
		case 3: fieldRow = 0; fieldCell = 3; break;
		case 4: fieldRow = 1; fieldCell = 0; break;
		case 5: fieldRow = 1; fieldCell = 1; break;
		case 6: fieldRow = 1; fieldCell = 2; break;
		case 7: fieldRow = 1; fieldCell = 3; break;
		case 8: fieldRow = 2; fieldCell = 0; break;
		case 9: fieldRow = 2; fieldCell = 1; break;
		case 10: fieldRow = 2; fieldCell = 2; break;
		case 11: fieldRow = 2; fieldCell = 3; break;
		case 12: fieldRow = 3; fieldCell = 0; break;
		case 13: fieldRow = 3; fieldCell = 1; break;
		case 14: fieldRow = 3; fieldCell = 2; break;
		case 15: fieldRow = 3; fieldCell = 3; break;
	}
	if(num==0){
		
	}
	console.log (`row: ${fieldRow} cell: ${fieldCell}`);
	socket.emit('action', {       
		type: 'doStep',
		data: {
			roomId: currentRoomId,
			cell: fieldCell,
			row: fieldRow,
			cb: function(data) {
				console.log(data);
			}
		}
	});
}
