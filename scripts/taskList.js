//DOM elements
const taskList = document.querySelector('.taskList');

//update task fields
function updateTaskListItem(docID, title, content) {
    db.collection("taskList").doc(docID).update({
        title: title,
        content: content
    }).catch((error) =>{
        console.log(error);
    });
    M.toast({html: 'Task updated'});
}

//delete task fields
function deleteTaskListItem(docID) {
    db.collection("taskList").doc(docID).delete().then(() => {
        console.log("Task deleted");
        M.toast({html: 'Task deleted'});
    }).catch((error) => {
        console.log(error);
    });
}

//setup task list
const setupTaskList = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const task = doc.data();
            let docID = doc.id;

            var li = `<li>
              <div class="collapsible-header grey lighten-4"> ${task.title} </div>
              <div class="collapsible-body left-align white"> ${task.content} <br><br>
              <div class="right-align">
              <a class='dropdown-trigger waves-effect waves-light btn-small orange' data-target='${docID}DROP'>Update</a>
              </div>
              </li>`;

            var button = `
            <!-- Dropdown Structure -->
            <div>
            <ul id='${docID}DROP' class='dropdown-content'>
             <li><input size="60" value="${task.title}" type="text" placeholder=" Title" class="autocomplete" id="${docID}TITLE"></li>
             <li><input size="60" value="${task.content}" type="text" placeholder=" Content" class="autocomplete" id="${docID}CONTENT"></li>
             <li><a onclick=updateTaskListItem('${docID}',document.getElementById('${docID}TITLE').value,document.getElementById('${docID}CONTENT').value)>Update</a></li>
             <li><a class="tooltipped" data-position="bottom" data-tooltip="This will delete the task object and cannot be recovered"
                onclick=deleteTaskListItem('${docID}')>Delete</a></li>
            </ul>
            </div>`;
            html += button + li;
        });
        taskList.innerHTML = html;
    } else {
        taskList.innerHTML = "No Tasks"
    }

    setUpButtons();
};

//create new task list
const createTask = document.querySelector('#create-task');
createTask.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('taskList').add({
        title: createTask.title.value,
        content: createTask.content.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        //close the create modal & reset form
        const modal = document.querySelector('#modal-task');
        M.Modal.getInstance(modal).close();
        createTask.reset();
        //display toast
        M.toast({html: 'Task created'});
    }).catch(err => {
        console.log(err.message);
    });
});
