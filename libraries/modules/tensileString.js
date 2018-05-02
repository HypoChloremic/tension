// TensileString
// Ali Rassolie
// (cc) 2018
// Made to generate a tensileString that responds 
// dynamically to mouse interactions.


class tensileString{

	constructor(elas, pos, m, b){
		this.elas = elas;
		this.m = m;
		this.b = b;

		
		// Coordinates of the string
		this.v0 = pos[0];
		this.v1 = pos[1];

	}

	// A draw function where we are to draw the tensileString
	// object onto the canvas
	draw(){
		stroke(255,204,0);
		strokeWeight(2)
		line(this.v0[0], this.v0[1], this.v1[0], this.v1[1]);
		this.normalFunction(this.v0);
	}

	// Used to visualize the tensileString
	normalFunction(pos){

		let norM = -1/this.m;
		let norB = pos[1] - (norM*pos[0])
		let x1 = pos[0] - 5;
		let x2 = pos[0] + 5;
		let y1 = norM*x1 + norB;
		let y2 = norM*x2 + norB;
		stroke(100,204,0);
		strokeWeight(2);
		line(x1,y1,x2,y2);
	}

	
}