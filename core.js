let SettingsThemeDark = true;

function handleMessage(request, sender) {
	if (sender.url.includes("sparxmaths")) { //content.js
		if (request.log) {
			//log
			browser.runtime.sendMessage({log: logString});
		}
		else {
			darkMode(sender.tab.id);
		}
	}
	else if (sender.url.includes("popup.html")) { // popup.js
		if (request.id == "checkbox4") {SettingsThemeDark=request.checked;}
		else {
			browser.runtime.sendMessage(request);
		}
		
	}
}

function darkMode(tab) {
	if (SettingsThemeDark) {
		console.log("Dark Theme Enabled")
		browser.scripting.insertCSS({
		  target: {
		    tabId: tab,
		  },
		  files: ["./themes/dark.css"],
		});
    }
    else {
		console.log("Dark Theme Disabled")
		browser.scripting.removeCSS({
		  target: {
			tabId: tab,
		  },
		  files: ["./themes/dark.css"],
		});
	}
}

browser.runtime.onMessage.addListener(handleMessage);
