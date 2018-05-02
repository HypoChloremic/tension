// TensileString Sketch
// Ali Rassolie
// (cc) 2018
// Made to generate a string that responds 
// dynamically to mouse interactions.

new p5;
let height = 900;
let width  = 1000;
let vertex = [];
let throwaway = null;
let amount = 11;
let tensileS;

function setup(){
	createCanvas(width,height);
	frameRate(10);
}

function draw(){
	background(0);

	if(tensileS){
		tensileS.update(false);
	}
}

function mousePressed(){
	// We push the mousecoordinates into vertex
	// before we feed pass them for generating the 
	// tensile strings. 
	ellipse(mouseX,mouseY, 5,5)
	vertex.push([mouseX,mouseY]);

	if(vertex.length >= 2){
		tensileS = new TensileString(vertex[0], vertex[1], amount);
		vertex.shift();
	}
	// we need to return false for the 
	// mousePressed function to work 
	// correctly;
	return false;
}

function keyPressed(){
	tensileS.keyUpdatePosition(false);
}