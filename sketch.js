var cells = [];
var initialCount = 10;

function setup() {
	createCanvas(800, 800);
	for (var i = 0; i < initialCount; i++) {
		cells.push(new Cell());
	}
}

function draw() {
	background(35);
	for (var i = 0; i < cells.length; i++) {
		cells[i].move();
		cells[i].show();
	}
}

function Cell(pos, r) {
	if (pos) {
		this.pos = pos.copy();
	} else {
		this.pos = createVector(random(0, width), random(0, height));
	}

	this.r = r || random(150, 200);
	this.clr = color(random(100, 200), 0, random(150, 200), random(150, 200));

	this.move = function () {
		var vel = p5.Vector.random2D();
		this.pos.add(vel.normalize().mult(200 / r));
	};

	this.onClick = function () {
		var d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
		if (d < this.r) {
			return true;
		}
		return false;
	};

	this.divide = function () {
		return new Cell(this.pos, this.r / 2);
	};

	this.show = function () {
		noStroke();
		fill(this.clr);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	};
}

function mousePressed() {
	for (var i = cells.length - 1; i >= 0; i--) {
		if (cells[i].onClick()) {
			cells.push(cells[i].divide());
			cells.push(cells[i].divide());
			cells.splice(i, 1);
			return;
		}
	}
}
