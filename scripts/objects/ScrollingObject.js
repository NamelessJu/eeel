class ScrollingObject extends GameObject {
	
	zIndex = 0;
	
	velocity = new Vector();
	
	constructor(texture = null) {
		super(texture);
		
		this.position.x = (targetCanvasWidth / 2) + 300;
	}
	
	update() {
		if (Game.state == Game.States.PLAYING) {
			this.position.x += (this.velocity.x - 300 * Game.speed) * Time.deltaTime;
			this.position.y += this.velocity.y * Time.deltaTime;
		}
	}
}