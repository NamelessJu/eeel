class SaveManager {
	
	static data = {};
	
	static saveData() {
		var dataString = JSON.stringify(SaveManager.data);
		var expirationDate = new Date();
		expirationDate.setFullYear(expirationDate.getFullYear() + 1);
		
		document.cookie = "data="+dataString+"; expires="+expirationDate.toUTCString()+"; SameSite=Strict;";
	}
	
	static loadData() {
		var dataString = SaveManager.getCookie("data");
		if (dataString != null) {
			SaveManager.data = JSON.parse(dataString);
		}
	}
	
	static getCookie(name) {
		var cookies = document.cookie.split(";");
		
		for(var i = 0; i < cookies.length; i++) {
			var cookiePair = cookies[i].split("=");
			
			if (cookiePair[0].trim() == name) {
				return decodeURIComponent(cookiePair[1]);
			}
		}
		
		return null;
	}
}