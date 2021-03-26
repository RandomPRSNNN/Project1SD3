// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
  setUpButtons();
  console.log("Setting UP UI (hiding)")
};


//setup materialize
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


//task list buttons redraw
function setUpButtons() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var elem = document.querySelectorAll('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });

  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    firstDay: 1,
    format: 'dd mmmm, yyyy',
    //only mondays
    disableDayFn: function (date) {
      if (date.getDay() === 1)
        return false;
      else
        return true;
    }
  });


  var elems = document.querySelectorAll('.datepickerNotMondays');
  var instances = M.Datepicker.init(elems, {
    firstDay: 1,
    format: 'dd mmmm, yyyy',
    yearRange: [1955,2025],
  });




  console.log("Setting up  mCSS buttons");
  //dropdown button setup
  var elements = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elements, {
    closeOnClick: false,
    constrainWidth: false
  });


}


//dropdown button setup
document.addEventListener('DOMContentLoaded', function () {
  setUpButtons();
  M.AutoInit();
});