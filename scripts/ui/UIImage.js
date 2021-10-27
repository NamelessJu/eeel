class UIImage extends UIObject {
	offset = new Vector();
	rotation = 0;
	scale = 1;
	texture;

	constructor(texture = null, zIndex = 0) {
		super(zIndex);
        this.texture = texture;
	}
	
	draw() {
        if (this.texture != null) {
            Game.ctx.save();
            
		    var hCenter = window.innerWidth / 2;
            var vCenter = window.innerHeight / 2;
    
            var imageWidth = this.texture.image.width * pixelSize;
            var imageHeight = this.texture.image.height * pixelSize;
    
            var imageX = this.offset.x * imageWidth;
            var imageY = this.offset.y * imageHeight;
    
            Game.ctx.translate(hCenter + this.position.x * pixelSize, vCenter + this.position.y * pixelSize);
            Game.ctx.rotate(this.rotation);
            Game.ctx.scale(this.scale, this.scale);
    
            Game.ctx.drawImage(this.texture.image, imageX, imageY, imageWidth, imageHeight);
            
            Game.ctx.restore();
        }
    }
}