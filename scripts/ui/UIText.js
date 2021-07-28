class UIText {
	position = new Vector();
	zIndex;
	
	text;
	fontSize = 18;
	
	fadeDuration;
	
	opacity = 1;
	
	fadingIn = false;
	
	constructor(text, fontSize, position = new Vector(), zIndex = 0, fadeDuration = 0) {
		this.text = text;
		this.fontSize = fontSize;
		this.zIndex = zIndex;
		this.position = position;
		this.fadeDuration = fadeDuration;
		
		Game.ui.push(this);
	}
	
	draw() {
		Game.ctx.font = (this.fontSize * pixelSize) + "px Pixel";
		Game.ctx.textBaseline = "middle";
		Game.ctx.textAlign = "center";
		Game.ctx.fillStyle = "rgba(255, 255, 255, " + this.opacity + ")";
		
		Game.ctx.fillText(this.text, this.position.x * window.innerWidth, this.position.y * window.innerHeight);
	}
	
	update() {
		if (this.fadeDuration > 0) {
			this.opacity += (1 / (this.fadingIn ? this.fadeDuration : -this.fadeDuration)) * Time.deltaTime * 2
			if (this.opacity <= 0) {
				this.opacity = Math.abs(this.opacity);
				this.fadingIn = true;
			}
			else if (this.opacity >= 1) {
				this.opacity = 1-(this.opacity-1);
				this.fadingIn = false;
			}
		}
	}
}