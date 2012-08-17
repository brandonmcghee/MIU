//Brandon McGhee
//Assignment 4
//VFW

window.addEventListener("DOMContentLoaded", function () {
    
    //Search the document for an element and returns the element to 
<<<<<<< HEAD
    function $(x) {
=======
<<<<<<< HEAD
    function ge(x) {
=======
    function $(x) {
>>>>>>> origin/gh-pages
>>>>>>> origin/master
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Validation function
    function validate(e) {
        
<<<<<<< HEAD
=======
<<<<<<< HEAD
        var getSpirit = ge('spiritName');
        var getBottle = ge('slideVAL');
        var getShelve = ge('topShelve');
        var getFamily = ge('spiritFamily');
        var getDate = ge('datePurchase');
=======
>>>>>>> origin/master
        var getSpirit = $('spiritName');
        var getBottle = $('slideVAL');
        var getShelve = $('topShelve');
        var getFamily = $('spiritFamily');
        var getDate = $('datePurchase');
<<<<<<< HEAD
=======
>>>>>>> origin/gh-pages
>>>>>>> origin/master
        
        var messageAry = [];
        
        //Reset error message
        errMsg.innerHTML = "";
            getSpirit.style.border = "1px solid black";
            getBottle.style.border = "1px solid black";
            getShelve.style.border = "1px solid black";
            getFamily.style.border = "1px solid black";
            getDate.style.border = "1px solid black";
        
        //Name Validation
        if (getSpirit.value == "") {
            var nameError = "Please enter the Spirit's Name";
            getSpirit.style.border = "2px solid red";
            messageAry.push(nameError);
        }
        
        //Bottle Size Validation
        if (getBottle.value == "") {
            var bottleError = "Please select a Size of the Bottle";
            getBottle.style.border = "2px solid red";
            messageAry.push(bottleError);
        }
        
        //Shelve Quality Validation
        var radios = document.forms[0].shelve;
        if (!radios[0].checked && !radios[1].checked && !radios[2].checked) {
            var shelveError = "Please select a Shelve Quality";
<<<<<<< HEAD
            $('topShelve').style.border = "1px solid red";
            $('middleShelve').style.border = "1px solid red";
            $('bottomShelve').style.border = "1px solid red";
=======
<<<<<<< HEAD
            ge('topShelve').style.border = "1px solid red";
            ge('middleShelve').style.border = "1px solid red";
            ge('bottomShelve').style.border = "1px solid red";
=======
            $('topShelve').style.border = "1px solid red";
            $('middleShelve').style.border = "1px solid red";
            $('bottomShelve').style.border = "1px solid red";
>>>>>>> origin/gh-pages
>>>>>>> origin/master
            messageAry.push(shelveError);
        }
        
        //Family Validation
        if (getFamily.value == "---Select Spirit Family---") {
            var familyError = "Please select a Spirit Family";
            getFamily.style.border = "2px solid red";
            messageAry.push(familyError);
        }
        
        //Date Purchased Validation
        if (getDate.value == "") {
            var dateError = "Please select a Purchase Date";
            getDate.style.border = "2px solid red";
            messageAry.push(dateError);
        }
        
        //Display Errors, if any
        if (messageAry.length >= 1) {
            for (var i = 0, j = messageAry.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{
            //If its all valid
            storeData(this.key);  
        }
    
    }
    
    //Constructs the family select element filled with Family Spirits
    function buildFamily() {
        var formTag = document.getElementsByTagName("form"),
<<<<<<< HEAD
           selectDiv = $('family'),
=======
<<<<<<< HEAD
           selectDiv = ge('family'),
=======
           selectDiv = $('family'),
>>>>>>> origin/gh-pages
>>>>>>> origin/master
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "spiritFamily");
            makeSelect.setAttribute("class", "dropdown");
        for (var i = 0, j = spiritFamily.length; i < j; i++) {
            var makeOption = document.createElement('option');
            var optText = spiritFamily[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectDiv.appendChild(makeSelect);
    }
    
    //Find value of selected radio button
    function getSelectedRadio() {
        var radios = document.forms[0].shelve;
        
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                shelveValue = radios[i].value;
            }
        }
    }
    
    //Toggles "on" and "off" if form is displayed
    function toggleControls(n){
        switch(n){
            case "on":
<<<<<<< HEAD
=======
<<<<<<< HEAD
                ge('spiritForm').style.display = "none";
                ge('clear').style.display = "inline";
                ge('display').style.display = "none";
                ge('addNew').style.display = "inline";
                break;
            case "off":
                ge('spiritForm').style.display = "block";
                ge('clear').style.display = "inline";
                ge('display').style.display = "inline";
                ge('addNew').style.display = "none";
                ge('items').style.display = "none";
=======
>>>>>>> origin/master
                $('spiritForm').style.display = "none";
                $('clear').style.display = "inline";
                $('display').style.display = "none";
                $('addNew').style.display = "inline";
                break;
            case "off":
                $('spiritForm').style.display = "block";
                $('clear').style.display = "inline";
                $('display').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
<<<<<<< HEAD
=======
>>>>>>> origin/gh-pages
>>>>>>> origin/master
                break;
            default:
                return false;
        }
    }
    
    //Stores data into Local Storage
    function storeData(key) {
        //If there is no key, this means this is a brand new item and we need a new key.
        if (!key) {
            var id              = Math.floor(Math.random()*100000001);
        }else{
            //Set the id to the existing key we're editing so that it will save over the data
            //The key is the same key that's been passed along from the editSubmit event handler
            //to the validate function, and then passed here, into the storeData function.
            id = key;
        }

        //Gather all form field values and store in an object.
        //Object properties contain array with the form label and input value.
        
        //Caling Radio Function to see which one the user chose
        getSelectedRadio();
        //Stores form data into an object
        var spirit            = {};
<<<<<<< HEAD
=======
<<<<<<< HEAD
            spirit.spiritName = ["Name: ", ge('spiritName').value];
            spirit.bottleMIL  = ["Bottle Size: ", ge('slideVAL').value];
            spirit.shelve     = ["Quality: ", shelveValue];
            spirit.family     = ["Family: ", ge('spiritFamily').value];
            spirit.date       = ["Date Purchased: ", ge('datePurchase').value];
=======
>>>>>>> origin/master
            spirit.spiritName = ["Name: ", $('spiritName').value];
            spirit.bottleMIL  = ["Bottle Size: ", $('slideVAL').value];
            spirit.shelve     = ["Quality: ", shelveValue];
            spirit.family     = ["Family: ", $('spiritFamily').value];
            spirit.date       = ["Date Purchased: ", $('datePurchase').value];
<<<<<<< HEAD
=======
>>>>>>> origin/gh-pages
>>>>>>> origin/master
            
        //Save into local storage: Use stringify to convert object to a string.
        localStorage.setItem(id, JSON.stringify(spirit));
        alert("Spirit Stored!");
        toggleControls("on");
    }
    //
    function getData() {
        //Verify if local storage has items
        if (localStorage.length === 0) {
            alert("You have not stored any Spirits! So they were filled for you from JSON");
            autoFillData();
        }
        //Hides the form
        toggleControls("on");
        //Write Data from Local Storage to browser
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeList);
        document.body.appendChild(makeDiv);
<<<<<<< HEAD
        $('items').style.display = "block";
=======
<<<<<<< HEAD
        ge('items').style.display = "block";
=======
        $('items').style.display = "block";
>>>>>>> origin/gh-pages
>>>>>>> origin/master
        for (var i = 0, len=localStorage.length; i < len; i++) {
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert the string from local storage value back to and object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.family[1], makeSubList);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj [n] [0] + "  " + obj [n] [1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    
    //Get Image for Spirit
    function getImage(catName, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
        imageLi.appendChild(newImg);
    }
    
    //Auto Populate Local Storage
    function autoFillData() {
        //The actual JSON Object data required for this to work is coming from the json file
        //Store the JSON Object into Local Storage
        for (var n in json) {
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    //Constructs delete and edit links
    function makeItemLinks(key, linksLi) {
        var breakTag = document.createElement('br');
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        editLink.className = "edit";
        var editText = "Edit Spirit";
        editLink.addEventListener("click", editSpirit);
        editLink.innerHTML = editText;
        linksLi.appendChild(breakTag);
        linksLi.appendChild(editLink);
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        deleteLink.className = "delete";
        var deleteText = "Delete Spirit";
        deleteLink.addEventListener("click", deleteSpirit);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }
    
    //Function called to edit user's spirit
    function editSpirit() {
        
        var value = localStorage.getItem(this.key);
        var spirit = JSON.parse(value);
        var radios = document.forms[0].shelve;
        
        toggleControls("off");
        
<<<<<<< HEAD
=======
<<<<<<< HEAD
        ge('spiritName').value = spirit.spiritName[1];
        ge('slideVAL').value = spirit.bottleMIL[1];
        ge('spiritFamily').value = spirit.family[1];
        ge('datePurchase').value = spirit.date[1];
=======
>>>>>>> origin/master
        $('spiritName').value = spirit.spiritName[1];
        $('slideVAL').value = spirit.bottleMIL[1];
        $('spiritFamily').value = spirit.family[1];
        $('datePurchase').value = spirit.date[1];
<<<<<<< HEAD
=======
>>>>>>> origin/gh-pages
>>>>>>> origin/master
        
        for (var i = 0; i < 3; i++) {
            if (radios[i].value == "Top Shelve" && spirit.shelve[1] == "Top Shelve") {
                radios[i].setAttribute("checked", "checked");
            }else if (radios[i].value == "Middle Shelve" && spirit.shelve[1] == "Middle Shelve") {
                radios[i].setAttribute("checked", "checked");
            }else if (radios[i].value == "Bottom Shelve" && spirit.shelve[1] == "Bottom Shelve") {
                radios[i].setAttribute("checked", "checked");
            }
        
        }
        
        //Remove the initial listener from the input Store Spirit button
        save.removeEventListener("click", storeData);
        
        //Change value of submit button to edit
<<<<<<< HEAD
        $('submit').value = "Edit Spirit";
        var editSubmit = $('submit');
=======
<<<<<<< HEAD
        ge('submit').value = "Edit Spirit";
        var editSubmit = ge('submit');
=======
        $('submit').value = "Edit Spirit";
        var editSubmit = $('submit');
>>>>>>> origin/gh-pages
>>>>>>> origin/master
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    
    //Function for deleting spirit from inventory
    function deleteSpirit() {
        var ask = confirm("Are you sure you want to delete this spirit from your inventory?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Spirit has been removed");
            window.location.reload();
        }else{
            alert("Spirt was NOT removed.");
        }
    }
    
    //Clears all Stored Spirit Inventory
    function clearData() {
        var answer = confirm("Do you want to clear all the Spirits in your Inventory?");
        if (answer) {
            if (localStorage.length === 0) {
                alert("Spirit Storage is already Empty!")
            }else{
                localStorage.clear();
                alert("Spirit Storage has been Emptied")
                window.location.reload();
            }
        toggleControls("off");
        }else{
            return false;
        }
    }
    
    //Gathers current value of Slider and displays it to a text field
    function slider() {
<<<<<<< HEAD
        var slide = $('bottleMIL').value;
=======
<<<<<<< HEAD
        var slide = ge('bottleMIL').value;
=======
        var slide = $('bottleMIL').value;
>>>>>>> origin/gh-pages
>>>>>>> origin/master
        
        //Changes the value of the "Size of Bottle" text box to reflect accurate measurements
            for (var i = 0; i < mil.length; i++) {
                if (i == slide) {
<<<<<<< HEAD
                    $('slideVAL').value = mil[i];
=======
<<<<<<< HEAD
                    ge('slideVAL').value = mil[i];
=======
                    $('slideVAL').value = mil[i];
>>>>>>> origin/gh-pages
>>>>>>> origin/master
                }
            }
        
    }
    
    //Var defaults
    var shelveValue;
<<<<<<< HEAD
    var errMsg = $('errors');
=======
<<<<<<< HEAD
    var errMsg = ge('errors');
=======
    var errMsg = $('errors');
>>>>>>> origin/gh-pages
>>>>>>> origin/master
    var spiritFamily = [
                        "---Select Spirit Family---",
                        "Whiskey",
                        "Rum",
                        "Vodka",
                        "Gin",
                        "Tequila",
                        "Cognac",
                        "Brandy",
                        "Vermouth",
                        "Sake"];
    var mil = [
                "375 ml",
                "750 ml",
                "1.5 L",
                "3 L",
                "4.5 L"];
    
    //Calling buildFamily to construct drop down menu
    buildFamily();
    
    //Set Store Spirit, Display Spirits, Clear Spirits and Slider Click Events
<<<<<<< HEAD
=======
<<<<<<< HEAD
    var save = ge('submit');
    save.addEventListener("click", validate);
    
    var display = ge('display');
    display.addEventListener("click", getData);
    
    var clear = ge('clear');
    clear.addEventListener("click", clearData);
    
    var slide = ge('bottleMIL')
=======
>>>>>>> origin/master
    var save = $('submit');
    save.addEventListener("click", validate);
    
    var display = $('display');
    display.addEventListener("click", getData);
    
    var clear = $('clear');
    clear.addEventListener("click", clearData);
    
    var slide = $('bottleMIL')
<<<<<<< HEAD
=======
>>>>>>> origin/gh-pages
>>>>>>> origin/master
    slide.addEventListener("change", slider);
    
});