class Hitbox {
	offset;
	size;
	
	constructor(offset = new Vector(), size = new Vector(1, 1)) {
		this.offset = offset;
		this.size = size;
	}
}