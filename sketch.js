let cenX, cenY; 

let counter = 0;
let dist = 5; 
let sign = 1; 

let startButton, pauseButton, resumeButton, restartButton; 
let score = 0;
let lives = 5;
let highScore = 0;
let hsText = "";

let running = false; //controls the movement of the circles
let paused = true; //controls the movement of the circles and instructions

let circle1, circle2, circle3, circle4;

function setup() {
	createCanvas(600, 600);
	background(0, 0, 0);
	cenX = width/2; 
	cenY = height/2;
	textAlign(CENTER);
	ellipseMode(CENTER);
	
	startButton = createButton("Start");
	startButton.position((windowWidth/2)-45, 100);
	startButton.size(90, 50);
	startButton.mousePressed(start);
	
	pauseButton = createButton("Instructions");
	pauseButton.hide(); 
	pauseButton.position((windowWidth/2)-45, windowHeight-100);
	pauseButton.size(90, 50);
	pauseButton.mousePressed(pause);	
	
	resumeButton = createButton("Resume");
	resumeButton.hide(); 
	resumeButton.position((windowWidth/2)-45, windowHeight-100);
	resumeButton.size(90, 50);
	resumeButton.mousePressed(resume);
	
	restartButton = createButton("Restart");
	restartButton.hide(); 
	restartButton.position((windowWidth/2)-45, windowHeight-100);
	restartButton.size(90, 50);
	restartButton.mousePressed(restart);	
	
	circle1 = new Circle(0, 0, 200, 200, color(7, 91, 127));
	circle2 = new Circle(width, 0, 150, 150, color(11, 137, 191));
	circle3 = new Circle(width, height, 100, 100, color(13, 165, 229));
	circle4 = new Circle(0, height, 50, 50, color(14, 183, 255));
}

function draw() {
	background(0,0,0);
	
	//Only runs when the user does not push the SPACE button
	//If not, the circles freeze in their current place
	if (running) { 
		counter = counter + sign*dist; 
	}
	
	if (counter>width || counter<0) {
		sign = sign*-1; 
	}

	circle1.show();
	circle2.show();
	circle3.show();
	circle4.show();
	
	circle1.move(counter, counter);
	circle2.move(width-counter, counter);
	circle3.move(width-counter, height-counter);
	circle4.move(counter, height-counter);
	
	//Instructions
	if (paused) {
		fill(255);
		textSize(15);
		text("Press SPACE to try to line up the circles perfectly!", cenX, 20);
	}
	
	//Display points and lives
	textAlign(LEFT);
	fill(255);
	textSize(15);
	text("High Score: " + highScore, 10, 20);
	text("Score: " + score, 10, 40);
	textAlign(CENTER);
	text("Lives: " + lives, width-50, 20);
	
	if (lives <= 0) { //end the game
		results();
	}
}

//Reference: https://www.reddit.com/r/javascript/comments/5mjcdh/is_there_a_way_to_pause_frames_in_p5js/

function start() {
	running = true;	
	paused = false;
	startButton.hide();
	pauseButton.show();
}

function pause() { 
	paused = true;
	running = false;
	pauseButton.hide();
	resumeButton.show();
}

function resume() {
	paused = false;
	running = true;
	pauseButton.show();
	resumeButton.hide();
}

function results() {
	restartButton.show();
	
	counter = 0;
	dist = 5; 
	sign = 1; 
	circle1.restart();
	circle2.restart();
	circle3.restart();
	circle4.restart();
	
	running = false;
		
	fill(255);
	textSize(20);
	
	if (score > highScore) {
		highScore = score;	
		hsText = "New high score!";
	}
	
	text(hsText, cenX, cenY-30);
	text("Score: " + score, cenX, cenY);
}

function restart() {
	paused = true;
	score = 0;
	lives = 5;
	
	startButton.show();
	pauseButton.hide();
	restartButton.hide();
}

function keyPressed() {
  if (!paused && keyCode === 32) { //SPACE key
    running = !running;
		
		if (running == false) { //checking if the circles are lined up
			if (circle1.x == cenX) { 
				//only have to check one because the width and height of the canvas are equal and the circles are all moving at the same velocity
				score++;
			} else {
				lives--;	
			}
		}
  } 
}

class Circle {
	constructor(X, Y, W, H, color) {
		this.x = X;
		this.y = Y; 
		this.originalPosX = X;
		this.originalPosY = Y;
		this.w = W; 
		this.h = H;
		this.color = color;
	}
	
	show() {
		fill(this.color);
		ellipse(this.x, this.y, this.w, this.h);
	}
	
	move(moveX, moveY) {
		this.x = moveX; 
		this.y = moveY;
	}	
	
	restart() {
		this.x = this.originalPosX; 
		this.y = this.originalPosY;
	}
}
