// 	Request the Json File
var request = new XMLHttpRequest();

request.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) {
		request.onload = function() {
			const objText = request.response;
			const obj = JSON.parse(objText);

			showList(obj);
		}
	}
};
request.open("GET", "mails.json", true);
request.send();

// Show Json List
function showList(jsonObj) {
	const list = jsonObj.list;

	//Alphabetic sort the object array from json
	list.sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		
		let comparison = 0;
		if(nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}
		return comparison;	
	});		
	
	const myTable = document.querySelector("table");
	const tbody = document.getElementsByTagName("tbody")[0];
	
	for (let i = 0; i < list.length; i++){		

		// Create table elements (tr, td)
		const myTr = document.createElement("tr");
		const myTdName = document.createElement("td");
		const myTdEmail = document.createElement("td");

		//Create text nodes for name and email 
		const namenode = document.createTextNode(list[i].name);
		const mailnode = document.createTextNode(list[i].email);
		
		myTdName.appendChild(namenode);
		myTdEmail.appendChild(mailnode);
		
		myTr.appendChild(myTdName);
		myTr.appendChild(myTdEmail);
		tbody.appendChild(myTr);

	};
	
	myTable.appendChild(tbody);
};

//Search name or email from table
$(document).ready(function() {
	$("#myInput").on("keyup", function() {
		const value = $(this).val().toUpperCase(); 

		$("tr").filter(function(){
			$(this).toggle($(this).text().toUpperCase().indexOf(value) > -1)
		});
	});
});
