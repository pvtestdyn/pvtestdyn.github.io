
/**
 * prototype, work in progress.
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


class Audience{
    constructor(audID){
        this.audNumber = audID;
        this.audName = "prova";
        this.country="";
        this.ageFrom = 18;
        this.ageTo = 99; 
        this.criteriaBoxes = [];
        this.criteriaCount = 0;
        this.MAX_CRITERIA = 10;
        this.createAudienceContainer();
    }
    createAudienceContainer(){
        let content = document.querySelector("#content");

        let audBox = document.createElement('section');
        audBox.setAttribute("id","AUDIENCEBOX_"+this.audNumber);
        audBox.setAttribute("class","audienceBox");
        content.append(audBox);

        let headerAudience = document.createElement("div");
        headerAudience.setAttribute("class", "HEADERAUDIENCE");
        headerAudience.setAttribute("id", "HEADERAUDIENCE_"+this.audNumber);
        audBox.appendChild(headerAudience);

            // audience name, country, expand button
            let audNameBox = document.createElement("input");
            audNameBox.setAttribute("class", "audiencename-box");
            audNameBox.setAttribute("id", "audiencename-box_"+this.audNumber);
            audNameBox.setAttribute("aud-id",this.audNumber);
            audNameBox.setAttribute("placeholder","Audience Name");
            headerAudience.appendChild(audNameBox);

            audNameBox.addEventListener("input",function(){
                let audID = this.getAttribute("aud-id");
                let audience = main.audList[audID];
                audience.setName(this.value);
            })


            let countrySelect = document.createElement("select");
            countrySelect.setAttribute("class","country-select");
            countrySelect.setAttribute("aud-id",this.audNumber)
            countrySelect.setAttribute("id", "country-select_"+this.audNumber);
            countrySelect.innerHTML = "Country";
            headerAudience.appendChild(countrySelect);

                let cLabel = document.createElement("option");
                cLabel.setAttribute("class", "country-label");
                cLabel.setAttribute("value", "");
                cLabel.setAttribute("disabled", true);
                cLabel.setAttribute("selected", true);
                cLabel.setAttribute("hidden", true);
                cLabel.innerText = "Country";
                countrySelect.appendChild(cLabel);

                let countryList = ["UK", "France" , "Germany", "Italy", "Spain"];
                for (let i= 0 ; i < countryList.length; i++){
                    let opC = document.createElement("option");
                    opC.setAttribute("class", "country-option");
                    opC.setAttribute("id", "country-option_"+countryList[i]);
                    opC.innerText = countryList[i];
                    countrySelect.appendChild(opC);
                }
                
            countrySelect.addEventListener("input",function(){
                let audID = this.getAttribute("aud-id");
                let audience = main.audList[audID];
                audience.setCountry(this.value);
            })



            let expandBtn = document.createElement('button');
            expandBtn.setAttribute("id", "expandAudBtn_"+this.audNumber);
            expandBtn.setAttribute("class","expandBtn");
            expandBtn.setAttribute("value", this.audNumber);
            expandBtn.innerHTML = "▲";
            headerAudience.append(expandBtn);

        // inner box   aud-inner-box_"
        // inner box contains: age boxes, addcriteria button, criteria
        let innerBox = document.createElement("div");
        innerBox.setAttribute("class", "innerBox");
        innerBox.setAttribute("id", "aud-inner-box_"+this.audNumber);
        audBox.appendChild(innerBox);

            let ageFromBox = document.createElement("input");
            ageFromBox.setAttribute("class","ageBox");
            ageFromBox.setAttribute("aud-id",this.audNumber);
            ageFromBox.setAttribute("placeholder","18");
            ageFromBox.setAttribute("id","ageFromBox");
            innerBox.appendChild(ageFromBox);

            ageFromBox.addEventListener("input",function(){
                let audID = this.getAttribute("aud-id");
                let audience = main.audList[audID];
                audience.setAgeFrom(this.value);
            })

            let ageToBox = document.createElement("input");
            ageToBox.setAttribute("class","ageBox");
            ageToBox.setAttribute("aud-id",this.audNumber);
            ageToBox.setAttribute("placeholder","99");
            ageToBox.setAttribute("id","ageToBox");
            innerBox.appendChild(ageToBox);

            ageToBox.addEventListener("input",function(){
                let audID = this.getAttribute("aud-id");
                let audience = main.audList[audID];
                audience.setAgeTo(this.value);
            })

            let addCriteriaBtn = document.createElement('button');
            addCriteriaBtn.setAttribute("class","addCriteriaBtn");
            addCriteriaBtn.setAttribute("id", "add-criteria-btn_"+this.audNumber);
            addCriteriaBtn.setAttribute("value", this.audNumber);
            addCriteriaBtn.innerHTML = "Add criteria";
            innerBox.append(addCriteriaBtn);
            
            addCriteriaBtn.addEventListener("click", function(){
                let audIdx = addCriteriaBtn.value;
                let audience = main.audList[audIdx];
                let criteria = new Criteria(audience)
                audience.criteriaBoxes.push(criteria);
                audience.incrementCriteriaIdx();
            })
        
        expandBtn.addEventListener("click", function(){
            expand(innerBox, expandBtn);
        });
    }
    incrementCriteriaIdx(){
        this.criteriaCount++;
    }
    setName(text){
        this.audName = text;
    }
    setCountry(c){
        this.country = c;
    }
    setAgeFrom(n){
        this.ageFrom = n;
    }
    setAgeTo(n){
        this.ageTo = n;
    }
    getAudienceID(){
        return this.audNumber;
    }
}


/**
 * Criteria class.
 */
