class TextureManager {
	
	static textureFiles = {
		eel_frame1: "eel_frame1.png",
		eel_frame2: "eel_frame2.png",
		eel_frame3: "eel_frame3.png",
		eel_frame4: "eel_frame4.png",
		eel_gameover: "eel_gameover.png",

		fish: "fish.png",

		seaweed: "seaweed.png",
		bubble: "bubble.png",

		background: "background.png",

		mobile_left: "mobile_left.png",
		mobile_right: "mobile_right.png",
		mobile_up: "mobile_up.png",
		mobile_down: "mobile_down.png"
	};
	
	static texturePath = "./assets/textures/";
	
	static textures = {};
	
	static loadedTextures = 0;
	static loaded = false;
	
	static loadTextures() {
		for (var [name, file] of Object.entries(TextureManager.textureFiles)) {
			var image = new Image();
			image.onload = () => {
				TextureManager.loadedTextures += 1;
				if (TextureManager.loadedTextures >= Object.entries(TextureManager.textureFiles).length)
					TextureManager.loaded = true;
			};
			image.onerror = () => {
				alert("Image \"" + file + "\" could not be loaded");
			};
			image.src = TextureManager.texturePath + file;
			TextureManager.textures[name] = image;
		}
	}
	
}