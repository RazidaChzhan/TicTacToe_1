// Model
var room, 
	roomId,
	dataRoomInit,
	dataGameInfo, 
	dataUpDateField, 
	dataSwitchCurrentPlayer, 
	dataGameStart,
	dataNewMessage,
	dataGameOver,
	dataRoomDestroy,
	socket = io('ws://localhost:3001');

var currentRoomId;
var player1, 
	player2, 
	currentPlayer,
	currentPlayerId,
	fields,
	name,
	scorePlayer1 = 0,
	scorePlayer2 = 0,
	roundNumber = 1;

var idRoomBtn = document.getElementById('idRoom');
var idRoomMsg = document.getElementById('roomId');
var idRoomTxt = document.getElementById('roomIdTxt');
var idRoomBtnToServer = document.getElementById('roomIdBtn');
var idRoomBtn = document.getElementById('idRoom');
var newGameBtn = document.getElementById('restart');

var receiveвMsg = document.getElementById('messageId');
var messageTxt = document.getElementById('messageIdTxt');
var messageBtn = document.getElementById('messageIdBtn');
var allMessage = '';

var button = document.getElementsByClassName('color');
var currentPlayerName = document.getElementById ("message");

var gameOverMsg = document.getElementById ("message");
var newGameBtn = document.getElementById("restart");
var roundMsg = document.getElementById('round');

var scorePlayer1Msg = document.getElementById('scorePlayer1');
var scorePlayer2Msg = document.getElementById('scorePlayer2');
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
		printRoundNumber ();
		break;
		
		case 'gameInfo': dataGameInfo = data;
		console.log('server data dataGameInfo', dataGameInfo);
		break;
		
		case 'updateField': dataUpDateField = data;
			console.log('server data dataUpdateField', dataUpDateField);
			fields = dataUpDateField.data;
			updateGameField (fields);
		break;
				
		case 'switchCurrentPlayer': dataSwitchCurrentPlayer = data;
			console.log('server data dataSwitchCurrentPlayer', dataSwitchCurrentPlayer);
			currentPlayerId = dataSwitchCurrentPlayer.data.currentPlayer;
			switchCurrentPlayer(currentPlayerId);
		break;


		case 'gameStart': dataGameStart = data;
			console.log('server data dataGameStart', dataGameStart);
			
			player1 = dataGameStart.data.client;
			player2 = dataGameStart.data.host;

			// console.log ('Player1:', player1);
			// console.log ('Player2:', player2);
			
			printPlayersName (player1, player2); // вывод имен игроков на экране
			
			if (idRoomTxt.value === dataGameStart.data.id) {
				alert ('Ура! Вы подключились к комнате, можно начинать игру.')
			}
			currentRoomId = dataGameStart.data.id;
		break;

		
		case 'newMessage': dataNewMessage = data;
		console.log ('server data dataNewMessage', dataNewMessage);
		printMessage();
		break;

		case 'gameOver': dataGameOver = data;
		console.log ('server data dataGameOver', dataGameOver);
		
		currentGameOver();

		break;
		
		case 'roomDestroy': dataRoomDestroy = data;
		console.log ('server data dataRoomDestroy', dataRoomDestroy);
		break;
		}	
});

	// Listeners
idRoomBtn.addEventListener("click", getRoomId);
idRoomBtnToServer.addEventListener("click", connectToRoom);
messageBtn.addEventListener("click", sendMessageToRoom);
newGameBtn.addEventListener("click", startNewGame);

for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", doStep);
}

// Functions
function getRoomId () {
	roomId = dataRoomInit.data.id;
	idRoomMsg.innerText = "Ваш номер комнаты: " + roomId;
}