class Criteria{
    constructor(audience){
        this.audNumber = audience.audNumber;
        this.criNumber = audience.criteriaCount;
        this.attributeList = [];
        this.PageTrayItemsIDList = []; // ids attributes in tray
        this.PageOptionItemsIDList = []; // ids of attributes in dropdown .. maybe not needed
        this.createCriteriaContainer();
    }
    /**
     * A criteria container has:
     * - a tray where the selected attributes are stored,
     * - a button to expand the attribute list,
     * - search box,
     * - dropdown with attributes.
    */
    createCriteriaContainer(){
        let audienceContainer = document.querySelector("#aud-inner-box_"+this.audNumber);
        let criteriaBox = document.createElement('div');
        criteriaBox.setAttribute("id","CRITERIABOXaud_"+this.audNumber+"-cri_"+this.criNumber);
        criteriaBox.setAttribute("class","criteriaBox");
        // remember "any of"
        let anyOfText = "Any of:";
        if (this.criNumber>0){
            anyOfText = "and and of:"
        }
        criteriaBox.innerHTML = "<p>"+anyOfText+"</p>";
         
        /*
         * the audience expand button is displayed at this point instead of when the 
         * audience object is created because it does not to make sense to expand if 
         * there are no criteria yet.
         */
        let expandBtn = document.querySelector("#expandAudBtn_"+this.audNumber);
        expandBtn.style.display="block";
        
        // this container contains tray + expand button
        let headerCriteria = document.createElement("div");
        headerCriteria.setAttribute("class", "HEADERCRITERIA");
        headerCriteria.setAttribute("id", "HEADERCRITERIA-aud_"+this.audNumber+"-cri_"+this.criNumber);
        criteriaBox.appendChild(headerCriteria);

            // create tray
            let tray = document.createElement("div");
            tray.setAttribute("class", "tray");
            tray.setAttribute("aud-id",this.audNumber);
            tray.setAttribute("cri-id",this.criNumber);
            tray.setAttribute("id","TRAY-aud_"+this.audNumber+"-cri_"+this.criNumber);
            headerCriteria.appendChild(tray);

            // create expand button for attribute list 
            let expandBtnAttributes = document.createElement('button');
            expandBtnAttributes.setAttribute("class","expand-attributes-btn");
            expandBtnAttributes.setAttribute("id", "expand-attributes-btn_aud-"+this.audNumber+"-cri_"+this.criNumber);
            // expandBtnAttributes.setAttribute("Value", this.audNumber+"-"+this.criNumber);
            expandBtnAttributes.innerHTML = "▲";
            headerCriteria.append(expandBtnAttributes);

        // this container contains search button and list.
        let contentCriteria = document.createElement("div");
        contentCriteria.setAttribute("class", "CONTENTCRITERIA");
        contentCriteria.setAttribute("id", "CONTENTCRITERIA-aud_"+this.audNumber+"-cri_"+this.criNumber);
        criteriaBox.appendChild(contentCriteria);

            // create search field
            let searchBox = document.createElement("input");
            searchBox.setAttribute("class", "search-attribute-box");
            searchBox.setAttribute("id","search-attributes-box_aud-"+this.audNumber+"-cri_"+this.criNumber)
            searchBox.setAttribute("placeholder","Start typing...")
            contentCriteria.appendChild(searchBox);

            // create attribute list
            let selectItem = document.createElement('select');
            selectItem.setAttribute("multiple",true);
            selectItem.setAttribute("class", "attributeSelectItem");
            selectItem.setAttribute("id","select-attributes_aud-"+this.audNumber+"-cri_"+this.criNumber)
            contentCriteria.append(selectItem);


            for (let i = 0; i < attributesFromFile.length; i++){
                let attr = attributesFromFile[i];

              

                
                let op = document.createElement("option");
                
                let opID = "aud_"+this.audNumber+"-cri_"+this.criNumber+"-attr"+attr["key"];
                op.setAttribute("class","attribute");
                op.setAttribute("key", attr["key"]);
                op.setAttribute("id", opID);
                    

                let p = document.createElement("p");
                p.setAttribute("class","attributeP");
                op.appendChild(p);

                let spanQ = document.createElement("span");
                spanQ.setAttribute("class","parameter-name");
                spanQ.innerHTML = attr["paramname"]+": ";
                p.appendChild(spanQ);

                let spanA = document.createElement("span");
                spanA.setAttribute("class","answer-text");
                spanA.innerHTML = attr["answertext"];
                p.appendChild(spanA);


                selectItem.appendChild(op);

   
      
                        
                
            }
                
           
           
        selectItem.addEventListener("change", function(){
            selectAttribute(selectItem, tray);
        });


        expandBtnAttributes.addEventListener("click", function(){
            expand(contentCriteria, expandBtnAttributes);
        });

        searchBox.addEventListener("keyup", function(){
            searchbox(searchBox, selectItem);
        })
        
        audienceContainer.append(criteriaBox);
    }

    /**
     * Removes item from attributeList.
     * @param {*} item item to remove.
     */
    removeAttributeFromList(item){
        let l = this.attributeList;
        l.splice(l.indexOf(item), 1);
    }
}


/**
 * Add selection event listener to the attribute list.
 * On attribute selection, add it to tray and store it in attribute list.
 * @param {*} selectElem 
 * @param {*} tray 
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
 * @param {*} input search box related to the attribute list
 * @param {*} sel <select> element contaning the attributes
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