changeStatusColor();
function changeStatusColor() {
	let projectStatus = document.getElementsByClassName("status-col");
	console.log(projectStatus);
	let activeStatus = "ACTIVE";
	let pendingStatus = "PENDING";
	let closedStatus = "CLOSED";
	Array.from(projectStatus).forEach(elem => {
		switch (elem.innerHTML) {
			case activeStatus:
				elem.style.color = "#666666";
				break;
			case pendingStatus:
				elem.style.color = "#ee706d";
				break;
			case closedStatus:
				elem.style.color = "f7da47";
				break;
			default:
				break;
		}
	});
}
