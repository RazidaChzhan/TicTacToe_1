var button = document.querySelectorAll("button");

function myFunc() {
    this.style.backgroundImage = "url(images/cross.png)";
    this.style.backgroundSize ="cover";
}
for (var i = 0; i < button.length; i ++) {
    button[i].addEventListener("click", myFunc);    
  }
