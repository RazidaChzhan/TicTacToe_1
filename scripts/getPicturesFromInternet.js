  
var url1 = 'https://random.dog/woof.json',
url2 = 'https://api.thecatapi.com/v1/images/search';

var method = 'GET';
var isAsync = false;

var dogBtn = document.getElementById('dogBtn');
var catBtn = document.getElementById('catBtn');

var dogImg = document.getElementById('dogImg');
var catImg = document.getElementById('catImg');

document.getElementById('dogImg').src = getDog();
document.getElementById('catImg').src = getCat();


dogBtn.addEventListener("click", setDog);
catBtn.addEventListener("click", setCat);

function setDog () {
  console.log ('setDogImg');
  document.getElementById('dogImg').src = getDog();
} 

function setCat () {
  console.log ('setCatImg');
  document.getElementById('catImg').src = getCat();
} 

function getDog (){
  var request = new XMLHttpRequest();
  request.open(method, url1, isAsync);
  request.send();
  var obj = JSON.parse (request.response);
  console.log ('urlDog', obj.url);
  return obj.url;
}

function getCat (){
  var request = new XMLHttpRequest();
  request.open(method, url2, isAsync);
  request.send();
  var obj = JSON.parse (request.response);
  console.log ('urlCat', obj[0].url);
  return  obj[0].url;
}
