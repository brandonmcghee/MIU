//Brandon McGhee
//MIU Week 3 Bronze Javascript

window.addEventListener("DOMContentLoaded", function () {
    
    //Search the document for an element and returns the element to 
    function ge(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Validation function
    function validate(e) {
        var getSpirit = ge('spiritname');
        var getSize = ge('size');
        var getShelve = ge('topshelve');
        var getFamily = ge('family');
        var getDate = ge('date');

        var messageAry = [];
        //Reset error message
        errMsg.innerHTML = "";
            //getSpirit.style.border = "1px solid black";
            //getSize.style.border = "1px solid black";
            //getShelve.style.border = "1px solid black";
            //getFamily.style.border = "1px solid black";
            //getDate.style.border = "1px solid black";
        //Name Validation
        if (getSpirit.value == "" || getSpirit.value == "Enter the name of the spirit") {
            var nameError = "Please enter the Spirit's Name";
            getSpirit.style.border = "2px solid red";
            messageAry.push(nameError);
        }
        //Bottle Size Validation
        var radios = document.forms[0].size;
        if (!radios[0].checked && !radios[1].checked && !radios[2].checked && !radios[3].checked && !radios[4].checked && !radios[5].checked && !radios[6].checked && !radios[7].checked) {
            var sizeError = "Please select a Size of the Bottle";
            ge('mini').style.border = "1px solid red";
            ge('halfpint').style.border = "1px solid red";
            ge('pint').style.border = "1px solid red";
            ge('fifth').style.border = "1px solid red";
            ge('liter').style.border = "1px solid red";
            ge('magnum').style.border = "1px solid red";
            ge('halfgallon').style.border = "1px solid red";
            ge('doublemagnum').style.border = "1px solid red";
            messageAry.push(sizeError);
        }

        //Shelve Quality Validation
        var radios = document.forms[0].shelve;
        if (!radios[0].checked && !radios[1].checked && !radios[2].checked) {
            var shelveError = "Please select a Shelve Quality";
            ge('topshelve').style.border = "1px solid red";
            ge('middleshelve').style.border = "1px solid red";
            ge('bottomshelve').style.border = "1px solid red";
            messageAry.push(shelveError);
        }

        //Family Validation
        if (getFamily.value == "placeholder") {
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
    
    //Find value of selected radio button
    function getSelectedRadio() {
        var radios = document.forms[0].shelve;
        
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                shelveValue = radios[i].value;
            }
        }
    }
    
        //Find value of selected radio button
    function getSelectedSize() {
        var radios = document.forms[0].size;
        
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                bottleMILval = radios[i].value;
            }
        }
    }
    
    //Toggles "on" and "off" if form is displayed
    function toggleControls(n){
        switch(n){
            case "on":
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
        getSelectedSize()

        //Stores form data into an object
        var spirit            = {};
            spirit.spiritName = ["Name: ", ge('spiritname').value];
            spirit.quantity   = ["Quantity: ", ge('quantity').value];
            spirit.bottleMIL  = ["Bottle Size: ", bottleMILval];
            spirit.shelve     = ["Quality: ", shelveValue];
            spirit.family     = ["Family: ", ge('family').value];
            spirit.date       = ["Date Purchased: ", ge('date').value];
            
        //Save into local storage: Use stringify to convert object to a string.
        localStorage.setItem(id, JSON.stringify(spirit));
        alert("Spirit Stored!");
        toggleControls("on");
    }
    //
    function getData() {
        //Verify if local storage has items
        if (localStorage.length === 0) {
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
        ge('items').style.display = "block";
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
    
    //Inventory Function that will fill the Home page search list
    function inventory() {
        //Verify if local storage has items
        if (localStorage.length === 0) {
            alert("You have not stored any Spirits!");
            ge('jsonFill').style.display="block";
            ge('delete').style.display="none";
        }
        //Write Data from Local Storage to browser

        var getUL = ge('inventory');

        for (var i = 0, len=localStorage.length; i < len; i++) {
            var makeList = document.createElement('li');
            getUL.appendChild(makeList);
            var makeli = document.createElement('p');
            var linksLi = document.createElement('p');
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert the string from local storage value back to and object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('p');
            makeList.appendChild(makeSubList);
            getImage(obj.family[1], makeSubList);
            for (var n in obj) {
                var makeSubli = document.createElement('p');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj [n] [0] + obj [n] [1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(makeSubli);
            }
        }
    }
    
    function search() {
        var getInput = ge('searchField').value;
        var getCategory = ge('category').value;
        var error = true;
        var match;
        
        if (getInput == "") {
            alert("Please input a search term");
            return;
        }
        
        var getUL = ge('searchResults');
        for (var i = 0, len=localStorage.length; i < len; i++) {
            var makeList = document.createElement('li');
            getUL.appendChild(makeList);
            var makeli = document.createElement('p');
            var linksLi = document.createElement('p');
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert the string from local storage value back to and object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('p');

            
            switch(getCategory) {
                case "name":
                    match = obj.spiritName [1];
                    break;
                case "quantity":
                    match = obj.quantity [1];
                    break;
                case "quality":
                    match = obj.shelve [1];
                    break;
                case "family":
                    match = obj.family [1];
                    break;
                case "date":
                    match = obj.date [1];
                    break;
                case "size":
                    match = obj.bottleMIL [1];
                    break;
                default:
                    break;
            }
            
            if (getInput == match) {
                makeList.appendChild(makeSubList);
                getImage(obj.family[1], makeSubList);
                for (var n in obj) {
                    var makeSubli = document.createElement('p');
                    makeSubList.appendChild(makeSubli);
                    var optSubText = obj [n] [0] + obj [n] [1];
                    makeSubli.innerHTML = optSubText;
                    makeSubList.appendChild(makeSubli);
                }
                error = false;
            }
        }
        
        if (error == true) {
            alert("No Results Found");
        }
    }
    
    function newsResults() {
        var array = new Array();
        var list = ge('newsList');
        
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            
                array.push(obj.family[1]);
                array.sort();
        }
        
        for (var i = 0, len = localStorage.length; i < len; i++) {
                var li = document.createElement('li');
                var data = array[i];
                li.innerHTML = data;
                list.appendChild(li);
        }
    }
    
    //Get Image for Spirit
    function getImage(catName, makeSubList) {
        var imageLi = document.createElement('p');
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
            alert("Your Inventory has been filled with JSON Data, enjoy!")
            window.location.reload('index.html#home');
            $('#inventory').listview.refresh();
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
        alert("edit spirit");
        var value = localStorage.getItem(this.key);
        var spirit = JSON.parse(value);
        var shelveRadio = document.forms[0].shelve;
        var sizeRadio = document.forms[0].size;
        
        alert("after var declrations");
        toggleControls("off");
        
        alert("after toggle controls");
        ge('spiritname').value = spirit.spiritName[1];
        ge('sliderVAL').value = spirit.quantity[1]
        ge('family').value = spirit.family[1];
        ge('date').value = spirit.date[1];
        
        
        for (var i = 0; i < shelveRadio.length; i++) {
            if (shelveRadio[i].value == "Top Shelve" && spirit.shelve[1] == "Top Shelve") {
                shelveRadio[i].setAttribute("checked", "checked");
            }else if (shelveRadio[i].value == "Middle Shelve" && spirit.shelve[1] == "Middle Shelve") {
                shelveRadio[i].setAttribute("checked", "checked");
            }else if (shelveRadio[i].value == "Bottom Shelve" && spirit.shelve[1] == "Bottom Shelve") {
                shelveRadio[i].setAttribute("checked", "checked");
            }
        
        }

        for (var i = 0; i < sizeRadio.length; i++) {
            if (sizeRadio[i].value == "Mini (50 ML)" && spirit.bottleMIL[1] == "Mini (50 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }else if (sizeRadio[i].value == "Half Pint (200 ML)" && spirit.bottleMIL[1] == "Half Pint (200 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }else if (sizeRadio[i].value == "Pint (375 ML)" && spirit.bottleMIL[1] == "Pint (375 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }else if (sizeRadio[i].value == "Fifth (750 ML)" && spirit.bottleMIL[1] == "Fifth (750 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }else if (sizeRadio[i].value == "Liter (1000 ML)" && spirit.bottleMIL[1] == "Liter (1000 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }else if (sizeRadio[i].value == "Magnum (1500 ML)" && spirit.bottleMIL[1] == "Magnum (1500 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }else if (sizeRadio[i].value == "Half Gallon (1750 ML)" && spirit.bottleMIL[1] == "Half Gallon (1750 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }else if (sizeRadio[i].value == "Double Magnum (3000 ML)" && spirit.bottleMIL[1] == "Double Magnum (3000 ML)") {
                sizeRadio[i].setAttribute("checked", "checked");
            }
        
        }
        //Remove the initial listener from the input Store Spirit button
        save.removeEventListener("click", storeData);
        alert("after remove listener");
        //Change value of submit button to edit
        ge('submit').value = "Edit Spirit";
        alert("after edit spirit sumbt");
        var editSubmit = ge('submit');
        editSubmit.addEventListener("click", validate);
        alert("after add listener");
        editSubmit.key = this.key;
        alert("after key assignment");
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
        var s = ge('quantity').value;
        ge('sliderVAL').value = s;
    }
    
    function todaysDate() {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        
        if (day < 10) {
            day = day + "0";
        }
        
        if (month < 10) {
            month = "0" + month;
        }

        today = month + "/" + day + "/" + year;
        
        ge('date').value = today;
        
    }
    
    function nameFocus() {
        ge('spiritname').value = "";
    }
    
    function dateFocus() {
        ge('date').value = "";
    }
    
    function searchInput() {
        if (ge('searchField').value == "") {
            ge('searchResults').innerHTML = "";
        }
    }
    
    function resetForm() {
        //Reset form to default values
        //Example of Bad Design, reloading the form and not filling with default data, thats why it is in the Bronze App
        window.location.reload();
    }
    
    //Var defaults
    var shelveValue;
    var errMsg = ge('errors');
    
    var title = document.getElementsByTagName("title")[0].innerHTML
    if (title == "Add Item") {
        
        //Set Store Spirit, Display Spirits, Clear Spirits and Slider Click Events
        
        var save = ge('submit');
        save.addEventListener("click", validate);
        
        var display = ge('display');
        display.addEventListener("click", getData);
    
        var clear = ge('clear');
        clear.addEventListener("click", clearData);
    
        var slide = ge('quantity')
        slide.addEventListener("change", slider);
        
        var reset = ge('reset');
        reset.addEventListener("click", resetForm);
        
        var dateClear = ge('date');
        dateClear.addEventListener("click", dateFocus);
        
        var nameClear = ge('spiritname');
        nameClear.addEventListener("click", nameFocus);
        
        ge('pint').setAttribute("checked", "checked");
        
        ge('topshelve').setAttribute("checked", "checked");
    
        
    }

    var homeTitle = document.getElementsByTagName("title")[0].innerHTML
    if (title == "Spirit Tracker: Keep Track of your personal adult beverage inventory") {
        var JSONfill = ge('jsonFill');
        JSONfill.addEventListener("click",
                                         function() {
                                         autoFillData();   
                                         }, false);
    
        var deleteInventory = ge('delete');
        deleteInventory.addEventListener("click",
                                         function() {
                                         clearData();   
                                         }, false);
        
        var searchEmpty = ge('searchField');
        searchEmpty.addEventListener("focus", function() {
                                            searchInput()
                                            }, false);
        
        var searchButton = ge('searchButton');
        searchButton.addEventListener("click",
                                         function() {
                                         search();   
                                         }, false);
        
        window.addEventListener("load",
                                function() {
                                    inventory();
                                    newsResults();
                                }, false);
    }

    
    
    

});