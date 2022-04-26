

class Main{
    constructor(){
        this.MAX_AUDIENCES = 10;
        this.audienceIndex = 0;
        this.audList = [];
    }
    newAudience(){
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
            audNameBox.setAttribute("placeholder","Audience Name");
            headerAudience.appendChild(audNameBox);

            let countryBtn = document.createElement("button");
            countryBtn.setAttribute("class","country-btn");
            countryBtn.setAttribute("id", "country-btn_"+this.audNumber);
            countryBtn.innerHTML = "Country";
            headerAudience.appendChild(countryBtn);

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
            ageFromBox.setAttribute("placeholder","18");
            ageFromBox.setAttribute("id","ageFromBox");
            innerBox.appendChild(ageFromBox);

            let ageToBox = document.createElement("input");
            ageToBox.setAttribute("class","ageBox");
            ageToBox.setAttribute("placeholder","99");
            ageToBox.setAttribute("id","ageToBox");
            innerBox.appendChild(ageToBox);

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
                audience.incrementCriteriaIdx();
            })
        
        expandBtn.addEventListener("click", function(){
            expand(innerBox, expandBtn);
        });
    }
    incrementCriteriaIdx(){
        this.criteriaCount++;
    }
}

class Criteria{
    constructor(audience){
        this.audNumber = audience.audNumber;
        this.criNumber = audience.criteriaCount;
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
        criteriaBox.innerHTML = "<p>"+"CRITERIABOX-aud_"+this.audNumber+"-cri_"+this.criNumber+"</p>";
         
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

            // populate the attribute list
            selectItem.innerHTML = `
            <optionclass="attribute">mela</option>
            <option class="attribute">prova1</option>
            <option class="attribute">banana</option>
            <option class="attribute">prova2</option>
            <option class="attribute">mela</option>
            <option class="attribute">pera</option>
            <option class="attribute">prova1</option>
            <option class="attribute">banana</option>
            <option class="attribute">prova2</option>
            <option class="attribute">mela</option>
            <option class="attribute">pera</option>
            <option class="attribute">prova1</option>
            <option class="attribute">banana</option>
            <option class="attribute">prova2</option>
            <option class="attribute">mela</option>
            <option class="attribute">pera</option>
            <option class="attribute">prova1</option>
            <option class="attribute">banana</option>
            <option class="attribute">prova2</option>
            <option class="attribute">mela</option>
            <option class="attribute">pera</option>
            <option class="attribute">prova1</option>
            <option class="attribute">banana</option>
            <option class="attribute">prova2</option>
            <option class="attribute">mela</option>
            <option class="attribute">pera</option>
            <option class="attribute">prova1</option>
            <option class="attribute">banana</option>
            <option class="attribute">prova2</option>
            <option class="attribute">mela</option>
            <option class="attribute">pera</option>

            `

        // add selection event listener to the attribute list
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
}


function selectAttribute(selectElem, tray) {
    let option = selectElem.options[selectElem.selectedIndex];
    option.style.display = 'none';
    let toAdd = document.createElement('p');
    toAdd.innerHTML = option.text;
    tray.appendChild(toAdd);
    toAdd.style.display="inline-block";
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




// function createCriteriaContainer(audIdx){
//     let audience = main.audList[audIdx];
//     let critIdx = audience.criteriaCount;
//     let audienceContainer = document.querySelector("#aud-inner-box_"+audIdx);
//     let criteriaBox = document.createElement('div');
//     criteriaBox.setAttribute("id","criteria_"+critIdx);
//     criteriaBox.innerHTML = "criteria "+critIdx;
//     audienceContainer.append(criteriaBox);
//     audience.incrementCriteriaIdx();
//     let expandBtn = document.querySelector("#expandAudBtn_"+audIdx);
//     expandBtn.style.display="block";
// }



// function expand(elem, button) {
    

//   if (elem.style.display == "" || elem.style.display == "none") {
//     elem.style.display = "block";
//     button.innerHTML = "▼";
//   } else {
//     elem.style.display = "none";
//     button.innerHTML = "▲";;
//   }
  
// }

// function expand(elem, button) {

//     if (elem.className == "open") {
//       elem.className = "";
//     button.innerHTML = "▼";
//   } else {
//    elem.className = "open";
//     button.innerHTML = "▲";//"Show less";
//   }
  
// }







// function selection() {
//     var select = document.getElementById('attributeList');
//     var option = select.options[select.selectedIndex];
//     console.log(option.value);
//     console.log(option.text);
//     option.style.display = 'none';
//     let el = document.createElement('p');
//     el.innerHTML = option.text;
//     let b = document.getElementById("tray");
//     b.appendChild(el);
//     el.style.display="inline-block";
// }

// function toggle(el){
//     let attrList = document.getElementById(el);
//     let state = attrList.style.display;
//     if(state == 'none' || state == '')
//         attrList.style.display="block";
//     else
//         attrList.style.display="none";

// }

// function toggleAttributes(){
//     toggle("attributeList");
//     toggle("searchboxInput");
// }

