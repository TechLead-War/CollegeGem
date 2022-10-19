/*
  1 - Leadership
  2 - Web Devs
  3 - Content Collectors
  4 - content Writters
  5 - Designers
*/
var pCount = 4;
var run = 0;
function people(x){
  var arr = document.getElementsByClassName("people");
  for(var i = 1; i <= pCount; i++){
    console.log(run++);
    if(x.includes(i) === true){
      arr[i-1].style.display = "block";
    }
    else{
      arr[i-1].style.display = "none";
    }
  }
}
