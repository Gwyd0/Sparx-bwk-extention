let logs = [];
let bwc;
let answer;
let logString;
let answerString;
let i; 


let SettingsAutoLogin = true;
let SettingsBookworkChecks = true;
let SettingsAutoContinue = true;
let SettingsDarkMode = false;

let usr=null;
let psw=null;
// msgtype = POPUP , PageUpdated, BACKGROUND, SETTING

// todo
// cleanup Logs mord
// rewrite theme thing
// use listeners more.
// rework bookwork checks it kinda works :/

// COMMUNICATION
let CsPort = browser.runtime.connect({ name: "port-from-cs" });
CsPort.postMessage({ connection: "CS Connected" });

CsPort.onMessage.addListener((m) => {
	if (m.msgType == "PageUpdated") {
		CsPort.postMessage({logs: logs, msgType: "POPUP"});
	}
	else if (m.msgType == "SETTING") {
		if (m.usr) {usr=m.usr;}
		if (m.psw) {psw=m.psw; autoLogin();}
		
		if (m.id=="checkbox0") {SettingsBookworkChecks=m.checked;}
		else if (m.id=="checkbox1") {console.log("rework games?");}
		else if (m.id=="checkbox2") {SettingsAutoContinue=m.checked;}
		else if (m.id=="checkbox3") {SettingsAutoLogin=m.checked;}
		else if (m.id=="checkbox4") {SettingsDarkMode=m.checked;}
	}
});

// SCRIPT
function autoLogin() {
	if (SettingsAutoLogin && document.title.includes("Login") && usr != null) {
		console.log("")
		usrInput=document.querySelector("#username");
		pswInput=document.querySelector("#password");
		
		usrInput.value = usr;
		pswInput.value = psw;
		
		loginBtn=document.querySelector(".login-button");
		loginBtn.removeAttribute("disabled");
		loginBtn.click();
	}
}


function test() {
	let answerString="";
	const submit = document.querySelector("button[class^='_ButtonBase_10evl_1 _FocusTarget_1nxry_1 _ButtonMd_10evl_27 _ButtonBlue_10evl_51 _ButtonContained_10evl_81']");
	if(document.querySelector('div[class^="_Chip_1l3e3_1 _Selected_1l3e3_13"]') && !submit.classList.contains("_Disabled_10evl_89")&&submit.innerText == "Submit answer"){
	
		let bwc=document.querySelector('div[class^="_Chip_1l3e3_1 _Selected_1l3e3_13"]').innerText.replace("Bookwork code: ", "");
		if (document.getElementsByClassName('katex-mathml') != null) {
			tiles = document.getElementsByClassName('katex-mathml');
			submit.addEventListener('click', function() {
				for (x = 0; x < tiles.length; x++) {
					answerString = answerString + " " + tiles[x].innerText;
				}
				log(bwc, answerString);
			});
		}
		if(document.querySelector("input[placeholder='Enter number']")){
			const inputs = document.querySelectorAll("input[placeholder='Enter number']");
			submit.addEventListener('click', function() {
				for (x = 0; x < inputs.length; x++) {
					answerString = answerString + " " + inputs[x].value;
				}
				log(bwc, answerString);
			});
		}
		if(document.querySelector("._OptionSelected_1yby8_511")){
			const inputs = document.querySelectorAll("._OptionSelected_1yby8_511");
			submit.addEventListener('click', function() {
				for (x = 0; x < inputs.length; x++) {
					answerString = answerString + " " + inputs[x].innerText;
				}
				log(bwc, answerString);
			});
		}
	}
	
}

function log(bwc, answer) {
	if (answer == "") {
		return;
	}
	const submit = document.querySelector("button[class^='_ButtonBase_10evl_1 _FocusTarget_1nxry_1 _ButtonMd_10evl_27 _ButtonBlue_10evl_51 _ButtonContained_10evl_81']");
	const logString = "[BWC] "+bwc+" [ANSWER] "+answer;
	if (logString!=logs[logs.length-1] && logString!=logs[logs.length-2] && logString!=logs[logs.length-3]) {
		console.log(logString);
		logs.push(logString);	
	}
}

/*
function logAnswer() {
	if(document.querySelector('div[class^="_Chip_1l3e3_1 _Selected_1l3e3_13"]')){
		let bwc=document.querySelector('div[class^="_Chip_1l3e3_1 _Selected_1l3e3_13"]').innerText.replace("Bookwork code: ", "");
		// bookwork check
		if (SettingsBookworkChecks&&document.querySelector("div[class='_WACContent_1cxo7_12']")) {
			console.log("[BOOKWORK CHECK] " + bwc);
			bwc=bwc.replace("Bookwork ", "");
			const wacOptions=document.getElementsByClassName("answer-part");
			for (x = 0; x < logs.length; x++) {
				if (logs[x].includes(bwc)) {
					for (i = 0; i < wacOptions.length; i++) {
						if (logs[x].replace("[BWC] "+bwc+" [ANSWER] ", "").includes(wacOptions[i].innerText)) {
							console.log(wacOptions[i].innerText);
						}
					}	
				}
			}
		}
		// inputs
		if(document.querySelector("input[placeholder='Enter number']")){
			const inputs = document.querySelectorAll("input[placeholder='Enter number']");
			for (i = 0; i < inputs.length; i++) {
				log(bwc, inputs[i].value);
			}
		}
		// sections
		if(document.getElementsByClassName("_OptionSelected_1yby8_511")) {
			const selected = document.getElementsByClassName("_OptionSelected_1yby8_511");
			for (i = 0; i < selected.length; i++) {
				log(bwc, selected[i].innerText.replace(/\n/g, ''));
			}
		}
		// tiles
		if(document.getElementsByClassName("_CardSlot_1yby8_645")) { 
			const tiles = document.getElementsByClassName("_CardSlot_1yby8_645");
			for (i = 0; i < tiles.length; i++) {
				log(bwc, tiles[i].innerText.replace(/\n/g, ''));
			}
		}
		// auto continue
		if(SettingsAutoContinue&&document.querySelector("div[class^='_Content_10evl_162']")) {
			const btn=document.querySelectorAll("div[class^='_Content_10evl_162']");
			for (i = 0; i < btn.length; i++) {
				if (btn[i].innerText == "Continue"||btn[i].innerText == "Second chance"||btn[i].innerText == "Later") {btn[i].click();}
			}
		}
	}
}
*/
// START Sparx Maths Student Login

console.log("Loaded SparxBwk");
autoLogin();
let elementCheckingInterval = setInterval(function(){
	test();
}, 400);

