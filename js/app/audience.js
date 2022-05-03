/**
 * Audience class
 * 
 */
class Audience{
    constructor(audID){
        this.audNumber = audID;
        this.audName = "";
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

        let audBox = document.createElement('div');
        audBox.setAttribute("id","AUDIENCEBOX_"+this.audNumber);
        audBox.setAttribute("class","audienceBox container-md border");
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
        expandBtn.setAttribute("class","expandBtn arrow left");
        expandBtn.setAttribute("value", this.audNumber);
        // expandBtn.innerHTML = "▲";
        headerAudience.append(expandBtn);
        // audBox.append(expandBtn);

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
            expand(innerBox, this);
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