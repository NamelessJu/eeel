const targetCanvasWidth = 1920;
var pixelSize = 1;

class Game {
	
	static canvas = null;
	static ctx = null;
	
	static objects = [];
	static ui = [];
	
	static highscoreText = null;
	static scoreText = null;
	
	static speed = 1;

	static player = null;
	
	static fishSpawnTimer = 0;
	static decoSpawnTimer = 0;
	
	static States = {
		LOADING: -1,
		START: 0,
		PLAYING: 1,
		GAMEOVER: 2
	};
	static state = null;
	
	static score = 0;
	
	static update() {
		if (Game.state == Game.States.LOADING && TextureManager.loaded)
			Game.setState(Game.States.START);
		
		if (Game.scoreText)
			Game.scoreText.text = "Score: " + Game.getScore();
		
		if (Game.highscoreText) {
			var highscore = "highscore" in SaveManager.data ? SaveManager.data.highscore : 0;
			Game.highscoreText.text = "Highscore: " + Math.max(Game.getScore(), highscore);
		}
		
		if (Game.state == Game.States.PLAYING) {
			
			Game.score += Time.deltaTime;
			Game.speed += Time.deltaTime / 50;
			
			Game.fishSpawnTimer -= Time.deltaTime;
			
			if (Game.fishSpawnTimer <= 0) {
				new Fish();
				
				var minSpawnTimer = 0.5, maxSpawnTimer = 3;
				
				var baseTimer = Game.rng(minSpawnTimer, maxSpawnTimer);
				
				Game.fishSpawnTimer += baseTimer / Game.speed;
			}
			

			Game.decoSpawnTimer -= Time.deltaTime;
			
			if (Game.decoSpawnTimer <= 0) {
				var deco = Math.random();

				if (deco < 0.25) {
					var object = new ScrollingObject(new Texture(TextureManager.textures.bubble));
					object.velocity = new Vector(Game.rng(-100, 100), -Game.rng(100, 300));
					var screenWidth = window.innerWidth / pixelSize;
					var screenHeight = window.innerHeight / pixelSize;
					object.position.x = Math.random() * screenWidth - (screenWidth/2);
					object.position.y = (screenHeight / 2) + 100;
				}
				else {
					var object = new ScrollingObject(new Texture(TextureManager.textures.seaweed));
					object.offset = new Vector(-0.5, -1);
					var screenHeight = window.innerHeight / pixelSize;
					object.position.y = (screenHeight/2) + Game.rng(0, 100);
				}
				
				var minSpawnTimer = 0.5, maxSpawnTimer = 3;
				
				var baseTimer = Game.rng(minSpawnTimer, maxSpawnTimer);
				
				Game.decoSpawnTimer += baseTimer / Game.speed;
			}
			
		}
		
		if ((Game.state == Game.States.START || Game.state == Game.States.GAMEOVER) && Input.getClick())
			Game.setState(Game.States.PLAYING);
	}
	
	static start() {
		Game.canvas = document.getElementById("canvas");
		Game.ctx = Game.canvas.getContext("2d");
		
		SaveManager.loadData();
		
		Game.setState(Game.States.LOADING);
		
		TextureManager.loadTextures();
		
		Game.tick();
	}
	
	static tick() {
		Game.canvas.width = window.innerWidth;
		Game.canvas.height = window.innerHeight;
		
		Time.updateDeltaTime();

		pixelSize = window.innerWidth / targetCanvasWidth;
		
		Game.update();
		
		Game.objects.forEach((o) => {
			o.update();
			o.texture.update();
		});
		
		Game.ui.forEach((o) => {
			o.update();
		});
		
		Game.draw();
		
		Input.update();
		
		window.requestAnimationFrame(Game.tick);
	}
	
