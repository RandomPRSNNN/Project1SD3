let userISAdmin;
let loginDiv = document.getElementById("logToContinue");

//listen for authentication changes
auth.onAuthStateChanged(user => {
    if (user) {
        //check if admin
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
            drawChart();
        });
        db.collection('taskList').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            setupTaskList(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
        db.collection('timetable').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setupTimetable(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
        db.collection('vacationRequests').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setupVacationRequests(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
        db.collection('employeeInfo').orderBy('name', 'asc').onSnapshot(snapshot => {
            setupEmployeeInfo(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
        loginDiv.innerHTML = '';
    } else {
        setupUI();
        //display login promp
        loginDiv.innerHTML = "<div class=\"row center-align performAnimation\" style=\"margin-top: 40px;\">\n" +
            "    <div class=\"container center-align\">\n" +
            "        <div class=\"col s6 offset-s3\">\n" +
            "            <div class=\"container\">\n" +
            "                <div class=\"card hoverable\">\n" +
            "                    <div class=\"card-content hove\">\n" +
            "                        <span class=\"card-title\">Welcome to eManage</span>\n" +
            "                        <p>Please login to continue</p>\n" +
            "                    </div>\n" +
            "                    <div class=\"card-action\">\n" +
            "                        <a class=\"modal-trigger btn-small green\" data-target=\"modal-login\">Login</a>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>";
    }
});

//assign admin role to user
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const adminEmail = document.querySelector('#admin-email').value;
    //reference cloud function and pass email
    const assignAdmin = functions.httpsCallable('addAdminRole');
    assignAdmin({email: adminEmail}).then(result => {
        console.log(result);
        adminForm.reset();
        //close modal
        const modal = document.querySelector('#modal-make-admin');
        M.Modal.getInstance(modal).close();
        M.toast({html: adminEmail + ' has been assigned admin privileges'});
    });
});

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const passwordRetype = signupForm['signup-password-retype'].value;

    if(password === passwordRetype){
        // sign up the user & add firestore data
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            // close the signup modal & reset form
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
            signupForm.querySelector('.error').innerHTML = ''
            M.toast({html: 'Account ' + email + ' has been created'});
        }).catch(err => {
            signupForm.querySelector('.error').innerHTML = err.message;
        });
    }else{
        signupForm.querySelector('.error').innerHTML = 'Entered passwords do not match, try again.'
    }
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    M.toast({html: 'Logged out'});
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});