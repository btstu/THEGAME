
var clickMe = document.getElementById("targeT")
var clickMe2 = document.getElementById("targeT2")
var startGame = document.getElementById("cmiyc")
var box = document.getElementById("box")
var go = false;
var winnersDate = document.getElementById("highscore")
var winnersDate2 = document.getElementById("highscore2") 
var winnersDate3 = document.getElementById("highscore3")  
var dateBox = document.getElementById("date1");
var dateBox2 = document.getElementById("date2");
var dateBox3 = document.getElementById("date3");        
var winners = [
  {
    Name : "LUC",
    score : 458,
    date: "03/04/19"
  }, 
  {
    Name : "hh",
    score : 459,
    date: "26/11/12"
  },
  {
    Name : "oko",
    score : 165,
    date: "02/18/09"
    
  }]
tri();
var D = new Date
var theDay = D.getDate();
var theMonth = D.getMonth()+1;
var theYear = D.getFullYear();
var dateText = theDay + "/" + theMonth + "/" + theYear ;

const playerOBJ = {
  
  timer : null,
  sec: {val: 60, DOM: document.getElementById("sec")},
  level : {val: 0 , DOM : document.getElementById("lvl")},
  toNext: {val: 10 , DOM : document.getElementById("toNext")},
  score : {val: 0, DOM: document.getElementById("score")},
  missed : {val: 0, DOM: document.getElementById("missed")},
  Name : {val: "player1"},
  date : {val: dateText}

}
const timerfunction = {
  start: function(){
    playerOBJ.timer = setInterval(function(){
      if(playerOBJ.sec.val == 1){
        btn();
        clearInterval(playerOBJ.timer)
        alert("Times Up!");
        stopNow();
       };
      playerOBJ.sec.val --;
      playerOBJ.sec.DOM.innerHTML =  playerOBJ.sec.val; 
    }, 1000)
  },
  
  stop: function(){
clearInterval(playerOBJ.timer)
},
  reset: function(){
    playerOBJ.sec.val = 60;
    playerOBJ.sec.DOM.innerHTML = "60";
    playerOBJ.toNext.val = 0;
    playerOBJ.toNext.DOM.innerHTML = "10";
    playerOBJ.score.val = 10;
    playerOBJ.score.DOM.innerHTML = "0";
    playerOBJ.level.val = 0;
    playerOBJ.level.DOM.innerHTML = "0";
    playerOBJ.missed.val = 0;
    playerOBJ.missed.DOM.innerHTML = "0";  
  }
};

var winnersByscore = [ {Name: winners[0].Name, score: winners[0].score, date: winners[0].date},
{Name: winners[1].Name, score: winners[1].score, date: winners[1].date},
                       {Name: winners[2].Name, score: winners[2].score, date: winners[2].date}];


var winnersJSON = localStorage.getItem("allwinners") 
if (winnersJSON!= null){
 
  winners = JSON.parse(winnersJSON)
  winnersByscore = winners
}
startGame.addEventListener("click", start);
startGame.addEventListener("mouseover", hover);
startGame.addEventListener("mouseleave", leave);
box.addEventListener("click", minus );
clickMe.addEventListener("click", points,{capture :true});
clickMe2.addEventListener("click", points,{capture :true});
winnersDate.addEventListener("mouseover", theDate );
winnersDate.addEventListener("mouseleave", theDateoff );
winnersDate2.addEventListener("mouseover", theDate );
winnersDate2.addEventListener("mouseleave", theDateoff );
winnersDate3.addEventListener("mouseover", theDate );
winnersDate3.addEventListener("mouseleave", theDateoff );
document.getElementById("highscore").innerHTML ="<h5><strong>" + winnersByscore[0].Name +"</strong></h5>" + " : " + winnersByscore[0].score  ;
document.getElementById("highscore2").innerHTML ="<h5><strong>" + winnersByscore[1].Name +"</strong></h5>" + " : " + winnersByscore[1].score ;
document.getElementById("highscore3").innerHTML ="<h5><strong>" + winnersByscore[2].Name +"</strong></h5>" + " : " + winnersByscore[2].score ;


function JsonSett() { 
  console.log("jsonparse")
  var winnersJSON = JSON.stringify(winners);
  localStorage.setItem("allwinners", winnersJSON);
}

