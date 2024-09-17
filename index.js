
//
//  Lets add an EVENT LISTENER to the entire browser window - capture any key pressed.
//  This will start the game once any KEYPRESS event is done. Does not apply to ARROW keys.
//

window.addEventListener( "keypress", doKeyDown, false );


//
//  This function is called when a key is pressed once you in the browser windows running this js.
//
function doKeyDown(e) {

// Uncomment the line below to debug and capture key pressed value
// alert( e.keyCode )

// Here I am evaluating if the player had started the game from a "crashed" / "game over" context.
if (crashed) {
    location.reload();
}else{
	startGame();
}

}


//
//  Here is a funtion to play audio file whilst game-play is underway
//  The function will only play a spexific music as background music
//
function playAudio() { 
  var audioFile = document.getElementById("bgSound");
  audioFile.volume = 0.05;  
  audioFile.play(); 
} 



var c = document.createElement("canvas");
var ctx = c.getContext("2d");
	c.width = 800;
    c.height = 500;
	//c.frameNo = 0;

	
var imgBg = new Image();
    imgBg.src = './Background.png';
	imgBg.onload = () => {
	ctx.drawImage(imgBg,0,0, c.width, c.height);
    document.body.appendChild(c);
    writeWelcomeText();
	}

	
function writeWelcomeText() {

var lineHeight=55;
	
   ctx.font = "bold 50px Comic Sans MS";
   ctx.fillStyle = "red";
   ctx.textAlign = "center";
   
   // First Text line on Canvas
   ctx.fillText('Welcome to Rocky-Ride!', c.width/2, c.height/6);

   ctx.font = "20px Comic Sans MS";
   ctx.fillStyle = "red";
   ctx.textAlign = "center";

   // Second Text line on Canvas
   ctx.fillText("Try to keep bike upright for as long as possible while reaching top speed!", c.width/2, c.height/6 + lineHeight );

writePressGo2Start();

}


function writeGameOver() {

var lineHeight=55;
	
ctx.font = "bold 50px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
// First Text line on Canvas
ctx.fillText('GAME OVER!', c.width/2, c.height/6);

ctx.font = "20px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
// Second Text line on Canvas
ctx.fillText("You have crashed!", c.width/2, c.height/6 + lineHeight );

writePressGo2reStart();
}


function writePressGo2Start() {

                // draw the text
				ctx.font = "bold 16px Comic Sans MS";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                // Third Text line on Canvas
                ctx.fillText("<Press Any Key to Start Game...>", c.width/2 + 100, c.height/3 + 30 );
				
	
}


function writePressGo2reStart() {
 
                // draw the text
				ctx.font = "bold 16px Comic Sans MS";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                // Third Text line on Canvas
                ctx.fillText("<Press Any Key to Re-Start Game...>", c.width/2 + 100, c.height/3 + 30 );
		
	
}
	
	
// c.width = 800;
// c.height = 500;
// document.body.appendChild(c);
// ctx.drawImage()

var perm = [];
while (perm.length < 255){
	while(perm.includes(val = Math.floor(Math.random()*255)));
	perm.push(val);
}

var lerp = (a,b,t) => a + (b-a) * (1 - Math.cos(t * Math.PI))/2; 
var noise = x=>{
	x = x * 0.01 % 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
	
}


var player = new function(){
	this.x = c.width/2;
	this.y = 0;
	this.ySpeed = 0;
	this.rot = 0;
	this.rSpeed = 0;
	
	this.img = new Image();
	this.img.src = "moto.png";
	this.draw = function(){
		var p1 = c.height - noise(t + this.x) * 0.25;
		var p2 = c.height - noise(t + 5 + this.x) * 0.25;
		
		var grounded = 0;
		if(p1-15 > this.y){
		  this.ySpeed += 0.1;
        }else{	
		  this.ySpeed -= this.y - (p1-15);
		  this.y = p1 - 15;
		  grounded = 1; 
		}
		
		
		if(!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5){
			playing = false;
			this.rSpeed = 5;
			k.ArrowUp = 1;
			this.x -= speed * 5;
		}	
		
		var angle = Math.atan2((p2 - 15) - this.y, (this.x+5) - this.x);
		this.y += this.ySpeed;
	    
		if(grounded && playing){
			this.rot -= (this.rot - angle) * 0.5;
		    this.rSpeed = this.rSpeed - (angle - this.rot);
	    }
		this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
		this.rot -= this.rSpeed * 0.1;
		if(this.rot > Math.PI) this.rot = -Math.PI;
		if(this.rot < -Math.PI) this.rot = Math.PI;
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot);
		ctx.drawImage(this.img, -28, -28, 50, 50);
		ctx.restore();
	}
}



var t = 0;
var speed = 0;
var playing = true;
var gameloop = true;
var crashed = false;
var playerScore;
var playerScoreCount = 0000000;
var myGtimerVal = 0;
var myGtimerSVal = 119;
var k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};



function loop(){
	playerScoreCount += 1;
	speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01;
	 t += 10 * speed;
	//t += 1;
	//ctx.fillStyle = "#19f";
	//ctx.fillRect(0,0,c.width, c.height);
	ctx.drawImage(imgBg,0,0,c.width, c.height);
	
	ctx.fillStyle = "brown";
	ctx.beginPath();
	ctx.moveTo(0, c.height);
	for (let i = 0; i < c.width; i++) 
	   ctx.lineTo(i, c.height - noise(t + i) * 0.25);

    ctx.lineTo(c.width, c.height);
    ctx.fill();
	
	detectCrash();
	
	player.draw();
	
	playerScore.text="SCORE: " + playerScoreCount * Math.floor(t * 0.01) + "   " + (myGtimerSVal - myGtimerVal + 1) + " sec";
    playerScore.update();
	//
	//  Stop animation loop once rider has failed
	//  Break loop
    //
    if(gameloop){
        requestAnimationFrame(loop);
    }

 
}



onkeydown = d=> k[d.key]= 1;
onkeyup = d=> k[d.key] = 0;


//
//  Detect Crash / Collision Detection is here.
//  This function determines a crash by sampling if the bike is touchig or going beyond the left edge of the canvas edge of the canvas.
//
function detectCrash() {
	if ( player.x + 28 < 1  ||  myGtimerVal > myGtimerSVal ) {
	   crashed=true;
	   gameloop=false;
	   
	   writeGameOver();
	}
}

function setGamePlayTimer() {
   
var gameTimeCheckTimer = setInterval(function(){ 
	  
myGtimerVal = myGtimerVal + 1;
	   
//alert(''+ myGtimerVal);

     if ( myGtimerVal > myGtimerSVal ) {
        clearInterval(gameTimeCheckTimer);
	 }
 }, 1000);
   

}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function() {
        // ctx = this.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

//
//  Start the game at this point from here.
//
function startGame() {
//
//  We need to give focus to the CANVAS as this affects the key-control on the CANVAS.
//  Acceleration is done with UP / DOWN arrow keys.
//  Right / Left Arrow keys are to control tumble and rotation.
//
c.focus();

setGamePlayTimer();
gameloop=true;
playAudio();
playerScore = new component("30px", "Consolas", "black", c.width/2, c.height/14, "text");
playerScore.text="SCORE: ";
playerScore.update();

loop();
}
































