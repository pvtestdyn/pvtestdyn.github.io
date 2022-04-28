
/**
 * prototype, work in progress.
 * Contains all aiudiences craeted.
 */
class Main{
    constructor(){
        this.MAX_AUDIENCES = 10;
        this.audienceIndex = 0;
        this.audList = [];
    }
    newAudience(){
        if(this.audienceIndex==0){
            document.querySelector("#submit").style.display="inline-block";
        }
        let audience = new Audience(this.audienceIndex);
        this.audList.push(audience);
        this.audienceIndex++;
    }
}
const main = new Main();

const buildBtn = document.querySelector("#build");
buildBtn.addEventListener("click", function(){
    main.newAudience();
});

/**
 * Adds selection to the attributes list (tray) on top of the criteria box.
 * On attribute selection, add it to tray and store it in attribute list.
 * @param {HTMLSelectElement} selectElem attribute selected from the drowpown menu. 
 * @param {HTMLDivElement} tray container with selected attributes.
 */
function selectAttribute(selectElem, tray) {
    let option = selectElem.options[selectElem.selectedIndex];

    let audID = tray.attributes["aud-id"].value;
    let criID = tray.attributes["cri-id"].value;
    let audience = main.audList[audID];
    let criteria = audience.criteriaBoxes[criID];
    let attrID = option.attributes["key"].value;

   
    // remove from list
    option.style.display = 'none';
    
    // add it to tray
    let toAdd = document.createElement('div');
    toAdd.setAttribute("class","attr-in-tray");
    toAdd.setAttribute("aud-id", audID);
    toAdd.setAttribute("cri-id", criID);
    toAdd.setAttribute("attr-id",attrID);
    toAdd.setAttribute("id","attr-in-tray-aud_"+audID+"-cri_"+criID+"-attr_"+attrID);
    let p = document.createElement('p');
    p.innerHTML = option.text;
    p.style.display="inline-block";
    toAdd.appendChild(p);

    let deleteAttrBtn = document.createElement("button");
    deleteAttrBtn.setAttribute("class","delete-attr-btn");
    deleteAttrBtn.setAttribute("aud-id", audID);
    deleteAttrBtn.setAttribute("cri-id", criID);
    deleteAttrBtn.setAttribute("attr-id",attrID);
    deleteAttrBtn.innerText="x";
    deleteAttrBtn.style.display="inline-block";
    toAdd.appendChild(deleteAttrBtn);

    tray.appendChild(toAdd);
    toAdd.style.display="inline-block";

    // add it to the criteria object
    criteria.attributeList.push(attrID);


    deleteAttrBtn.addEventListener("click", function(){
        deleteFromTray(deleteAttrBtn);
    })
}

/**
 * Accordion effect. Expand or retract on click.
 * @param {HTMLDivElement} elem an element to expand, like the audience or criteria box.
 * @param {HTMLButtonElement} button accordion button.
 */
function expand(elem, button) {
    if (button.innerHTML === "▲"){
        elem.style.display = "none";
        button.innerHTML = "▼";
    } 
    else {
      elem.style.display = "block";
      button.innerHTML = "▲";
    }
  }

/**
 * Searches attribute list.
 * @param {HTMLInputElement} input search box related to the attribute list
 * @param {HTMLSelectElement} sel <select> element contaning the attributes
 */
  function searchbox(input, sel) {
    let filter, i, txtValue;
    // input = document.getElementById("searchboxInput");
    filter = input.value.toUpperCase();
    // sel = document.getElementById("attributeList");
    op = sel.getElementsByTagName("option");
    for (let i = 0; i < op.length; i++) {
        txtValue = op[i].textContent || op[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            op[i].style.display = "";
        } else {
            op[i].style.display = "none";
        }
    }
}


function deleteFromTray(btn){
    let audID = btn.attributes["aud-id"].value;
    let criID = btn.attributes["cri-id"].value;
    let attrID = btn.attributes["attr-id"].value;
    let audience = main.audList[audID];
    let criteria = audience.criteriaBoxes[criID];
    let itemOnPage = document.querySelector("#attr-in-tray-aud_"+audID+"-cri_"+criID+"-attr_"+attrID);
    itemOnPage.remove();
    criteria.removeAttributeFromList(attrID);

    // make the option reappear in the dropdown list
    let op = document.querySelector("#"+"aud_"+audID+"-cri_"+criID+"-attr"+attrID)
    op.style.display = 'block';
}


function submit(){
    let surveyurl = "https://survey-d.dynata.com/survey/selfserve/53c/2204320?debug=respview&audience=";
    let finObj = JSON.stringify(main);
    location.href = surveyurl+finObj;

}

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", submit);