class Input {
	
	static keys = {};
	static click = false;
	
	static update() {
		Input.click = false;
	}
	
	static getKey(code) {
		return code in Input.keys ? Input.keys[code] : false;
	}
	static getClick() {
		return Input.click;
	}
	
	static onKeyDown(e) {
		Input.keys[e.code] = true;
	}
	static onKeyUp(e) {
		Input.keys[e.code] = false;
	}
	
	static onClick(e) {
		Input.click = true;
	}
	
	static onGameBlur(e) {
		Input.keys = {};
	}
}

document.onkeydown = Input.onKeyDown;
document.onkeyup = Input.onKeyUp;
document.onclick = Input.onClick;
document.addEventListener("blur", Input.onGameBlur);

window.oncontextmenu = (e) => {
	e.preventDefault();
	return false;
}