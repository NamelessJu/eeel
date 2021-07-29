class Background extends GameObject {
	
	offset = new Vector(-0.5, -0.5);
	texture = new Texture(TextureManager.textures.background);
	zIndex = -1;

	update() {
		var widthScale = this.texture.image.width / window.innerWidth * pixelSize;
		var heightScale = window.innerHeight / window.innerWidth;
		this.scale = Math.max(widthScale, heightScale);
	}

}