	static draw() {
		
		function zSort(a, b) {
			var zIndexA = a.zIndex, zIndexB = b.zIndex;
			if (zIndexA < zIndexB) return -1;
			if (zIndexA > zIndexB) return 1;
			return 0;
		}
		
		var hCenter = window.innerWidth / 2;
		var vCenter = window.innerHeight / 2;
		
		Game.ctx.fillStyle = "black";
		Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
		
		
		Game.objects.sort(zSort);
		
		Game.objects.forEach((o) => {
			if (o.texture != null) {
				Game.ctx.save();

				var imageWidth = o.texture.image.width * pixelSize;
				var imageHeight = o.texture.image.height * pixelSize;

				var imageX = o.offset.x * imageWidth;
				var imageY = o.offset.y * imageHeight;
	
				Game.ctx.translate(hCenter + o.position.x * pixelSize, vCenter + o.position.y * pixelSize);
				Game.ctx.rotate(o.rotation);

				Game.ctx.drawImage(o.texture.image, imageX, imageY, imageWidth, imageHeight);

				if (Game.debug.showHitboxes) {
					Game.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
					Game.ctx.fillRect(imageX + imageWidth * o.hitbox.offset.x, imageY + imageHeight * o.hitbox.offset.y, imageWidth * o.hitbox.size.x, imageHeight * o.hitbox.size.y);
				}
				
				Game.ctx.restore();
			}
		});
		
		Game.ui.sort(zSort);
		
		Game.ui.forEach((o) => {
			o.draw();
		});
	}
	
	static setState(state) {
		
		Game.state = state;
		
		switch (state) {
			
			case Game.States.LOADING:
			
				new UIText("Loading...", 70, new Vector(0.5, 0.5), new Vector(-0.5, -0.5), 10, 3);
				
				break;
			
			case Game.States.START:
			
				Game.objects = [];
				Game.ui = [];
				Game.player = new Player();
				new Background();
				
				new UIText("Eeel", 100, new Vector(0.5, 0.3), 5);
				new UIText("Click to start", 50, new Vector(0.5, 0.8), 1, 2);
				
				break;
				
			case Game.States.PLAYING:
			
				Game.score = 0;
				Game.speed = 1;
				Game.fishSpawnTimer = 0;
				Game.decoSpawnTimer = 0;
			
				Game.objects = [];
				Game.ui = [];
				Game.player = new Player();
				new Background();
				
				Game.highscoreText = new UIText("", 40, new Vector(0.5, 0.05), 0);
				Game.scoreText = new UIText("", 40, new Vector(0.5, 0.11), 0);
				
				break;
				
			case Game.States.GAMEOVER:

				Game.player.texture = new Texture(TextureManager.textures.eel_gameover);
			
				if (!"highscore" in SaveManager.data || Game.getScore() > SaveManager.data.highscore) {
					SaveManager.data.highscore = Game.getScore();
					SaveManager.saveData();
				}
			
				new UIText("Game Over", 80, new Vector(0.5, 0.5), 1);
				new UIText("Click to restart", 50, new Vector(0.5, 0.8), 1, 1);
				
				break;
			
		}
	}
	
	static getScore() {
		return Math.floor(Game.score);
	}
	
	static rng(min, max) {
		return Math.random() * (max - min) + min
	}
	
	static checkCollision(o1, o2) {
		return Game.checkVerticesCollision(o1, o2) || Game.checkVerticesCollision(o2, o1);
	}
	
