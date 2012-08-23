//Brandon McGhee
//MIU Week 4

$('#home').on('pageinit', function(){

             $('#middleshelve').attr('checked', true);
             $('#fifth').attr('checked', true); 

});

$('#search').on('pageinit', function(){
    function searchInput() {
        if ($('#searchField').val() == "") {
            $('#searchResults').innerHTML = "";
        }
    }
                
var search = function() {
                var getInput = $('#searchField').val();
                var getCategory = $('#category').val();
                var error = true;
                var match;
        
                if (getInput == "") {
                    alert("Please input a search term");
                    return;
                }
        
		$('#searchResults').html("");
	
	
                var getUL = $('#searchResults');
		
                for (var i = 0, len=localStorage.length; i < len; i++) {
                    var makeList = document.createElement('li');
                    
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
		    getUL.append(makeList);
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
                
                    $('#searchResults').listview("refresh");
            }


    
                $('#searchField').on('click', function() {
                                searchInput()
                });
                
                $('#searchButton').on('click', function() {
                                search()
                });
});

$('#browse').on('pageinit', function() {
                
$('#inventory').listview("refresh");
		
var autofillData = function (){
        //The actual JSON Object data required for this to work is coming from the json file
        //Store the JSON Object into Local Storage
        for (var n in json) {
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));

        }
        
            alert("Inventory has been filled with default JSON data!")
                        window.location.reload();
};
 
       //Inventory Function that will fill the Home page search list
    var inventory = function() {
        //Verify if local storage has items
        if (localStorage.length === 0) {
            alert("You have not stored any Spirits!");
            $('#jsonFill').css("display", "block");
            $('#delete').css("display", "block");
        }
        //Write Data from Local Storage to browser

        var getUL = $('#inventory');

        for (var i = 0, len=localStorage.length; i < len; i++) {
            var makeList = document.createElement('li');
            getUL.append(makeList);
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

            makeItemLinks(localStorage.key(i), linksLi);
            makeList.appendChild(linksLi);
        }


    };
    
var clearStorage = function(){
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
};

                $('#delete').on('click', function() {
                                clearStorage();
                });
                
                inventory();
                
                $('#jsonFill').on('click', function() {
                                autofillData();
                });
                
});

$('#add').on('pageinit', function(){
                
        $('#quantity').slider("refresh");
        $('#spiritname').val("Enter name of spirit");

        
        $('#spiritname').on('click', function() {
                $('#spiritname').val("");
        });
        
		var myForm = $('#addspiritform');
                var errorlink = $('#errorlink')
                
                
		    myForm.validate({
                                ignore: '.ignoreValidation',
			invalidHandler: function(form, validator) {
                                
                                errorlink.click();
                                var html = '';
                                for (var key in validator.submitted) {
                                                var label = $('label[for^="' + key + '"]').not('[generated]');
                                                var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                                                var fieldName = legend.length ? legend.text() : label.text();
                                                html += '<li>' + fieldName + '</li>';
                                };
                                $('#errors ul').html(html);
                                
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData();
		}
	});
        
    var todaysDate = function() {
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

        today = year + "-" + month + "-" + day;
        $('#date').val(today);
        
    };
                todaysDate();
                
                
                $('#reset').on('click', function() {
                                //resetForm();
                                window.location.reload('#add');
                });
                
                var resetForm = function() {
                                $('#spiritname').val('');
                                $('#quantity').val(1);
                                $('#family').val('');
                                todaysDate();
                                $('#topshelve').attr('checked', false); 
                                $('#middleshelve').attr('checked', true);
                                $('#bottomshelve').attr('checked', false); 
                                $('#fifth').attr('checked', true);
                }
                

                
});

$('#news').on('pageinit', function(){
                
var newsResults = function() {
        var array = new Array();
	var topArray = new Array();
        var list = $('#newsList');
        
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            
                array.push(obj.family[1]);
                array.sort();
        }
	
	for (var i = 0; i < array.length - 1; i++) {
	    if (array[i + 1] != array[i]) {
		topArray.push(array[i]);
	    }
	}

        for (var i = 0, len = array.length; i < len; i++) {
                var li = document.createElement('li');
                var data = topArray[i];
                li.innerHTML = data;
                list.append(li);
        }
};
                newsResults();

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

                function getImage(catName, makeSubList) {
                                var imageLi = document.createElement('p');
                                makeSubList.appendChild(imageLi);
                                var newImg = document.createElement('img');
                                var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
                                imageLi.appendChild(newImg);
                };
                
                var shelveValue;

var autofillData = function (){
        //The actual JSON Object data required for this to work is coming from the json file
        //Store the JSON Object into Local Storage
        for (var n in json) {
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));

        }
