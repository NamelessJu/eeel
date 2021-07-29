class GameObject {
	position = new Vector();
	offset = new Vector();
	rotation = 0;
	scale = 1;
	hitbox = null;
	texture;
	zIndex;
	
	constructor(texture = null, zIndex = 0) {
		this.texture = texture;
		this.zIndex = zIndex;
		
		Game.objects.push(this);
	}
	
	update() {}
	
	destroy() {
		for (var i = 0; i < Game.objects.length; i ++) {
			if (Game.objects[i] == this) {
				Game.objects.splice(i, 1);
				break;
			}
		}
	}
}