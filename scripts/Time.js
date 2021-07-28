class Time {
	static deltaTime = 0;
	static speed = 1;
	
	static deltaTimeEnabled = true;
	static previousFrame = -1;
	
	static updateDeltaTime() {
		if (Time.deltaTimeEnabled) {
			var currentFrame = new Date().getTime();
			Time.deltaTime = Time.previousFrame >= 0 ? (currentFrame - Time.previousFrame) / 1000 : 0;
			Time.previousFrame = currentFrame;
		}
	}
	
	static enableDeltaTime() {
		Time.previousFrame = -1;
		Time.deltaTimeEnabled = true;
	}
	static disableDeltaTime() {
		Time.deltaTimeEnabled = false;
	}
}

document.addEventListener("blur", Time.disableDeltaTime);
document.addEventListener("focus", Time.enableDeltaTime);