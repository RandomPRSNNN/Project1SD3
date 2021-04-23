//DOM elements
const vacationList = document.querySelector('.vacationList');
const vacationPending = document.querySelector('.vacationPending');
const requestVacation = document.querySelector('#create-vacation');

//create vacation request
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
        M.toast({html: 'Vacation request submitted'});
    }).catch(err => {
        console.log(err.message);
    });
});

//setup task list
const setupVacationRequests = (data) => {
    let pending = 0;
    let pendingNotification;
    let table =    `<table class="highlight centered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date beginning</th>
                        <th>No. Days</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>`

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const vacation = doc.data();
            let docID = doc.id;

            //count number of pending requests
            if (vacation.approved === 'Pending') {
                pending++;
            }

            if (userISAdmin === true) {

                //assign a notification for pending requests
                if (vacation.approved === "Pending") {
                    pendingNotification = `<i class="material-icons icon-red">warning</i>`;
                } else {
                    pendingNotification = '';
                }


                let li = `<li>
                  <div class="collapsible-header grey lighten-4">Request from ${vacation.name} <span class="badge">${pendingNotification}</span></div>
                  <div class="collapsible-body left-align white">
                  <table class="highlight">
                        <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>${vacation.name}</td>
                        </tr>
                        <tr>
                            <td><b>Date beginning</b></td>
                            <td>${vacation.date}</td>
                        </tr>
                        <tr>
                            <td><b>Number of days requested</b></td>
                            <td>${vacation.numberOfDays}</td>
                        </tr>
                        <tr>
                            <td><b>Reason for request</b></td>
                            <td>${vacation.reason}</td>
                        </tr>
                        <tr>
                            <td><b>Submitted on</b></td>
                            <td>${vacation.timestamp.toDate().toLocaleTimeString()} ${vacation.timestamp.toDate().toDateString()}</td>
                        </tr>
                        <tr>
                            <td><b>Approval status</b></td>
                            <td>${vacation.approved}</td>
                        </tr>
                        </tbody></table><br>
                        
                        <!--DENIED USER MODAL-->
                        <div id="${docID}+modal-vacDeny" class="modal">
                            <div class="modal-content">
                                <h4>Reason for refusal</h4><br/>
                                <form id="${docID}+vacDeny-form">
                                    <div class="input-field">
                                        <input type="text" id="${docID}+deny-reason" required/>
                                        <label for="${docID}+deny-reason">Reason for vacation refusal</label>
                                    </div>
                                    <a class="btn red" onclick="denyVacation('${docID}', document.getElementById('${docID}'+'+deny-reason').value)">Deny</a>
                                </form>
                            </div>
                        </div>

                  <div class="right-align">
                       <a class="waves-effect waves-light btn-small green" onclick="approveVacation('${docID}')">Approve</a>
                       <a class="waves-effect waves-light btn-small red modal-trigger" href="#${docID}+modal-vacDeny">Deny</a>
                       <a class="waves-effect waves-light btn-small orange tooltipped"
                        data-position="bottom" data-tooltip="This will remove the vacation request and cannot be recovered" 
                        onclick=removeVacationRequest('${docID}')>Remove</a>
                  </div>
                  </div>
                  </li>`;
                html += li;

                //NON ADMIN VIEW
            } else {
                let tableBody =
                    `<tr>
                        <td>${vacation.name}</td>
                        <td>${vacation.date}</td>
                        <td>${vacation.numberOfDays}</td>
                        <td>${vacation.approved}</td>
                    </tr>`
                html += tableBody;
            }
        });

        if (userISAdmin === true) {
            vacationPending.innerHTML = pending;
            vacationList.innerHTML = html;
        } else {
            vacationList.innerHTML = table + html + `</tbody></table>`
            vacationPending.innerHTML = pending;
        }

    } else {
        vacationList.innerHTML = '<div class="center-align">No requests</div>';
    }

    setUpButtons();
};

//approvals
function approveVacation(docID) {
    db.collection("vacationRequests").doc(docID).update({
        approved: "Approved"
    }).catch((error) => {
        console.log(error);
    });
    M.toast({html: 'Vacation request approved'});
}

function denyVacation(docID, reason) {
    db.collection("vacationRequests").doc(docID).update({
        approved: "Denied - " + reason
    }).then(() => {
        M.toast({html: 'Vacation request denied'});
    }).catch((error) => {
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
    M.toast({html: 'Vacation request removed'});

}

