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