//DOM elements
const timetableList = document.querySelector('.listTimetables');

//delete timetable
function deleteTimetable(docID) {
    db.collection('timetable').doc(docID).delete().then(() => {
        console.log("Timetable deleted");
        M.toast({html: 'Timetable deleted'});
    }).catch((error) => {
        console.log(error);
    })
}

//create a new timetable
function newTimetable(e) {
    e.preventDefault();
    db.collection('timetable').add({
        timetableName: document.getElementById("timetable-date").value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        timeMon9: document.getElementById("timeMon9").value,
        timeMon10: document.getElementById("timeMon10").value,
        timeMon11: document.getElementById("timeMon11").value,
        timeMon12: document.getElementById("timeMon12").value,
        timeMon13: document.getElementById("timeMon13").value,
        timeMon14: document.getElementById("timeMon14").value,
        timeMon15: document.getElementById("timeMon15").value,
        timeMon16: document.getElementById("timeMon16").value,

        timeTue9: document.getElementById("timeTue9").value,
        timeTue10: document.getElementById("timeTue10").value,
        timeTue11: document.getElementById("timeTue11").value,
        timeTue12: document.getElementById("timeTue12").value,
        timeTue13: document.getElementById("timeTue13").value,
        timeTue14: document.getElementById("timeTue14").value,
        timeTue15: document.getElementById("timeTue15").value,
        timeTue16: document.getElementById("timeTue16").value,

        timeWed9: document.getElementById("timeWed9").value,
        timeWed10: document.getElementById("timeWed10").value,
        timeWed11: document.getElementById("timeWed11").value,
        timeWed12: document.getElementById("timeWed12").value,
        timeWed13: document.getElementById("timeWed13").value,
        timeWed14: document.getElementById("timeWed14").value,
        timeWed15: document.getElementById("timeWed15").value,
        timeWed16: document.getElementById("timeWed16").value,

        timeThu9: document.getElementById("timeThu9").value,
        timeThu10: document.getElementById("timeThu10").value,
        timeThu11: document.getElementById("timeThu11").value,
        timeThu12: document.getElementById("timeThu12").value,
        timeThu13: document.getElementById("timeThu13").value,
        timeThu14: document.getElementById("timeThu14").value,
        timeThu15: document.getElementById("timeThu15").value,
        timeThu16: document.getElementById("timeThu16").value,

        timeFri9: document.getElementById("timeFri9").value,
        timeFri10: document.getElementById("timeFri10").value,
        timeFri11: document.getElementById("timeFri11").value,
        timeFri12: document.getElementById("timeFri12").value,
        timeFri13: document.getElementById("timeFri13").value,
        timeFri14: document.getElementById("timeFri14").value,
        timeFri15: document.getElementById("timeFri15").value,
        timeFri16: document.getElementById("timeFri16").value,

        timeSat9: document.getElementById("timeSat9").value,
        timeSat10: document.getElementById("timeSat10").value,
        timeSat11: document.getElementById("timeSat11").value,
        timeSat12: document.getElementById("timeSat12").value,
        timeSat13: document.getElementById("timeSat13").value,
        timeSat14: document.getElementById("timeSat14").value,
        timeSat15: document.getElementById("timeSat15").value,
        timeSat16: document.getElementById("timeSat16").value,

        timeSun9: document.getElementById("timeSun9").value,
        timeSun10: document.getElementById("timeSun10").value,
        timeSun11: document.getElementById("timeSun11").value,
        timeSun12: document.getElementById("timeSun12").value,
        timeSun13: document.getElementById("timeSun13").value,
        timeSun14: document.getElementById("timeSun14").value,
        timeSun15: document.getElementById("timeSun15").value,
        timeSun16: document.getElementById("timeSun16").value

    }).then(() => {
        console.log("Timetable saved")
        M.toast({html: 'Timetable created'});
        //reset form
        document.getElementById("timetable").reset();
        document.getElementById("timetable-date").value = "";

    }).catch(err => {
        console.log(err.message);
    });
}

