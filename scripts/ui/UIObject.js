class UIObject {
	position = new Vector();
	rotation = 0;
	zIndex;
	
	constructor(zIndex = 0) {
		this.zIndex = zIndex;
		
		Game.ui.push(this);
	}
	
	draw() {}
	
	update() {}
}