let cenX, cenY; 
let counter = 100;
let dist = 5; 
let sign = 1; 
let running = true;
let button; 

function setup() {
	createCanvas(600, 600);
	background(0,0,0);
	cenX = width/2; 
	cenY = height/2;
	textAlign(CENTER);
	noStroke();
	
	button = createButton("Pause"); 
	button.position(20,20); 
	button.size(60,20);
	button.mousePressed(pause); 
}

function draw() {
	background(0,0,0);
	
	fill(255);
	textSize(20);
	text("Try to line up the circles perfectly!", cenX, 20);
	
	//Only runs when the user does not push the pause button
	//If not, the circles pause in their current place
	if (running) { 
		counter = counter + sign*dist; 
	}
	
	if (counter>width || counter<0) {
		sign = sign*-1; 
	}

	fill(7, 91, 127); 
	ellipse(counter, counter, 200, 200);
	fill(11, 137, 191); 
	ellipse(width-counter, counter, 150, 150);
	fill(13, 165, 229); 
	ellipse(width-counter, width-counter, 100, 100);
	fill(14, 183, 255); 
	ellipse(counter, width-counter, 50, 50);	
}

function pause() {
	running = !running;
} 

//Reference: https://www.reddit.com/r/javascript/comments/5mjcdh/is_there_a_way_to_pause_frames_in_p5js/
