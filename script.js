var button = document.querySelectorAll("button");
var restart = document.getElementById('restart');
var z = 0; //0 - cross 1 - zero
var values = [];
var currentPlayer = 'Полина';
var winCombinations = [
[0, 1, 2, 3],
[4, 5, 6, 7],
[8, 9, 10, 11],
[12, 13, 14, 15],
[0, 4, 8, 12],
[1, 5, 9, 13],
[2, 6, 10, 14],
[3, 7, 11, 15],
[0, 5, 10, 15],
[3, 6, 9, 12]
];
var stepCount = 0,
    isWin = false;
var dataX = [], 
    dataO = [];

for (var i = 0; i < button.length; i++) {
     
     if (!isWin) { 
      button[i].addEventListener("click", myFunction);
       }
  }

function myFunction() {
  var num = +this.getAttribute("btn-num");
  if (z === 0) {
      currentPlayer = 'Дарья';
      message.innerText = "Ваш ход, " +  currentPlayer;
    if (stepCount === 15) {
        message.innerText = "Ничья, предлагаем начать игру заново";
       
    } else {
      stepCount ++;
    }

    if (values [num] === 1 || values[num] === 0) {
        return;
    } else {
      this.style.backgroundImage = "url(images/cross.png)";
      this.style.backgroundSize ="cover";
      z = 1;
      values [num] = z;  
      dataX.push(num);

      console.log ('dataX ' + dataX);
      
      if (dataX.length > 3){
        console.log ('checkWin: ' + checkWin(dataX, num));
        if (checkWin(dataX, num)){
          isWin = true;
          message.innerText = "Ура! Полина победила!";
          
          restart.addEventListener("click", resetDefault);
        }
      }
    }
  }

  else if (z === 1) {
    currentPlayer = 'Полина';
    message.innerText = "Ваш ход,  " + currentPlayer;
    if (stepCount === 15) {
      message.innerText = "Ничья, предлагаем начать игру заново";
     } else {
      stepCount ++;
    }
    if (values [num] === 1 || values[num] === 0) {
      return;
    } else {
      this.style.backgroundImage = "url(images/zero.png)";
      this.style.backgroundSize ="cover";
      z = 0;
      values [num] = z;  
      dataO.push(num);
      // console.log ('dataO ' + dataO);
      if (dataO.length > 3){
        // console.log ('checkWin: ' + checkWin(dataO, num));
        if (checkWin(dataO, num)){
          message.innerText = "Ура! Дарья победила!";
          isWin = true;
          restart.addEventListener("click", resetDefault);          
        } 
      }
    }
  }
}

function checkWin(arr, number) {
  for (var w = 0, wLen = winCombinations.length; w < wLen; w++) {
    var someWinArr = winCombinations[w],
    count = 0;
    if (someWinArr.indexOf(number) !== -1) {
      for (var k = 0, kLen = someWinArr.length; k < kLen; k++) {
        if (arr.indexOf(someWinArr[k]) !== -1) {
          count++;
          if (count === 4) {
            return true;
          }
        }   
      }
      count = 0;
    }
  }
}

function resetDefault(){
  z = 0;
  dataX = []; 
  dataO = [];
  values = [];
  currentPlayer = 'Полина';
  isWin = false;
  alert ('Игра закончилась, предлагаем начать игру заново.')
  for (var i = 0; i < button.length; i++) {
    button[i].style.backgroundImage = "url()";
  }
  console.log ('dataX ' + dataX);
}