	static checkVerticesCollision(object, other) {
		
		var vertTopLeftUnrotated = new Vector(
			object.offset.x * object.texture.image.width + object.hitbox.offset.x * object.texture.image.width,
			object.offset.y * object.texture.image.height + object.hitbox.offset.y * object.texture.image.height
		);
		var vertBottomLeftUnrotated = new Vector(
			object.offset.x * object.texture.image.width + object.hitbox.offset.x * object.texture.image.width,
			object.offset.y * object.texture.image.height + object.hitbox.offset.y * object.texture.image.height + object.hitbox.size.y * object.texture.image.height
		);
		var vertTopRightUnrotated = new Vector(
			object.offset.x * object.texture.image.width + object.hitbox.offset.x * object.texture.image.width + object.hitbox.size.x * object.texture.image.width,
			object.offset.y * object.texture.image.height + object.hitbox.offset.y * object.texture.image.height
		);
		var vertBottomRightUnrotated = new Vector(
			object.offset.x * object.texture.image.width + object.hitbox.offset.x * object.texture.image.width + object.hitbox.size.x * object.texture.image.width,
			object.offset.y * object.texture.image.height + object.hitbox.offset.y * object.texture.image.height + object.hitbox.size.y * object.texture.image.height
		);
		
		var vertices = [
			vertTopLeftUnrotated.getRotated(object.rotation),
			vertBottomLeftUnrotated.getRotated(object.rotation),
			vertTopRightUnrotated.getRotated(object.rotation),
			vertBottomRightUnrotated.getRotated(object.rotation)
		];
		
		
		var otherVertTopLeftUnrotated = new Vector(
			other.offset.x * other.texture.image.width + other.hitbox.offset.x * other.texture.image.width,
			other.offset.y * other.texture.image.height + other.hitbox.offset.y * other.texture.image.height
		);
		var otherVertBottomLeftUnrotated = new Vector(
			other.offset.x * other.texture.image.width + other.hitbox.offset.x * other.texture.image.width,
			other.offset.y * other.texture.image.height + other.hitbox.offset.y * other.texture.image.height + other.hitbox.size.y * other.texture.image.height
		);
		var otherVertTopRightUnrotated = new Vector(
			other.offset.x * other.texture.image.width + other.hitbox.offset.x * other.texture.image.width + other.hitbox.size.x * other.texture.image.width,
			other.offset.y * other.texture.image.height + other.hitbox.offset.y * other.texture.image.height
		);
		var otherVertBottomRightUnrotated = new Vector(
			other.offset.x * other.texture.image.width + other.hitbox.offset.x * other.texture.image.width + other.hitbox.size.x * other.texture.image.width,
			other.offset.y * other.texture.image.height + other.hitbox.offset.y * other.texture.image.height + other.hitbox.size.y * other.texture.image.height
		);
		
		var otherVertTopLeft = otherVertTopLeftUnrotated.getRotated(other.rotation);
		var otherVertBottomLeft = otherVertBottomLeftUnrotated.getRotated(other.rotation);
		var otherVertTopRight = otherVertTopRightUnrotated.getRotated(other.rotation);
		var otherVertBottomRight = otherVertBottomRightUnrotated.getRotated(other.rotation);
		
		var otherVertTopLeft = new Vector(otherVertTopLeft.x + other.position.x, otherVertTopLeft.y + other.position.y);
		var otherVertBottomLeft = new Vector(otherVertBottomLeft.x + other.position.x, otherVertBottomLeft.y + other.position.y);
		var otherVertTopRight = new Vector(otherVertTopRight.x + other.position.x, otherVertTopRight.y + other.position.y);
		var otherVertBottomRight = new Vector(otherVertBottomRight.x + other.position.x, otherVertBottomRight.y + other.position.y);
		
		
		var hCenter = window.innerWidth / 2;
		var vCenter = window.innerHeight / 2;
		
		
		for (var i = 0; i < vertices.length; i ++) {
			var vRelative = vertices[i];
			var v = new Vector(vRelative.x + object.position.x, vRelative.y + object.position.y);
			
			var dotProductLeft = (otherVertTopLeft.x - otherVertBottomLeft.x) * (v.y - otherVertBottomLeft.y) - (v.x - otherVertBottomLeft.x) * (otherVertTopLeft.y - otherVertBottomLeft.y);
			var dotProductRight = (otherVertTopRight.x - otherVertBottomRight.x) * (v.y - otherVertBottomRight.y) - (v.x - otherVertBottomRight.x) * (otherVertTopRight.y - otherVertBottomRight.y);
			var dotProductTop = (otherVertTopRight.x - otherVertTopLeft.x) * (v.y - otherVertTopLeft.y) - (v.x - otherVertTopLeft.x) * (otherVertTopRight.y - otherVertTopLeft.y);
			var dotProductBottom = (otherVertBottomRight.x - otherVertBottomLeft.x) * (v.y - otherVertBottomLeft.y) - (v.x - otherVertBottomLeft.x) * (otherVertBottomRight.y - otherVertBottomLeft.y);
			
			// D > 0 = left | D < 0 = right | D = 0 = on
			if (
				dotProductLeft <= 0 && dotProductRight >= 0 && dotProductTop <= 0 && dotProductBottom >= 0)
				return true
		}
		
		return false;
	}
	
	static debug = {
		showHitboxes: false
	}
}

window.onload = Game.start;