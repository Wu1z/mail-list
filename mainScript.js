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
request.open("GET", "emails.json", true);
request.send();

//	Alphabetic sort 
function compare(a, b) {	
	const nameA = a.name.toUpperCase();
	const nameB = b.name.toUpperCase();
	
	let comparison = 0;
	if(nameA > nameB) {
		comparison = 1;
	} else if (nameA < nameB) {
		comparison = -1;
	}
	return comparison;
}

// 	Show Json List and create tags for the table
function showList(jsonObj) {
	const list = jsonObj.list;
	list.sort(compare);		//Alphabetic sort the object array from json
	
	for (let i = 0; i < list.length; i++){	
		const table = document.querySelector("table");
		const myTr = document.createElement("tr");
		const myTdName = document.createElement("td");
		const myTdEmail = document.createElement("td");
		
		myTdName.textContent = list[i].name;
		myTdEmail.textContent = list[i].email;
		
		myTr.appendChild(myTdName);
		myTr.appendChild(myTdEmail);
		table.appendChild(myTr);
	}
}

// Search Input by Name
function searchName() {
	let input, tr, td, filter, txtValue, table;
	
	input = document.getElementById("inputName");
	filter = input.value.toUpperCase();
	
	table = document.getElementById("listTable");
	tr = table.getElementsByTagName("tr");
	
	for(let i = 0; i < tr.length; i++){
		td = tr[i].getElementsByTagName("td")[0];
		
		if(td){
			txtValue = td.textContent || td.innerText;
			
			if(txtValue.toUpperCase().indexOf(filter) > -1){
				tr[i].style.display = "";
			} else { 
				tr[i].style.display = "none"
			}
		}
	}
}

//	Search Input by Mail
function searchMail() {
	let input, tr, td, filter, txtValue, table;

	input = document.getElementById("inputMail");
	filter = input.value.toUpperCase();

	table = document.getElementById("listTable");
	tr = table.getElementsByTagName("tr");

	for(let i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[1];

		if(td) {
			txtValue = td.TextContent || td.innerText;

			if(txtValue.toUpperCase().indexOf(filter) > -1){
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none"
			}
		}
	}
}

