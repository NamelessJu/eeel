class Player extends GameObject {
	
	offset = new Vector(-0.7, -0.5);
	hitbox = new Hitbox(new Vector(0.1, 0.3), new Vector(0.8, 0.4));
	texture = new AnimatedTexture([
		TextureManager.textures.eel_frame1,
		TextureManager.textures.eel_frame2,
		TextureManager.textures.eel_frame3,
		TextureManager.textures.eel_frame4
	], 130);
	zIndex = 10;
	
	velocity = new Vector();
	
	targetRotation = 0;
	rotationSmoothing = 3;
	
	acceleration = 3500;
	friction = 8;
	gravity = 500;
	
	update() {
		if (Game.state == Game.States.PLAYING) {
			var moving = false;
			
			this.velocity.y += this.gravity * Time.deltaTime;

			if (Input.getKey("KeyW")) {
				this.velocity.y -= this.acceleration * Time.deltaTime;
				moving = true;
			}
			if (Input.getKey("KeyS")) {
				this.velocity.y += this.acceleration * Time.deltaTime;
				moving = true;
			}
			if (Input.getKey("KeyA")) {
				this.velocity.x -= this.acceleration * Time.deltaTime;
				moving = true;
			}
			if (Input.getKey("KeyD")) {
				this.velocity.x += this.acceleration * Time.deltaTime;
				moving = true;
			}
			
			this.position.x += this.velocity.x * Time.deltaTime;
			this.position.y += this.velocity.y * Time.deltaTime;
			
			if (this.position.x > (window.innerWidth / 2) / pixelSize) {
				this.position.x = (window.innerWidth / 2) / pixelSize;
				this.velocity.x = Math.min(this.velocity.x, 0);
			}
			if (this.position.x < -(window.innerWidth / 2) / pixelSize) {
				this.position.x = -(window.innerWidth / 2) / pixelSize;
				this.velocity.x = Math.max(this.velocity.x, 0);
			}
			if (this.position.y > (window.innerHeight / 2) / pixelSize) {
				this.position.y = (window.innerHeight / 2) / pixelSize;
				this.velocity.y = Math.min(this.velocity.y, 0);
			}
			if (this.position.y < -(window.innerHeight / 2) / pixelSize) {
				this.position.y = -(window.innerHeight / 2) / pixelSize;
				this.velocity.y = Math.max(this.velocity.y, 0);
			}
			
			this.velocity.x *= 1 - this.friction * Time.deltaTime;
			this.velocity.y *= 1 - this.friction * Time.deltaTime;
			
			if (Math.abs(this.velocity.x) <= 1)
				this.velocity.x = 0;


			if (moving)
				this.targetRotation = this.velocity.x >= 0
					? Math.max(Math.PI*0.25, Math.min(Math.PI*0.75, this.velocity.getAngle())) - Math.PI*0.5
					: Math.max(Math.PI*0.25, Math.min(Math.PI*0.75, this.velocity.getAngle() - Math.PI)) - Math.PI*0.5;
			else
				this.targetRotation = 0;

			this.rotation += (this.targetRotation - this.rotation) * this.rotationSmoothing * Time.deltaTime;
			
			
			for (var i = 0; i < Game.objects.length; i ++) {
				var object = Game.objects[i];
				if (!(object instanceof Player) && object instanceof Fish) {
					if (Game.checkCollision(this, object))
						Game.setState(Game.States.GAMEOVER);
				}
			}
		}
	}
}