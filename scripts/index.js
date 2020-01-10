const root = " http://localhost:3000/projects";
var projectId;
getProjectData();

function changeStatusColor() {
	let projectStatus = document.getElementsByClassName("status-col");
	const activeStatus = "ACTIVE";
	const pendingStatus = "PENDING";
	const closedStatus = "CLOSED";
	Array.from(projectStatus).forEach(elem => {
		switch (elem.innerHTML) {
			case activeStatus:
				elem.style.color = "#666666";
				break;
			case pendingStatus:
				elem.style.color = "#ee706d";
				break;
			case closedStatus:
				elem.style.color = "#f7da47";
				break;
			default:
				break;
		}
	});
}

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
    <td><button class="delete-btn" onclick="deleteItemData()">删除</button></td>
  </tr>
  <tr>`;
		return dataContent;
	}, "");
	changeStatusColor();
	updateStatusSummary();
}

function getStatusSummary() {
	let projectStatus = document.getElementsByClassName("status-col");
	const activeStatus = "ACTIVE";
	const pendingStatus = "PENDING";
	const closedStatus = "CLOSED";
	let statusArr = Array.from(projectStatus).reduce(
		(summary, elem) => {
			switch (elem.innerHTML) {
				case activeStatus:
					summary[0]++;
					break;
				case pendingStatus:
					summary[1]++;
					break;
				case closedStatus:
					summary[2]++;
					break;
				default:
					break;
			}
			return summary;
		},
		[0, 0, 0]
	);
	statusArr.unshift(sumOfArr(statusArr));
	return statusArr;
}

function sumOfArr(arr) {
	return arr.reduce((sum, elem) => {
		return (sum += elem);
	});
}

function getPercentageSummary() {
	let statusSummary = getStatusSummary();
	let percentageSummary = [];
	for (let i = 0; i < statusSummary.length; i++) {
		if (i >= 1) {
			let percentageVal = (100 * statusSummary[i]) / statusSummary[0];
			percentageVal = percentageVal.toFixed(2);
			percentageSummary.push(percentageVal.toString() + "%");
		}
	}
	return percentageSummary;
}

function updateStatusSummary() {
	let statusSummary = getStatusSummary();
	let percentageSummary = getPercentageSummary();
	let summaryNum = document.getElementsByClassName("summary-num");
	let summaryPercentage = document.getElementsByClassName("percentage");
	Array.from(summaryNum).forEach((summaryNumElem, index) => {
		summaryNumElem.innerHTML = statusSummary[index];
	});
	Array.from(summaryPercentage).forEach((summaryPercentageElem, index) => {
		summaryPercentageElem.innerHTML = percentageSummary[index];
	});
}

function openDialogBox() {
	let dialogUnit = document.getElementsByClassName("dialog-unit")[0];
	dialogUnit.style.display = "block";
}

function closeDialogBox() {
	let dialogUnit = document.getElementsByClassName("dialog-unit")[0];
	dialogUnit.style.display = "none";
}

function confirmBox() {
	deleteItemJsonData(projectId);
	closeDialogBox();
}

function deleteItemData() {
	openDialogBox();
	projectId = event.target.parentElement.parentElement.getAttribute("id");
}

function deleteItemJsonData(id) {
	ajax({
		url: root + "/" + id,
		method: "DELETE",
		success: function(response) {
			deleteItemDisplay(id);
		},
		fail: function(error) {
			console.log("request fail!");
		},
	});
}

function deleteItemDisplay(id) {
	let projectData = document.getElementsByClassName("project-data")[0];
	let itemToBeRemoved = document.getElementById(`${id}`);
	projectData.removeChild(itemToBeRemoved);
}
