// TensileString
// Ali Rassolie
// (cc) 2018
// Made to generate a string that responds 
// dynamically to mouse interactions.


class TensileString{

	constructor(pos0, pos1, amount){
		console.log("constructing")
		if (pos0[0] <= pos1[0]){
			this.pos0 = pos0;
			this.pos1 = pos1;
		}else{
			this.pos0 = pos1;
			this.pos1 = pos0;
		}

	// the number of tensilestrings
		this.amount = amount;

	// this object will contain all of the 
	// tensilestrings
		this.tensilestrings  = [];
		this.tensilevertices = [];
		// this.generateStrings();
		this.generateVertices();
	}

// The method is for us to update the positions of the 
// objects, it is the driving loop.
// boo - true or false for tensilestrings or tensilevertex
	update(boo){
		if(boo == true){
			for(let i of this.tensilestrings){
				console.log("updating string");
				i.draw();
			}
			
		}else if(boo == false){
			for(let i = 1; i < this.tensilevertices.length-1; i++){
				console.log("updating vertex");
				this.tensilevertices[i].tension(this.tensilevertices[i-1]);
				this.tensilevertices[i].tension(this.tensilevertices[i+1]);
				this.tensilevertices[i].update();
				this.tensilevertices[i].draw();

			}
		}else{
			console.log("Error: see update loop in Tensile")
			return false;
		}

	}

// Generates the tensileString objects and pushes
// them the tensilestrings array. Note that the 
// tensile strings will all be interconnected. 
	generateStrings(){
		let distX = abs(this.pos0[0] - this.pos1[0]);
		let distY = abs(this.pos0[1] - this.pos1[1]);
		let vertex = [this.pos0, this.pos1];
		let newX;
		let newY;
		let newPos;
		let throwaway = this.linFunction(0, true);

		for (let i = 0; i < amount; i++) {
			newX = vertex[0][0] + (distX/this.amount);
			newY = this.linFunction(newX, false);
			
		// For some reason, if we try to log vertex,
		// it will produce some rl weird result. 
			vertex[1] = [newX,newY];

			this.tensilestrings.push(new tensileString(2, vertex, this.m, this.b));
			
			vertex[0] = [newX,newY];;
		}
		
	}

	generateVertices(){
		let distX = abs(this.pos0[0] - this.pos1[0]);
		let distY = abs(this.pos0[1] - this.pos1[1]);
		let vertex = [this.pos0, this.pos1];
		let newX;
		let newY;
		let newPos;
		let throwaway = this.linFunction(0, true);

		for (let i = 0; i < amount; i++) {
			newX = vertex[0][0] + (distX/this.amount);
			newY = this.linFunction(newX, false);
			
		// For some reason, if we try to log vertex,
		// it will produce some rl weird result. 
			vertex[1] = [newX,newY];

			this.tensilevertices.push(new tensileVertex(vertex[1]));
			
			vertex[0] = [newX,newY];;
		}

	}

// A linear function that determines the length of a 
// string. It will be based upon the original input
// of mouseX and mouseY. 
// x   - is a key that contains the x value that we would
// 		 like to run the function on. 
// boo - is a key that will contain a boolean value
// 		 used in order to determine whether a new linear function
// 		 will need to be generated or not. 

	linFunction(x, boo){
		if(boo == true){
		// calculating the deltas. pos contain the 
		// necessary coordinates. 
			let deltaX = this.pos0[0] - this.pos1[0];
			let deltaY = this.pos0[1] - this.pos1[1];
		// calculating the slope and the intersection
			this.m = deltaY/deltaX;
			this.b = this.pos0[1] - (this.m*this.pos0[0]);
		// calculating the y value based upon the 
		// x value in question, for this instance.
			let y = x*this.m + this.b;
			
			return y;
		}else if(boo == false){
			let y = this.m*x + this.b;
			
			return y; 
		}else{
			console.log("Error: linFunction error")
			return false;
		}
	}


// The dependence method will change the coordinates of the 
// tensilestrings based upon the previous tensilestring's coordiats, not
// affecting the last coordiantes that are fixed to the 
// original input.
	dependence(){
		// say that the values of each tensilestring is 
		// equal to the previous value. 
		for (let i = 1; i < this.tensilestrings.length-1; i++){
			this.tensilestrings[i].v1 = this.tensilestrings[i-1].v0;
			// this.tensilestrings[i].v1 = this.tensilestrings[i-1].v1;
		}
	}

// Will update the tensilestring's in accordance to the 
// position of the mouse. 
// boo - true or false for string or vertex
	keyUpdatePosition(boo){
		if (boo == true) {

			console.log("keyUpdatePosition")
			let x = mouseX;
			let y = mouseY;
		// the string to be changed. 
			let whichString = Math.round(this.tensilestrings.length/2);
			this.tensilestrings[whichString].v0 = [mouseX,mouseY];
			this.dependence();
		}else if(boo == false){
			console.log("keyUpdatePosition")
			let x = mouseX;
			let y = mouseY;
		// the string to be changed. 
			let whichVertex = Math.round(this.tensilevertices.length/2);
			this.tensilevertices[whichVertex].pos.x = x;
			this.tensilevertices[whichVertex].pos.y = y;
			// this.dependence();
		}else{
			console.log("Error: keyUpdatePosition got incorr boolean input");
			return false;
		}
	}

// The method will be simulating the tnesion that needs to be 
// transmitted to each string, when one of the strings changes 
// length.
// firstString  - is the first tensileString object
// secondString - is the second tensileString object
	tension(firstString,secondString){
		firstEucLength  = eucLength(firstString);
		secondEucLength = eucLength(secondString);

	}
// Calculates the Euclidean length of a tensileString object
// and returns the value.
// string - the tensileString object on question. 
	eucLength(string){
		let eucLength = Math.sqrt((string.v0[0] - string.v1[0])**2 + (string.v0[1]-string.v1[1])**2);
		return eucLength;
	}
}