window.location.reload();
};

    //Constructs delete and edit links
    function makeItemLinks(key, linksLi) {
        var breakTag = document.createElement('br');
        var editLink = document.createElement('a');
        editLink.setAttribute("data-role", "button");
        editLink.setAttribute("data-theme", "e");
        editLink.setAttribute("data-icon", "gear");
        editLink.setAttribute("id", "editLink");
        editLink.href = "#add";
        editLink.key = key;
        var editText = "Edit";
        editLink.addEventListener("click", editSpirit);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        linksLi.appendChild(breakTag);
        var deleteLink = document.createElement('a');
        deleteLink.setAttribute("data-role", "button");
        deleteLink.setAttribute("data-theme", "c");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Spirit";
        deleteLink.addEventListener("click", deleteSpirit);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
        $('#inventory').listview("refresh");
    };
    
    //Function called to edit user's spirit
    function editSpirit() {
        var value = localStorage.getItem(this.key);
        var spirit = JSON.parse(value);
        
        $('#spiritname').val(spirit.spiritName[1]);
        $('#quantity').val(spirit.quantity[1]);
        $('#family').val(spirit.family[1]);
        $('#date').val(spirit.date[1]); 
        
                switch (spirit.shelve[1]) {
                                case "Top Shelve":
                                                $('#topshelve').attr('checked', true);
                                                break;
                                case "Middle Shelve":
                                                $('#middleshelve').attr('checked', true);
                                                break;
                                case "Bottom Shelve":
                                                $('#bottomshelve').attr('checked', true);
                                                break;
                                default:
                                               alert("no quality");
                }
                
                switch (spirit.bottleMIL[1]) {
                                case "Mini (50 ML)":
                                                $('#mini').attr('checked', true);
                                                break;
                                case "Half Pint (200 ML)":
                                                $('#halfpint').attr('checked', true);
                                                break;
                                case "Pint (375 ML)":
                                                $('#pint').attr('checked', true);
                                                break;
                                case "Fifth (750 ML)":
                                                $('#fifth').attr('checked', true);
                                                break;
                                case "Liter (1000 ML)":
                                                $('#liter').attr('checked', true);
                                                break;
                                case "Magnum (1500 ML)":
                                                $('#magnum').attr('checked', true);
                                                break;
                                case "Half Gallon (1750 ML)":
                                                $('#halfgallon').attr('checked', true);
                                                break;
                                case "Double Magnum (3000 ML)":
                                                $('#doublemagnum').attr('checked', true);
                                                break;
                                default:
                                               alert("Error: No Bottle Size could be listed"); 
                }
        
        
        //Change value of submit button to edit
        $('#submit').val("Edit Spirit");
        var editSubmit = $('#submit');
        editSubmit.on('click', function() {
                                myForm.validate();
                });
        editSubmit.key = this.key;
        

    }

var deleteSpirit = function (){
        var ask = confirm("Are you sure you want to delete this spirit from your inventory?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert("Spirit has been removed");
            window.location.reload();
        }else{
            alert("Spirt was NOT removed.");
        }		
};

var storeData = function(key){
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
        
        //Stores form data into an object
        var spirit            = {};
            spirit.spiritName = ["Name: ", $('#spiritname').val()];
            spirit.quantity   = ["Quantity: ", $('#quantity').val()];
            spirit.bottleMIL  = ["Bottle Size: ", $('input:radio[name=size]:checked').val()];
            spirit.shelve     = ["Quality: ", $('input:radio[name=shelve]:checked').val()];
            spirit.family     = ["Family: ", $('#family').val()];
            spirit.date       = ["Date Purchased: ", $('#date').val()];
            
        //Save into local storage: Use stringify to convert object to a string.
        localStorage.setItem(id, JSON.stringify(spirit));
        alert("Spirit Stored!");
};



					




