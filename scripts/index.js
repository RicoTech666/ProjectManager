function changeStatusColor() {
	let projectStatus = document.getElementsByClassName("status-col");
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

const root = " http://localhost:3000/projects";
getProjectData();

function getProjectData() {
	ajax({
		url: root,
		method: "GET",
		success: function(response) {
			renderProjectData(response);
		},
		fail: function(error) {
			console.log("request fail!");
		},
	});
}

function renderProjectData(data) {
	let projectTable = document.getElementsByClassName("project-data")[0];
	projectTable.innerHTML = data.reduce((dataContent, curData) => {
		dataContent += `<tr id="${curData.id}">
    <td>${curData.name}</td>
    <td class="description-col">${curData.description}</td>
    <td>${curData.endTime}</td>
    <td class="status-col">${curData.status}</td>
    <td></td>
  </tr>
  <tr>`;
		return dataContent;
	}, "");
	changeStatusColor();
}