function pushwinner() {

  for (let i = 1; i< winners.length; i++){
    const w = winners[i]; 
   if (playerOBJ.score.val > w.score ){  
      winnersByscore.splice(i, 0, {Name: playerOBJ.Name.val, score: playerOBJ.score.val, date: playerOBJ.date.val});
      break
    }
    else {
      winnersByscore.push({Name: playerOBJ.Name.val, score: playerOBJ.score.val, date: playerOBJ.date.val});
      break
    }
  }

  
    winners = winnersByscore ;
    
}

function tri(){
  console.log("tri")
if (winners.length >= 1){ 
    winners.sort(sortByScore);
    }

  
  function sortByScore(a, b) {
    
    if(a.score > b.score){
      return -1;
    }
    if (a.score < b.score){
      return 1;
    }
    return 0;
  }
} 


function theDate(){  

this.nextElementSibling.style.display = "block" ;
this.nextElementSibling.style.animation = "openn 1s forwards ease-out ";

dateBox.innerHTML ="<p>"+ winners[0].date +"<p>";
dateBox2.innerHTML ="<p>"+ winners[1].date +"<p>";
dateBox3.innerHTML ="<p>"+ winners[2].date +"<p>";
}

function theDateoff() {

  setTimeout(()=> {
    this.nextElementSibling.style.animation = "close 1s forwards ease-out ";
    
}, 1500);
setTimeout(()=> {
  this.nextElementSibling.style.display = "none";
  
}, 3000);
 

}
function shake() {
  setTimeout(()=>{
    document.getElementById("container").style.animation = "shake 0s normal forwards"
    box.style.animation = "fade 0s forwards linear" ;
  }, 1000)
  document.getElementById("container").style.animation = "shake .2s normal forwards"
  box.style.animation = "fade .6s forwards linear" ;

  
}
function pulse() {
  
  console.log('pulse')
  var e = document.createElement("div");
  e.setAttribute('class', 'circle')
  box.appendChild(e)
  e.style.top = event.pageY - 100 + "px",
  e.style.left = event.pageX - 130 + "px"
  setTimeout(function(){
    document.getElementById("box").removeChild(e)
  }, 1000);

  
}

