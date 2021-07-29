class Bubble extends ScrollingObject {
	
	texture = new Texture(TextureManager.textures.bubble);
	
	velocity = new Vector();
	
	constructor(texture = null) {
		super(texture);
		
      this.velocity = new Vector(Game.rng(-100, 100), -Game.rng(100, 300));
      var screenWidth = window.innerWidth / pixelSize;
      var screenHeight = window.innerHeight / pixelSize;
      this.position.x = Math.random() * screenWidth - (screenWidth/2);
      this.position.y = (screenHeight / 2) + 100;
	}
}