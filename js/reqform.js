
window.onunload = function () {
	sessionStorage.clear();
}

const MAX_AUDIENCES = 10;
let paramsArea;
let paramsAreaClone;
let maxMessageOn = false;
let audienceCount = 0;
function incrementAud(){
	audienceCount++;
}
let numOfaudienceBoxes = 0; 
function increment(){
	numOfaudienceBoxes += 1;
}
let audList = [];


function searchbox() {
    let input, filter, ul, li, i, txtValue;
    input = document.getElementById("searchboxInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("paramlist");
    li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

/*
===== DRAG AND DROP =======
*/

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

/*
===========================
*/

/*
---------------------------------------------

Function to Remove Form Elements Dynamically
---------------------------------------------

*/
function removeElement(parentDiv, childDiv){
	if (childDiv == parentDiv){
	alert("The parent div cannot be removed.");
	}
	else if (document.getElementById(childDiv)){
		let child = document.getElementById(childDiv);
		let parent = document.getElementById(parentDiv);
		parent.removeChild(child);
	}		
	else{
alert("Child div has already been removed or does not exist.");
return false;
}
}
/*
----------------------------------------------------------------------------
Functions called when user click on the "new" button, which opens an audience
field.
----------------------------------------------------------------------------
*/
function boxFunction(){
	if (numOfaudienceBoxes == 3){ //limiting the number of audience boxes to three, otherwise requests get too complex to make sense
		if(maxMessageOn == false){
			let pMaxBoxesMsg = document.createElement("P");
			pMaxBoxesMsg.setAttribute("Id", "maxBoxesMsg");
			let maxBoxesMsg = document.createTextNode("Maximum number of boxes reached.");
			pMaxBoxesMsg.appendChild(maxBoxesMsg);
			document.getElementById("controlButtons").appendChild(pMaxBoxesMsg);
			maxMessageOn = true;
		}
		return;
	}
	let r = document.createElement('span');
	let y = document.createElement("div");
	let pnode = document.createElement("P");
	pnode.setAttribute("id", "anyof"); 
	let texttouse;
	if(numOfaudienceBoxes > 0){
		texttouse = "and any of:";
	} else{
		texttouse = "Any of:";
	};
	increment()
	let textnode = document.createTextNode(texttouse);
	pnode.appendChild(textnode);
	// let g = document.createElement("IMG");
	// g.setAttribute("src", "delete.png");
	y.setAttribute("type", "text");
	y.setAttribute("placeholder", "Name");
	y.setAttribute("Name", "audienceCriteria_" + numOfaudienceBoxes);
	y.setAttribute("id", "audienceCriteria_" + numOfaudienceBoxes);
	y.setAttribute("Class", "audiencebox");
	y.setAttribute("ondrop", "drop(event)"); 
	y.setAttribute("ondragover", "allowDrop(event)");
	r.appendChild(pnode)
	r.appendChild(y);
	// g.setAttribute("onclick", "removeElement('myForm','id_" + numOfaudienceBoxes + "')");
	// r.appendChild(g);
	r.setAttribute("id", "id_" + numOfaudienceBoxes);
	document.getElementById("audienceContainer").appendChild(r);
}


function hideToggle(elid) {
	let x = document.getElementById(elid);
	if (x.style.display === "none" || x.style.display === "") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
  }

  /*
-----------------------------------------------------------------------------
Store data.
------------------------------------------------------------------------------
*/
function store(){
	for(let i=1; i<=numOfaudienceBoxes; i++){
		let box = document.getElementById("audienceCriteria_"+i).children;
		let arr = [];
		for (let j = 0; j < box.length; j++){
			arr.push(box[j].id);
		}
		sessionStorage.setItem("aud_"+audienceCount+"_"+i,JSON.stringify(arr));
	}
}

function clearCurrent(){
	document.getElementById('audienceContainer').innerHTML = '';
	if(maxMessageOn){
		let toRemove = document.getElementById("maxBoxesMsg");
		toRemove.parentNode.removeChild(toRemove);
		maxMessageOn = false; 
	}
	paramsArea.innerHTML = paramsAreaClone.innerHTML;
	numOfaudienceBoxes = 0;
	}

function resetButtonsAndValues(){
	document.getElementById("controlButtons").style.display = "none";
	hideToggle("open-button");
	document.getElementById("countrySelected").innerText = '';
	document.getElementById("aud name").value  = '';
}


function doneSelectingCriteria(){
	if (audienceCount==MAX_AUDIENCES){
		window.alert("You have reached the maximum number of audiences for this session reached. Please press sumbit.");
		return;
	}
	try{
		let fistBox = document.getElementById("audienceCriteria_1").children;
		if(fistBox.length == 0){
			window.alert("Add some criteria in the top box.");
			return;
		}
	}
	catch(e){
			window.alert("Add some criteria.");
			return;
		}
	store();
	clearCurrent();
	resetButtonsAndValues()
	document.getElementById("submit-button").style.display = "inline-block";
}


// function nextAudience(){

// }

function resetAll(){
	audienceCount = 0;
	let traylist = document.getElementById("trayList");
	traylist.replaceChildren();
	document.getElementById("tray").style.display = "none";
	clearCurrent();
	resetButtonsAndValues();
	document.getElementById("reset-button").style.display = "none";
	document.getElementById("submit-button").style.display = "none";
	document.getElementById("open-button").style.display = "block";
	sessionStorage.clear();
	}


function addToTray(){
	let country = document.getElementById("countrySelected").innerText;
	let name = document.getElementById("aud name").value;
	let il = document.createElement("il");
	let audName = audienceCount+"_"+country+"-"+name;
	il.innerHTML = audName;
	audList.push(audName);
	il.setAttribute("class","aud_in_tray")
	document.getElementById("trayList").appendChild(il);
	if(audienceCount==1){
		document.getElementById("tray").style.display = "block";
	}
}

/// start form
  function openStartForm() {
	document.getElementById("submit-button").style.display = "none";
	document.getElementById("startPopup").style.display = "block";
	paramsArea = document.getElementById("paramarea");
	paramsAreaClone = paramsArea.cloneNode(true);
  }
  
  function closeStartForm() {
	let name = document.getElementById("aud name").value;
	let country = document.getElementById("countrySelected").innerText;
	if (name.trim() == "" || country == ""){
		window.alert("Add name and country");
		return;
	}
	let newAudName = audienceCount+"_"+country+"_"+name;
	if(audList.includes(newAudName)){
		window.alert("Choose a new name or country. This audience is already in your list.");
		return;
	}
	incrementAud();
	document.getElementById("startPopup").style.display = "none";
	document.getElementById("open-button").style.display = "none";
	document.getElementById("reset-button").style.display = "inline-block";
	hideToggle("controlButtons");
	addToTray();
  }



/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownCountry() {
	document.getElementById("dropdownContentCountry").classList.toggle("show");
  }

function showySelectedCountry(c){
	document.getElementById("countrySelected").innerText = c;
}
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
	  let dropdowns = document.getElementsByClassName("dropdown-content");
	  let i;
	  for (let i = 0; i < dropdowns.length; i++) {
		let openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
		  openDropdown.classList.remove('show');
		}
	  }
	}
  }

  /**
   * Does all the thing that "next audience" button does
   * plus it reads all session data and sends it away. 
   */
  function submit(){
	let audiencesObj = {"audience names": audList};
	let ssKeys = Object.keys(sessionStorage);
	for (let i=0; i<ssKeys.length; i++){
		let key = ssKeys[i];
		let item = JSON.parse(sessionStorage.getItem(key));
		audiencesObj[key] = item;
	}
	let surveyurl = "https://survey-d.dynata.com/survey/selfserve/53c/2203950381?audience=";

	let finObj = JSON.stringify(audiencesObj);
	location.href = surveyurl+finObj;
}

  /**
   * TO DO:
   * populate list from JSON based on country
   * change icon to audience from in progress to done https://www.flaticon.com/free-icons/progress
   * add limit to characters on audience name
   * allow to change an audience name while in preparation
   * allow to review and modify audience details
   * allow to delete audience while being prepared
   * don't allow {[]}:/\*-+=&^%$£"' in names
   * 
   * 
   */