let BsPort;
let logs = [];


// Communication: Acts as middleman between popup.js and content.js
function handleCS(p) {
	BsPort = p;
	BsPort.postMessage({ connection: "BG Connected" });
	BsPort.onMessage.addListener((m) => {
  		if (m.msgType && m.msgType == "POPUP") {
  			logs = m.logs;
  		}
    console.log(m);
  });
}
function handlePU(m, sender) {
	console.log(m);
	if (m.msgType == "POPUP") {
		browser.runtime.sendMessage({msgType: "POPUP", logs: logs});
	}
	if (m.msgType == "SETTING") {
		BsPort.postMessage(m);
	}
}


browser.runtime.onConnect.addListener(handleCS);
browser.runtime.onMessage.addListener(handlePU);
browser.tabs.onUpdated.addListener(() => {BsPort.postMessage({msgType: "PageUpdated"});});


/* REWORK
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

}*/