//setup timetables
const setupTimetable = (data) => {
    if (data.length) {
        let html = '';
        let button = '';
        data.forEach(doc => {
            const table = doc.data();
            let docID = doc.id;

            let li = `<li>
              <div class="collapsible-header grey lighten-4">Week beginning: ${table.timetableName}</div>
              <div class="collapsible-body left-align white">
              <table class="responsive-table centered highlight timetable">
                    <form id="${docID}+timetable">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                        </tr>
                        </thead>
                
                        <tbody>
                        <tr>
                            <td>9.00</td>
                            <td>${table.timeMon9}</td>
                            <td>${table.timeTue9}</td>
                            <td>${table.timeWed9}</td>
                            <td>${table.timeThu9}</td>
                            <td>${table.timeFri9}</td>
                            <td>${table.timeSat9}</td>
                            <td>${table.timeSun9}</td>
                        </tr>
                        <tr>
                            <td>10.00</td>
                            <td>${table.timeMon10}</td>
                            <td>${table.timeTue10}</td>
                            <td>${table.timeWed10}</td>
                            <td>${table.timeThu10}</td>
                            <td>${table.timeFri10}</td>
                            <td>${table.timeSat10}</td>
                            <td>${table.timeSun10}</td>
                        </tr>
                        <tr>
                            <td>11.00</td>
                            <td>${table.timeMon11}</td>
                            <td>${table.timeTue11}</td>
                            <td>${table.timeWed11}</td>
                            <td>${table.timeThu11}</td>
                            <td>${table.timeFri11}</td>
                            <td>${table.timeSat11}</td>
                            <td>${table.timeSun11}</td>
                        </tr>
                        <tr>
                            <td>12.00</td>
                            <td>${table.timeMon12}</td>
                            <td>${table.timeTue12}</td>
                            <td>${table.timeWed12}</td>
                            <td>${table.timeThu12}</td>
                            <td>${table.timeFri12}</td>
                            <td>${table.timeSat12}</td>
                            <td>${table.timeSun12}</td>
                        </tr>
                        <tr>
                            <td>13.00</td>
                            <td>${table.timeMon13}</td>
                            <td>${table.timeTue13}</td>
                            <td>${table.timeWed13}</td>
                            <td>${table.timeThu13}</td>
                            <td>${table.timeFri13}</td>
                            <td>${table.timeSat13}</td>
                            <td>${table.timeSun13}</td>
                        </tr>
                        <tr>
                            <td>14.00</td>
                            <td>${table.timeMon14}</td>
                            <td>${table.timeTue14}</td>
                            <td>${table.timeWed14}</td>
                            <td>${table.timeThu14}</td>
                            <td>${table.timeFri14}</td>
                            <td>${table.timeSat14}</td>
                            <td>${table.timeSun14}</td>
                        </tr>
                        <tr>
                            <td>15.00</td>
                            <td>${table.timeMon15}</td>
                            <td>${table.timeTue15}</td>
                            <td>${table.timeWed15}</td>
                            <td>${table.timeThu15}</td>
                            <td>${table.timeFri15}</td>
                            <td>${table.timeSat15}</td>
                            <td>${table.timeSun15}</td>
                        </tr>
                        <tr>
                            <td>16.00</td>
                            <td>${table.timeMon16}</td>
                            <td>${table.timeTue16}</td>
                            <td>${table.timeWed16}</td>
                            <td>${table.timeThu16}</td>
                            <td>${table.timeFri16}</td>
                            <td>${table.timeSat16}</td>
                            <td>${table.timeSun16}</td>
                        </tr>
                        </tbody>
                </table><br>`
                button = `
                
                <div class="right-align">
                <a class="waves-effect waves-light btn-small red tooltipped" data-position="bottom" 
                data-tooltip="This timetable will be deleted and cannot be recovered"
                onclick="deleteTimetable('${docID}')">Delete</a>
                <a class="modal-trigger waves-effect waves-light btn-small orange"
                               data-target="${docID}+modal-timetable">Update Timetable</a>
                </div>
              </div>
              </li>`;

            let modal = `
                <!-- EDIT TIMETABLE MODAL -->
                <div id="${docID}+modal-timetable" class="modal bottom-sheet">
                    <div class="modal-content">
                        <!-- TIMETABLE -->
                        <input type="text" class="datepicker" id="${docID}+timetable-date"
                         placeholder="Week beginning: Click to select" value="${table.timetableName}">
                            <table class="responsive-table centered highlight timetable">
                                <form id="timetable">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                        <th>Sunday</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>9.00</td>
                                        <td><input type="text" id="${docID}+timeMon9" value="${table.timeMon9}"></td>
                                        <td><input type="text" id="${docID}+timeTue9" value="${table.timeTue9}"></td>
                                        <td><input type="text" id="${docID}+timeWed9" value="${table.timeWed9}"></td>
                                        <td><input type="text" id="${docID}+timeThu9" value="${table.timeThu9}"></td>
                                        <td><input type="text" id="${docID}+timeFri9" value="${table.timeFri9}"></td>
                                        <td><input type="text" id="${docID}+timeSat9" value="${table.timeSat9}"></td>
                                        <td><input type="text" id="${docID}+timeSun9" value="${table.timeSun9}"></td>
                                    </tr>
                                    <tr>
                                        <td>10.00</td>
                                        <td><input type="text" id="${docID}+timeMon10" value="${table.timeMon10}"></td>
                                        <td><input type="text" id="${docID}+timeTue10" value="${table.timeTue10}"></td>
                                        <td><input type="text" id="${docID}+timeWed10" value="${table.timeWed10}"></td>
                                        <td><input type="text" id="${docID}+timeThu10" value="${table.timeThu10}"></td>
                                        <td><input type="text" id="${docID}+timeFri10" value="${table.timeFri10}"></td>
                                        <td><input type="text" id="${docID}+timeSat10" value="${table.timeSat10}"></td>
                                        <td><input type="text" id="${docID}+timeSun10" value="${table.timeSun10}"></td>
                                    </tr>
                                    <tr>
                                        <td>11.00</td>
                                        <td><input type="text" id="${docID}+timeMon11" value="${table.timeMon11}"></td>
                                        <td><input type="text" id="${docID}+timeTue11" value="${table.timeTue11}"></td>
                                        <td><input type="text" id="${docID}+timeWed11" value="${table.timeWed11}"></td>
                                        <td><input type="text" id="${docID}+timeThu11" value="${table.timeThu11}"></td>
                                        <td><input type="text" id="${docID}+timeFri11" value="${table.timeFri11}"></td>
                                        <td><input type="text" id="${docID}+timeSat11" value="${table.timeSat11}"></td>
                                        <td><input type="text" id="${docID}+timeSun11" value="${table.timeSun11}"></td>
                                    </tr>
                                    <tr>
                                        <td>12.00</td>
                                        <td><input type="text" id="${docID}+timeMon12" value="${table.timeMon12}"></td>
                                        <td><input type="text" id="${docID}+timeTue12" value="${table.timeTue12}"></td>
                                        <td><input type="text" id="${docID}+timeWed12" value="${table.timeWed12}"></td>
                                        <td><input type="text" id="${docID}+timeThu12" value="${table.timeThu12}"></td>
                                        <td><input type="text" id="${docID}+timeFri12" value="${table.timeFri12}"></td>
                                        <td><input type="text" id="${docID}+timeSat12" value="${table.timeSat12}"></td>
                                        <td><input type="text" id="${docID}+timeSun12" value="${table.timeSun12}"></td>
                                    </tr>
                                    <tr>
                                        <td>13.00</td>
                                        <td><input type="text" id="${docID}+timeMon13" value="${table.timeMon13}"></td>
                                        <td><input type="text" id="${docID}+timeTue13" value="${table.timeTue13}"></td>
                                        <td><input type="text" id="${docID}+timeWed13" value="${table.timeWed13}"></td>
                                        <td><input type="text" id="${docID}+timeThu13" value="${table.timeThu13}"></td>
                                        <td><input type="text" id="${docID}+timeFri13" value="${table.timeFri13}"></td>
                                        <td><input type="text" id="${docID}+timeSat13" value="${table.timeSat13}"></td>
                                        <td><input type="text" id="${docID}+timeSun13" value="${table.timeSun13}"></td>
                                    </tr>
                                    <tr>
                                        <td>14.00</td>
                                        <td><input type="text" id="${docID}+timeMon14" value="${table.timeMon14}"></td>
                                        <td><input type="text" id="${docID}+timeTue14" value="${table.timeTue14}"></td>
                                        <td><input type="text" id="${docID}+timeWed14" value="${table.timeWed14}"></td>
                                        <td><input type="text" id="${docID}+timeThu14" value="${table.timeThu14}"></td>
                                        <td><input type="text" id="${docID}+timeFri14" value="${table.timeFri14}"></td>
                                        <td><input type="text" id="${docID}+timeSat14" value="${table.timeSat14}"></td>
                                        <td><input type="text" id="${docID}+timeSun14" value="${table.timeSun14}"></td>
                                    </tr>
                                    <tr>
                                        <td>15.00</td>
                                        <td><input type="text" id="${docID}+timeMon15" value="${table.timeMon15}"></td>
                                        <td><input type="text" id="${docID}+timeTue15" value="${table.timeTue15}"></td>
                                        <td><input type="text" id="${docID}+timeWed15" value="${table.timeWed15}"></td>
                                        <td><input type="text" id="${docID}+timeThu15" value="${table.timeThu15}"></td>
                                        <td><input type="text" id="${docID}+timeFri15" value="${table.timeFri15}"></td>
                                        <td><input type="text" id="${docID}+timeSat15" value="${table.timeSat15}"></td>
                                        <td><input type="text" id="${docID}+timeSun15" value="${table.timeSun15}"></td>                 
                                    </tr>
                                    <tr>
                                        <td>15.00</td>
                                        <td><input type="text" id="${docID}+timeMon16" value="${table.timeMon16}"></td>
                                        <td><input type="text" id="${docID}+timeTue16" value="${table.timeTue16}"></td>
                                        <td><input type="text" id="${docID}+timeWed16" value="${table.timeWed16}"></td>
                                        <td><input type="text" id="${docID}+timeThu16" value="${table.timeThu16}"></td>
                                        <td><input type="text" id="${docID}+timeFri16" value="${table.timeFri16}"></td>
                                        <td><input type="text" id="${docID}+timeSat16" value="${table.timeSat16}"></td>
                                        <td><input type="text" id="${docID}+timeSun16" value="${table.timeSun16}"></td>                 
                                    </tr>
                                    </tbody>
                                </form>
                            </table><br>
                            <div class="right-align"><a class="orange btn-small modal-close"
                             onclick="updateTimetable('${docID}')" >Update</a></div>
                    </div>
                </div>`
            //Display edit buttons for admins
            if(userISAdmin === true) {
                html += li + button + modal;
            }else{
                html += li
            }
        });
        timetableList.innerHTML = html;
    } else {
        timetableList.innerHTML = '<div class="center-align">No timetables</div>';
    }
    setUpButtons();
}

