class Background extends GameObject {
	
	offset = new Vector(-0.5, -0.5);
	texture = new Texture(TextureManager.textures.background);
	zIndex = -1;

	update() {
		var heightScale = targetCanvasHeight / this.texture.image.height;
		var widthScale = Game.canvas.width / Game.canvas.height * heightScale;
		this.scale = Math.max(widthScale, heightScale);
	}

}