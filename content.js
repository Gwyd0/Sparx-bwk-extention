const allSessionLogs = []
let bwc=""
let answer=""
let logString=""
let update=400

// this is the first version i made within an hour its inefficent.


var elementCheckingInterval = setInterval(function(){
    // Find bookwork code with a selector, this can be made more efficent but for now it works
    if (document.URL.includes("sparxmaths")) {
    	update=400
		if(document.querySelector(".bookwork-code-clickable")){
		    bwc=document.querySelector(".bookwork-code-clickable").childNodes[0].innerText.replace("Bookwork code: ", "");
		    if(document.querySelector(".number-input")){
		        answer=document.querySelector(".number-input").value;
		        if (answer != "") { // make sure not empty string
					var submit = document.querySelectorAll(".btn")[1]; 
					if (submit != null) {
						submit.addEventListener('click', log); 
					}
		        }
		    }
        }
    }
    else {
    	update=3000
    }
}, update);

var Clicked = false; 

function log(){ // logs the bookwork codes
  Clicked = true;
  logString = "[BWC] "+bwc+" [ANSWER] "+answer
  allSessionLogs.push(logString)
  console.log(logString)
  display
}

function display(){
	console.log("DISPLAYING"); //THIS IS BEING WORKED ON
}