function initbar(){
  var barLeft = document.getElementById("barLeft");
  var countBar = document.getElementById("countBar");
  startBar = setInterval(barCount, 160);  
  function barCount(){
if(go){
    if (barLeft.clientWidth < countBar.clientWidth){
      barLeft.style.width = barLeft.clientWidth + 1 + "px";
   
    }
    else{ 
    barLeft.style.width = countBar.clientWidth + "px";
    clearInterval(startBar);
  }
  
}
else {
  barLeft.style.width = "0px"
  clearInterval(startBar);
}

}
}
function btn(){
  if (go){
  startGame.style.boxShadow = " -3px -3px 7px rgb(255, 255, 255), 3px 3px 5px rgb(33, 33, 39, .288) ";
  startGame.style.backgroundColor = "rgb(188, 193, 224)";
  
  }
  else{
  startGame.style.boxShadow = "inset 3px 3px 10px rgb(33, 33, 39, .288)";
  startGame.style.backgroundColor = "#60d18f";
}}
function cursor(){
  box.style.cursor = "crosshair";
}
function start(){
  if (go){

    timerfunction.stop();
    btn(); 
    targeT.style.animation = "spin 0s infinite linear";
    clickMe.removeEventListener("mouseover", fly)
    clickMe2.removeEventListener("mouseover", fly)
    box.removeEventListener("click", minus)
    spin();
    stopNow();

    
  }
  else{ 
    let myAudio2 = document.getElementById("myAudio2");
    myAudio2.play();
    timerfunction.reset();
    timerfunction.start();
    btn();
    box.addEventListener("mouseover", cursor);
    go = true;
    clickMe.addEventListener("mouseover", fly)
    clickMe2.addEventListener("mouseover", fly)
    box.addEventListener("click", minus)
    spin()
    initbar(); 
        
  }
 
 
}
function spin(){
  if (go){
    targeT.style.animation = "spin 4s infinite linear";
  }
  else{
    targeT.style.animation = "spin 0s infinite linear";
   
}}
function fly(){
  setTimeout(()=>{
    this.style.top = Math.trunc(Math.random() * 500) + "px";
    this.style.left = Math.trunc(Math.random() * 900) + "px";
 

  }, 600 );
   this.style.animation = "spin 4s infinite linear";
   
} 
function points(e){//e is for the bubbling effect(stop the propagation aka capturing)
  if (go){
   
    playerOBJ.score.val += 100;
    playerOBJ.score.DOM.innerHTML = playerOBJ.score.val;
    playerOBJ.toNext.val --;
    playerOBJ.toNext.DOM.innerHTML =  playerOBJ.toNext.val;
    clickMe.style.animation = "pop .3s linear forwards";
      
    pulse();
   let myAudio = document.getElementById("myAudio");
    myAudio.play();
    
    setTimeout(()=>{
      clickMe.style.animation = "spin 4s infinite linear";
      box.style.backgroundColor= "black" ;
    }, 500 );  
    box.style.backgroundColor= "#dde1e7" ;
    if (playerOBJ.toNext.val <= 0){
      shake();
      barLeft.style.width = barLeft.clientWidth - 50 + "px";
      playerOBJ.level.val += 1;
     
      playerOBJ.sec.val += 20;
      playerOBJ.sec.DOM.innerHTML =playerOBJ.sec.val;
      playerOBJ.level.DOM.innerHTML = playerOBJ.level.val;
      playerOBJ.toNext.val = 10;
      playerOBJ.toNext.DOM.innerHTML =  playerOBJ.toNext.val;
      document.getElementByID("level").style.backgroundColor = "red";
      let myAudio3 = document.getElementById("myAudio3");
    myAudio3.play();
    }
    
   if (playerOBJ.level.val >= 2 ){
    clickMe2.style.display = "block";
    clickMe2.style.filter = "hue-rotate(20deg)"
    clickMe2.style.animation = "spin 4s infinite linear";
    if (playerOBJ.level.val == 6 ){
      stopNow()
   }
  } 
}
  e.stopPropagation()
}

function minus(){
  if (go){
    document.getElementById("box").style.backgroundColor = "#dde1e7" ;
playerOBJ.score.val --;
playerOBJ.missed.val ++;
playerOBJ.score.DOM.innerHTML = playerOBJ.score.val;
playerOBJ.missed.DOM.innerHTML = playerOBJ.missed.val;

}
}

function stopNow(){ 
  
     
timerfunction.stop()
      clickMe2.style.display = "none";
      clickMe.style.animation = "colorss 1s infinite linear";
         
      clickMe2.style.animation = "spin 0s infinite linear";
      // newwinner = {Name : playerOBJ.Name.val, score : playerOBJ.score.val, date : playerOBJ.date.val };
      // winners.push(newwinner);
      
      nameStopGame = prompt("Your score is " + playerOBJ.score.val +", please enter your Name :");
      playerOBJ.Name.val = nameStopGame;
      clickMe.removeEventListener("mouseover", fly)
      // playerOBJ.Name.DOM.innerHTML = winners.length; 
     
      playerOBJ.date.val = dateText.toString()
      initbar()
      go = false;
      
      pushwinner();
     
      tri();
      JsonSett() 
      document.getElementById("highscore").innerHTML ="<h5><strong>" +  winners[0].Name + "</strong></h5> : " + winners[0].score;
      document.getElementById("highscore2").innerHTML ="<h5><strong>" +  winners[1].Name + "</strong></h5> : "+ winners[1].score ;
      document.getElementById("highscore3").innerHTML ="<h5><strong>" +  winners[2].Name + "</strong></h5> : " + winners[2].score  ;
}
    
function hover(){
 if(go){
  startGame.style.backgroundColor = "#a5f3c5";

}
  else{
  startGame.style.backgroundColor = "rgb(198, 193, 270)"; 

}
startGame.style.cursor= "pointer";
}
function leave(){
  if(go){
  startGame.style.backgroundColor = "#60d18f";

}
else{
  startGame.style.backgroundColor = "rgb(188, 193, 224)";
 
}
startGame.style.cursor= "cursor";
}


JsonSett();

 

                       
