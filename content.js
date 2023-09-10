let allLogs = ['[BWC] 2B [ANSWER] 7 litres'];
let bwc="";
let answer="";
let logString="";
let i; 

// this is the first version i made within an hour its inefficent.

// todo
// use connection based messaging

// communicate with popup.js for displaying data
// bookwork check
// Display lOGGSSS !IMPORTANT
// use listeners more.
// rework bookwork checks it kinda works :/


function log(bwc, answer) {
	const submit = document.querySelector("button[class^='_ButtonBase_10evl_1 _FocusTarget_1nxry_1 _ButtonMd_10evl_27 _ButtonBlue_10evl_51 _ButtonContained_10evl_81']");
	if (answer != "" && submit != null) {
		submit.addEventListener('click', function() {
			const logString = "[BWC] "+bwc+" [ANSWER] "+answer;
			if (logString!=allLogs[allLogs.length-1] && logString!=allLogs[allLogs.length-2] && logString!=allLogs[allLogs.length-3]) {
				console.log(logString);
				allLogs.push(logString);
				browser.runtime.sendMessage({log: logString});// in future message entire array of bwc/answers
			}}); 	
	}
}

function logAnswer(){
	if(document.querySelector('div[class^="_Chip_1l3e3_1 _Selected_1l3e3_13"]')){
		let bwc=document.querySelector('div[class^="_Chip_1l3e3_1 _Selected_1l3e3_13"]').innerText.replace("Bookwork code: ", "");
		// bookwork check
		if (document.querySelector("div[class='_WACContent_1cxo7_12']")) {
			console.log("[BOOKWORK CHECK] " + bwc);
			bwc=bwc.replace("Bookwork ", "");
			const wacOptions=document.getElementsByClassName("answer-part");
			for (x = 0; x < allLogs.length; x++) {
				if (allLogs[x].includes(bwc)) {
					for (i = 0; i < wacOptions.length; i++) {
						if (allLogs[x].replace("[BWC] "+bwc+" [ANSWER] ", "").includes(wacOptions[i].innerText)) {
							console.log(wacOptions[i].innerText);
						}
					}	
				}
			}
		}
		// inputs
		else if(document.querySelector("input[placeholder='Enter number']")){
			log(bwc, document.querySelector("input[placeholder='Enter number']").value)
		}
		// selection
		else if(document.getElementsByClassName("_OptionSelected_xv49g_511")) {
			const selected = document.getElementsByClassName("_OptionSelected_xv49g_511");
			for (i = 0; i < selected.length; i++) {
				log(bwc, selected[i].innerText.replace(/\n/g, ''));
			}
		}
		// auto continue
		if(document.querySelector("div[class^='_Content_10evl_162']")) {
			const btn=document.querySelector("div[class^='_Content_10evl_162']");
			console.log(btn.innerText);
			for (i = 0; i < btn.length; i++) {
				if (btn[i].innerText == "Continue"||btn[i].innerText == "Second chance"||btn[i].innerText == "Later") {btn[i].click();}
			}
		}
	}
}

let elementCheckingInterval = setInterval(function(){logAnswer(); browser.runtime.sendMessage("Check!");}, 400);
