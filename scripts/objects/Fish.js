class Fish extends ScrollingObject {
	
	offset = new Vector(-0.5, -0.5);
	hitbox = new Hitbox(new Vector(0.15, 0.3), new Vector(0.7, 0.5));
	texture = new Texture(TextureManager.textures.fish);
	zIndex = 1;
	
	velocity;
	
	constructor() {
		super();
		
		var screenHeight = window.innerHeight / pixelSize;
		this.position.y = Math.random() * screenHeight - (screenHeight/2);
		
		this.velocity = new Vector(Game.rng(-300, 0), Game.rng(-25, 25));
		
		var rot = this.velocity.getAngle() + Math.PI * 0.5;

		if (rot < Math.PI)
			rot = Math.min(Math.PI * 0.25, rot);
		else
			rot = Math.max(Math.PI * 1.75, rot);

		this.rotation = rot;
	}
	
	update() {
		super.update();
		
		if (Game.state == Game.States.PLAYING) {
			if (this.position.x < -((Game.canvas.width / pixelSize) / 2) - 200)
				this.destroy();
		}
	}
}