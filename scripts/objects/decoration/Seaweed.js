class Seaweed extends ScrollingObject {
	
	texture = new Texture(TextureManager.textures.seaweed);
	
	constructor(texture = null) {
		super(texture);
		
		this.offset = new Vector(-0.5, -(Game.rng(0, 100) / 100));
	}
	
	update() {
		super.update();
		var screenHeight = window.innerHeight / pixelSize;
		this.position.y = (screenHeight/2);
	}
}