function connectToRoom () {
	room = idRoomTxt.value;
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
	var num = +this.getAttribute("btn-num"),
		fieldRow, 
		fieldCell;

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

function updateGameField (gameField) {
	var cellValue;
	console.log ('gameFields: ', gameField);
	for (var row = 0; row < gameField.length; row++){
		for(var cell = 0; cell < gameField[row].length; cell++){
			cellValue = gameField[row][cell].val;

			if (cellValue === 'x'){
				var btnId = getBtnIdByRowAndCell(row, cell);
				// console.log (`row: ${row} cell: ${cell} btnId: ${btnId} val: ${cellValue}`);
				
				// TODO set picture X
				var btn = document.getElementById(btnId);
				// console.log ('btn', btn);
				btn.style.backgroundImage = "url(images/cross.png)";
      			btn.style.backgroundSize ="cover";
			 }

			if (cellValue === 'o') {
				var btnId = getBtnIdByRowAndCell(row, cell);
				// console.log (`row: ${row} cell: ${cell} btnId: ${btnId} val: ${cellValue}`);
				
				// TODO set picture O
				var btn = document.getElementById(btnId);
				btn.style.backgroundImage = "url(images/zero.png)";
      			btn.style.backgroundSize ="cover";
			}

			if(cellValue === "_"){
				var btnId = getBtnIdByRowAndCell(row, cell);
				// console.log (`row: ${row} cell: ${cell} btnId: ${btnId} val: ${cellValue}`);
				
				// TODO set picture O
				var btn = document.getElementById(btnId);
				btn.style.backgroundImage = "url()";
			}
	
		}
	}
}

function getBtnIdByRowAndCell(row, cell) {
	switch (true) {
		case row === 0 && cell === 0: return 0;
		case row === 0 && cell === 1: return 1;
		case row === 0 && cell === 2: return 2;
		case row === 0 && cell === 3: return 3;
		case row === 1 && cell === 0: return 4;
		case row === 1 && cell === 1: return 5;
		case row === 1 && cell === 2: return 6;
		case row === 1 && cell === 3: return 7;
		case row === 2 && cell === 0: return 8;
		case row === 2 && cell === 1: return 9;
		case row === 2 && cell === 2: return 10;
		case row === 2 && cell === 3: return 11;
		case row === 3 && cell === 0: return 12;
		case row === 3 && cell === 1: return 13;
		case row === 3 && cell === 2: return 14;
		case row === 3 && cell === 3: return 15;
	}
}

function printPlayersName (player1, player2) {
	var player1Name = document.getElementById("Player1");
	var player2Name = document.getElementById('Player2');
	
	player1Name.innerText = player1.name;
	player2Name.innerText = player2.name;

	if(player1.marker === 'x'){
		currentPlayer = player1;
	} else {
		currentPlayer = player2;
	}
	currentPlayerName.innerText = "Ваш ход, " + currentPlayer.name;
}

function switchCurrentPlayer (currentPlayerId) {
		
	if(typeof player1 !== 'undefined' && typeof player2 !== 'undefined') {
		
		if (currentPlayerId != null && currentPlayerId === player1.id) {
			name = player1.name;
		} else {
			name = player2.name;
		}	
		
		currentPlayerName.innerText = "Ваш ход, " + name;
	}
}





function startNewGame(){
	newGame();
	updateGameField(fields);
}

function newGame () {
	
	socket.emit('action', {       
		type: 'newGame',
		data: {
			roomId: currentRoomId,
			cb: function(data) {
				console.log(data);
			}
		}	
	});
}

function currentGameOver(){
	// 1. Печатаем, что игра закончилась
	printGameOver ();

	// 2. Посчет очков
	countScore();

	// 3. Печатаем счёт очков
	printScore ();

	// 4. Печатаем номер уровня
	printRoundNumber ();
}


function printGameOver() {
	console.log ('gameOver', dataGameOver.data);
	gameOverMsg.innerText = "Игра закончилась, предлагаем начать игру заново. Победил игрок: " + name;
}

function countScore(){
	console.log('Player 1: ', player1);
	console.log('Player 2: ', player2);

	if(player1.id === dataGameOver.data.winnerId){
		scorePlayer1++;
	}

	if(player2.id === dataGameOver.data.winnerId){
		scorePlayer2++;
	}

	roundNumber++;
}


function printScore () {
	console.log('scorePlayer1:', scorePlayer1);
	console.log('scorePlayer2:', scorePlayer2);
	scorePlayer1Msg.innerText = scorePlayer1;
	scorePlayer2Msg.innerText = scorePlayer2;

}
function printRoundNumber () {
roundMsg.innerText = "Уровень " + roundNumber;

}