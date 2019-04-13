var button = document.querySelectorAll("button");
var z = 0; //0 - cross 1 - zero
var values = [];

for (var i = 0; i < button.length; i++) {
      button[i].addEventListener("click", myFunction);
  }
 
function myFunction() {
  var num = +this.getAttribute("btn-num");
  // console.log ('btn-num = ' + num);
  if (z === 0) {
    if (values [num] === 1 || values[num] === 0) {
      return;
    } else {
      this.style.backgroundImage = "url(images/cross.png)";
      this.style.backgroundSize ="cover";
      z = 1;
      values [num] = z;  
    }
  }

  else if (z === 1) {
    if (values [num] === 1 || values[num] === 0) {
      return;
    } else {
      this.style.backgroundImage = "url(images/zero.png)";
      this.style.backgroundSize ="cover";
      z = 0;
      values [num] = z;  
    }
  }
  // console.log (values);
}