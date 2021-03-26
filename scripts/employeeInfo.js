//DOM elements
const employeeList = document.querySelector('.employeeList');

function createNewEmployeeInfo(e) {
    e.preventDefault();
    db.collection('employeeInfo').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        name: document.getElementById("empName").value,
        DOB: document.getElementById("empDOB").value,
        address: document.getElementById("empAddress").value,
        email: document.getElementById("empEmail").value,
        phoneNumber: document.getElementById("empNumber").value,
        emergencyContactName: document.getElementById("empContactEmergencyName").value,
        emergencyContactNumber: document.getElementById("empContactEmergency").value
    }).then(() => {
        console.log("Employee info saved")
        //reset form
        document.getElementById("create-employees").reset();
        document.getElementById("empDOB").value = "";

    }).catch(err => {
        console.log(err.message);
    });
}

//setup task list
const setupEmployeeInfo = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const employee = doc.data();
            let docID = doc.id;

            var li = `<li>
              <div class="collapsible-header grey lighten-4"> ${employee.name} </div>
              <div class="collapsible-body left-align white"> 
                    <b>Date of birth: </b>${employee.DOB}<br>
                    <b>Address: </b>${employee.address}<br>
                    <b>Email address: </b>${employee.email}<br>
                    <b>Employee phone number: </b>${employee.phoneNumber}<br>
                    <b>Emergency contact name: </b>${employee.emergencyContactName}<br>
                    <b>Emergency contact number: </b>${employee.emergencyContactNumber}<br>
              <div class="right-align">
              <a class='dropdown-trigger waves-effect waves-light btn-small red' data-target='${docID}DROP'>Update</a>
              </div>
              </li>`;


            var modal =
                        `<!-- UPDATE EMPLOYEE INFO MODAL-->
                <div id="${docID}+modal-employees" class="modal modal-t">
                    <div class="modal-content">
                        <h5>Employee Information</h5><br/>
                        <form id="${docID}+create-employees">
                                <input type="text" id="${docID}+empName" value="${employee.name}">
                                <label for="title">Employee Name</label>
                                <input type="text" class="datepickerNotMondays" id="${docID}+empDOB"
                                 placeholder="Date of birth, click to select" value="${employee.DOB}">
                                <input id="${docID}+empAddress" class="materialize-textarea" value="${employee.address}">
                                <label for="content">Employee address</label>
                                <input type="email" id="${docID}+empEmail" value="${employee.email}">
                                <label for="title">Email</label>
                                <input type="text" id="${docID}+empNumber" value="${employee.phoneNumber}">
                                <label for="title">Contact number</label>
                                <input type="text" id="${docID}+empContactEmergencyName" value="${employee.emergencyContactName}">
                                <label for="title">Emergency contact name</label>
                                <input type="text" id="${docID}+empContactEmergency" value="${employee.emergencyContactNumber}">
                                <label for="title">Emergency contact number</label><br><br>
                            <a type="submit" class="btn-small green modal-close" onclick="updateEmployeeInfo('${docID}')">Update</a>
                        </form>
                    </div>
                </div>`

            var button = `
            <!-- Dropdown Structure -->
            <div>
            <ul id='${docID}DROP' class='dropdown-content'>
             <li><a class="modal-trigger" data-target="${docID}+modal-employees">Update Information</a></li>
             <li><a onclick=deleteEmployeeInfo('${docID}')>Remove</a></li>
            </ul>
            </div>`;
            html += li + modal + button;
        });
        employeeList.innerHTML = html;
    } else {
        employeeList.innerHTML = 'NOTHING'
    }

    setUpButtons();
};

//delete
function deleteEmployeeInfo(docID) {
    db.collection('employeeInfo').doc(docID).delete().then(() => {
        console.log("Employee info deleted");
    }).catch((error) => {
        console.log(error);
    })
}


//update
function updateEmployeeInfo(docID) {
    db.collection("employeeInfo").doc(docID).update({
        name: document.getElementById(docID + "+empName").value,
        DOB: document.getElementById(docID+"+empDOB").value,
        address: document.getElementById(docID+"+empAddress").value,
        email: document.getElementById(docID+"+empEmail").value,
        phoneNumber: document.getElementById(docID+"+empNumber").value,
        emergencyContactName: document.getElementById(docID+"+empContactEmergencyName").value,
        emergencyContactNumber: document.getElementById(docID+"+empContactEmergency").value

    }).then(() => {
        console.log("Employee updated info")
    }).catch((error) => {
        console.log(error);
    });
}