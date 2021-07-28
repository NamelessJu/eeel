class Vector {
	x = 0;
	y = 0;
	
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	
	getAngle() {
		var normal = this.getNormalized();
		var dotProduct = normal.y * -1;
		var angle = Math.acos(dotProduct);
		return normal.x >= 0 ? angle : 2*Math.PI - angle;
	}
	
	getMagnitude() {
		return Math.sqrt(this.x**2 + this.y**2);
	}

	getNormalized() {
		var magnitude = this.getMagnitude();
		var factor = 1 / (magnitude != 0 ? magnitude : 1);
		return new Vector(this.x * factor, this.y * factor);
	}
	
	getRotated(angle) {
		var magnitude = this.getMagnitude();
		var currentAngle = this.getAngle() - 0.5*Math.PI;
		var x = magnitude * Math.cos(currentAngle - angle);
		var y = magnitude * Math.sin(currentAngle - angle);
		return new Vector(x, -y);
	}
}