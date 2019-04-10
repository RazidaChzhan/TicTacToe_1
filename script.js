var button = document.querySelectorAll("button");
var z = 0; //0 - cross 1 - zero

for (var i = 0; i < button.length; i++) {
  button[i].addEventListener("click", myFunction());
}

function myFunction() {
  if (z === 0) {
    this.style.backgroundImage = "url(images/cross.png)";
    this.style.backgroundSize ="cover";
    z = 1;
  }
  if (z === 1) {
    this.style.backgroundImage = "url(images/zero.png)";
    this.style.backgroundSize ="cover";
    z = 0;
  }
}
