// tensileVertex
// Ali Rassolie
// (cc) 2018
// Made to generate a tensileVertex that responds 
// dynamically to mouse interactions. The basic
// idea is that the vertex will be influenced 
// by the vectors of neighbouring vertices, and 
// in such will change its position. 

class tensileVertex{
	constructor(pos){
		this.pos  = createVector(pos[0], pos[1]);
		this.vel  = createVector(0,0);
		this.acc  = createVector(0,0);
		this.force = createVector(0,0);
		this.mass = 5000;
	}

	draw(){
		stroke(255,255,0);
		strokeWeight(5);
		ellipse(this.pos.x, this.pos.y, 5, 5);
	}

	update(force){
		this.a = this.force.div(this.mass);
		this.vel.add(this.a);
		this.pos.add(this.vel);
	}

	tension(tenVer){
		let xPos = this.pos.x - tenVer.pos.x;
		let yPos = this.pos.y - tenVer.pos.y;
		this.tempForce = createVector(xPos,yPos);
		this.force.add(this.tempForce);
	}
}