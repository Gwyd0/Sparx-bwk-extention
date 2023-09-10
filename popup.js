let button = document.getElementsByClassName("btn");
let checkboxes = document.querySelectorAll('input[type=checkbox]');

let i;

function loops() {
	for (i = 0; i < button.length; i++) {
	  button[i].addEventListener("click", function() {
		this.classList.toggle("active");
		let content = this.nextElementSibling;
		if (content.style.display === "block") {
		  content.style.display = "none";
		} else {
		  content.style.display = "block";
		}
		localStorage.setItem(content.id,  JSON.stringify(content.style.display));
	  });
	}
	for (i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('change', function() {
			localStorage.setItem(this.id,  JSON.stringify(this.checked));
			browser.runtime.sendMessage({id:this.id, checked:this.checked});
		});
	}
}

function setElements(){
	for (i = 0; i < checkboxes.length; i++) {checkboxes[i].checked = JSON.parse(localStorage.getItem('checkbox' + i));}
	button[0].nextElementSibling.style.display = JSON.parse(localStorage.getItem('menu0'));
	button[1].nextElementSibling.style.display = JSON.parse(localStorage.getItem('menu1'));
	
	const logsDiv=document.querySelector(".scroll");
	if (logsDiv.firstChild) {
		console.log("logs are present")
		//log	
	}
	else {
		const noLogMsg = document.createElement("span");
		noLogMsg.innerHTML = "There are no recent logs";
		logsDiv.appendChild(noLogMsg);
	}
}

function updateSettings() {
	
}

setElements();
loops();

