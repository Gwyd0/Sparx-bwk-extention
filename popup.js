const button=document.getElementsByClassName("btn");
const checkboxes=document.querySelectorAll('input[type=checkbox]');
const inputs=document.querySelector('.inputs');
const inputCheckBox=document.getElementById('checkbox3');
const logsDiv=document.querySelector(".scroll");
let i;

let usr;
let psw;
let logs = [];

function loops() {
	// for section +/-
	for (i = 0; i < button.length; i++) {
		button[i].addEventListener("click", function() {
			this.classList.toggle("active");
			const content = this.nextElementSibling;
			if (content.style.display === "block") {
			  	content.style.display = "none";
			} else {
			  	content.style.display = "block";
			}
			localStorage.setItem(content.id,  JSON.stringify(content.style.display));
	  });
	}
	// for checkboxes
	for (i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('change', function() {
			localStorage.setItem(this.id,  JSON.stringify(this.checked));
			if (this.id=="checkbox3" && this.checked) {
				inputs.style.display = "block";
				browser.runtime.sendMessage({msgType: "SETTING", 
					usr: JSON.parse(localStorage.getItem('usr')), 
					psw: JSON.parse(localStorage.getItem('psw')) 
				});
			}
			else if (this.id=="checkbox3"){inputs.style.display = "none";}
			browser.runtime.sendMessage({msgType: "SETTING", id:this.id, checked:this.checked});
			
		});
	}
	// for inputs
	document.getElementById('usr').addEventListener('input', function() {
		browser.runtime.sendMessage({msgType: "SETTING", usr: this.value});
		localStorage.setItem("usr",  JSON.stringify(this.value));
	});
	document.getElementById('psw').addEventListener('input', function() {
		browser.runtime.sendMessage({msgType: "SETTING", psw: this.value});
		localStorage.setItem("psw",  JSON.stringify(this.value));
	});
	
	
}

function setElements(){
	for (i = 0; i < checkboxes.length; i++) {checkboxes[i].checked = JSON.parse(localStorage.getItem('checkbox' + i));}
	button[0].nextElementSibling.style.display = JSON.parse(localStorage.getItem('menu0'));
	button[1].nextElementSibling.style.display = JSON.parse(localStorage.getItem('menu1'));
	
	if (inputCheckBox.checked) {inputs.style.display = "block";}
	else {inputs.style.display = "none";}
	
	JSON.parse(localStorage.getItem('checkbox' + i));
	
	document.getElementById('psw').value = JSON.parse(localStorage.getItem('psw'));
	document.getElementById('usr').value = JSON.parse(localStorage.getItem('usr'));
	if (inputCheckBox.checked) {
		browser.runtime.sendMessage({msgType: "SETTING", 
			usr: JSON.parse(localStorage.getItem('usr')), 
			psw: JSON.parse(localStorage.getItem('psw')) 
		});
	}
}

function handleBS(m) {
	logs = m.logs;
	console.log("recived Logs");
	if (logs.length > 0) {
		for (i = 0; i < logs.length; i++) {
			const log = document.createElement("p");
			log.innerHTML = logs[i];
			logsDiv.appendChild(log);
		}
	}
	else {
		logsDiv.innerText = "There are no logs present";
	}
	
}

console.log("Popup Opened");
browser.runtime.sendMessage({msgType: "POPUP", connection: "PU Messaged Success"});
browser.runtime.onMessage.addListener(handleBS);

document.addEventListener('DOMContentLoaded',() => {    
     setElements();
     loops();    
});


