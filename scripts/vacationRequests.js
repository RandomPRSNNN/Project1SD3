//DOM elements
const vacationList = document.querySelector('.vacationList');
const vacationPending = document.querySelector('.vacationPending');

//create vacation request
const requestVacation = document.querySelector('#create-vacation');
requestVacation.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('vacationRequests').add({
        name: requestVacation.vacName.value,
        date: requestVacation.vacDate.value,
        numberOfDays: requestVacation.vacNumberOfDays.value,
        reason: requestVacation.vacReason.value,
        approved: "Pending",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        //close the create modal & reset form
        const modal = document.querySelector('#modal-vacation');
        M.Modal.getInstance(modal).close();
        requestVacation.reset();
    }).catch(err => {
        console.log(err.message);
    });
});

//setup task list
const setupVacationRequests = (data) => {
    var pending = 0;

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const vacation = doc.data();
            let docID = doc.id;

            var li = `<li>
              <div class="collapsible-header grey lighten-4">Request from ${vacation.name} </div>
              <div class="collapsible-body left-align white">
              <b>Name:</b> ${vacation.name} <br>
              <b>Date beginning:</b> ${vacation.date} <br>
              <b>Number of day requested:</b> ${vacation.numberOfDays} <br>
              <b>Reason for request:</b> ${vacation.reason} <br>
              <b>Submitted on:</b> ${vacation.timestamp.toDate().toLocaleTimeString()} ${vacation.timestamp.toDate().toDateString()} <br>
              <b>Approval status:</b> ${vacation.approved} <br>
              <div class="right-align">
              <div class="admin">
                   <a class="waves-effect waves-light btn-small green admin" onclick="approveVacation('${docID}')">Approve</a>
                   <a class="waves-effect waves-light btn-small orange admin" onclick="denyVacation('${docID}')">Deny</a>
                   <a class="waves-effect waves-light btn-small red admin" onclick=removeVacationRequest('${docID}')>Remove</a>
              </div>
              </div>
              </div>
              </li>`;
            html += li;

            //count number of pending requests
            if(vacation.approved === 'Pending'){
                pending++;
            }


        });

        vacationPending.innerHTML = pending;
        vacationList.innerHTML = html;
    } else {
        vacationList.innerHTML = '';
    }

    setUpButtons();
};

//approvals
function approveVacation(docID) {
    db.collection("vacationRequests").doc(docID).update({
        approved: "Approved"
    }).catch((error) =>{
        console.log(error);
    });
}
function denyVacation(docID) {
    db.collection("vacationRequests").doc(docID).update({
        approved: "Denied"
    }).catch((error) =>{
        console.log(error);
    });
}

//remove request
function removeVacationRequest(docID) {
    db.collection("vacationRequests").doc(docID).delete().then(() => {
        console.log("Request deleted");
    }).catch((error) => {
        console.log(error);
    });
}