//update timetable
function updateTimetable(docID) {
    db.collection("timetable").doc(docID).update({
        timetableName: document.getElementById(docID + '+timetable-date').value,
        timeMon9: document.getElementById(docID + '+timeMon9').value,
        timeMon10: document.getElementById(docID + '+timeMon10').value,
        timeMon11: document.getElementById(docID + '+timeMon11').value,
        timeMon12: document.getElementById(docID + '+timeMon12').value,
        timeMon13: document.getElementById(docID + '+timeMon13').value,
        timeMon14: document.getElementById(docID + '+timeMon14').value,
        timeMon15: document.getElementById(docID + '+timeMon15').value,
        timeMon16: document.getElementById(docID + '+timeMon16').value,

        timeTue9: document.getElementById(docID + '+timeTue9').value,
        timeTue10: document.getElementById(docID + '+timeTue10').value,
        timeTue11: document.getElementById(docID + '+timeTue11').value,
        timeTue12: document.getElementById(docID + '+timeTue12').value,
        timeTue13: document.getElementById(docID + '+timeTue13').value,
        timeTue14: document.getElementById(docID + '+timeTue14').value,
        timeTue15: document.getElementById(docID + '+timeTue15').value,
        timeTue16: document.getElementById(docID + '+timeTue16').value,

        timeWed9: document.getElementById(docID + '+timeWed9').value,
        timeWed10: document.getElementById(docID + '+timeWed10').value,
        timeWed11: document.getElementById(docID + '+timeWed11').value,
        timeWed12: document.getElementById(docID + '+timeWed12').value,
        timeWed13: document.getElementById(docID + '+timeWed13').value,
        timeWed14: document.getElementById(docID + '+timeWed14').value,
        timeWed15: document.getElementById(docID + '+timeWed15').value,
        timeWed16: document.getElementById(docID + '+timeWed16').value,

        timeThu9: document.getElementById(docID + '+timeThu9').value,
        timeThu10: document.getElementById(docID + '+timeThu10').value,
        timeThu11: document.getElementById(docID + '+timeThu11').value,
        timeThu12: document.getElementById(docID + '+timeThu12').value,
        timeThu13: document.getElementById(docID + '+timeThu13').value,
        timeThu14: document.getElementById(docID + '+timeThu14').value,
        timeThu15: document.getElementById(docID + '+timeThu15').value,
        timeThu16: document.getElementById(docID + '+timeThu16').value,

        timeFri9: document.getElementById(docID + '+timeFri9').value,
        timeFri10: document.getElementById(docID + '+timeFri10').value,
        timeFri11: document.getElementById(docID + '+timeFri11').value,
        timeFri12: document.getElementById(docID + '+timeFri12').value,
        timeFri13: document.getElementById(docID + '+timeFri13').value,
        timeFri14: document.getElementById(docID + '+timeFri14').value,
        timeFri15: document.getElementById(docID + '+timeFri15').value,
        timeFri16: document.getElementById(docID + '+timeFri16').value,

        timeSat9: document.getElementById(docID + '+timeSat9').value,
        timeSat10: document.getElementById(docID + '+timeSat10').value,
        timeSat11: document.getElementById(docID + '+timeSat11').value,
        timeSat12: document.getElementById(docID + '+timeSat12').value,
        timeSat13: document.getElementById(docID + '+timeSat13').value,
        timeSat14: document.getElementById(docID + '+timeSat14').value,
        timeSat15: document.getElementById(docID + '+timeSat15').value,
        timeSat16: document.getElementById(docID + '+timeSat16').value,

        timeSun9: document.getElementById(docID + '+timeSun9').value,
        timeSun10: document.getElementById(docID + '+timeSun10').value,
        timeSun11: document.getElementById(docID + '+timeSun11').value,
        timeSun12: document.getElementById(docID + '+timeSun12').value,
        timeSun13: document.getElementById(docID + '+timeSun13').value,
        timeSun14: document.getElementById(docID + '+timeSun14').value,
        timeSun15: document.getElementById(docID + '+timeSun15').value,
        timeSun16: document.getElementById(docID + '+timeSun16').value
    }).then(() => {
        console.log("Timetable updated.")
        M.toast({html: 'Timetable updated'});
    }).catch((error) => {
        console.log(error);
    });
}